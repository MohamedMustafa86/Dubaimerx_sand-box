import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Paperclip, 
  Image, 
  File, 
  Download, 
  MoreVertical,
  Phone,
  Video,
  Info
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const ChatWindow = ({ conversation, onBack }) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [otherUserTyping, setOtherUserTyping] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    if (conversation) {
      fetchMessages();
      subscribeToMessages();
      subscribeToTyping();
      markMessagesAsRead();
    }
  }, [conversation]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select(`
          *,
          sender:sender_id(id, full_name, company_name),
          attachments(*)
        `)
        .eq('conversation_id', conversation.id)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast({
        variant: "destructive",
        title: t('messaging_errorLoadingMessages'),
        description: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  const subscribeToMessages = () => {
    const subscription = supabase
      .channel(`messages:${conversation.id}`)
      .on('postgres_changes',
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'messages',
          filter: `conversation_id=eq.${conversation.id}`
        },
        (payload) => {
          setMessages(prev => [...prev, payload.new]);
          if (payload.new.sender_id !== user.id) {
            markMessageAsRead(payload.new.id);
          }
        }
      )
      .on('postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversation.id}`
        },
        (payload) => {
          setMessages(prev => prev.map(msg => 
            msg.id === payload.new.id ? payload.new : msg
          ));
        }
      )
      .subscribe();

    return () => subscription.unsubscribe();
  };

  const subscribeToTyping = () => {
    const subscription = supabase
      .channel(`typing:${conversation.id}`)
      .on('broadcast', { event: 'typing' }, ({ payload }) => {
        if (payload.user_id !== user.id) {
          setOtherUserTyping(payload.isTyping);
          if (payload.isTyping) {
            setTimeout(() => setOtherUserTyping(false), 3000);
          }
        }
      })
      .subscribe();

    return () => subscription.unsubscribe();
  };

  const markMessagesAsRead = async () => {
    try {
      await supabase
        .from('messages')
        .update({ read_status: 'read' })
        .eq('conversation_id', conversation.id)
        .neq('sender_id', user.id);
    } catch (error) {
      console.error('Error marking messages as read:', error);
    }
  };

  const markMessageAsRead = async (messageId) => {
    try {
      await supabase
        .from('messages')
        .update({ read_status: 'read' })
        .eq('id', messageId);
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const messageData = {
      conversation_id: conversation.id,
      sender_id: user.id,
      content: newMessage.trim(),
      message_type: 'text',
      read_status: 'sent'
    };

    try {
      const { error } = await supabase
        .from('messages')
        .insert([messageData]);

      if (error) throw error;

      // Update conversation timestamp
      await supabase
        .from('conversations')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', conversation.id);

      setNewMessage('');
      stopTyping();
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        variant: "destructive",
        title: t('messaging_errorSendingMessage'),
        description: error.message
      });
    }
  };

  const handleTyping = (value) => {
    setNewMessage(value);
    
    if (!isTyping) {
      setIsTyping(true);
      supabase.channel(`typing:${conversation.id}`)
        .send({
          type: 'broadcast',
          event: 'typing',
          payload: { user_id: user.id, isTyping: true }
        });
    }

    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      stopTyping();
    }, 1000);
  };

  const stopTyping = () => {
    if (isTyping) {
      setIsTyping(false);
      supabase.channel(`typing:${conversation.id}`)
        .send({
          type: 'broadcast',
          event: 'typing',
          payload: { user_id: user.id, isTyping: false }
        });
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Check file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        variant: "destructive",
        title: t('messaging_fileTooLarge'),
        description: t('messaging_maxFileSize')
      });
      return;
    }

    setUploading(true);

    try {
      // Upload file to Supabase Storage
      const fileName = `${Date.now()}_${file.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('message-attachments')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Send message with attachment
      const messageData = {
        conversation_id: conversation.id,
        sender_id: user.id,
        content: file.name,
        message_type: file.type.startsWith('image/') ? 'image' : 'file',
        read_status: 'sent'
      };

      const { data: messageResult, error: messageError } = await supabase
        .from('messages')
        .insert([messageData])
        .select()
        .single();

      if (messageError) throw messageError;

      // Create attachment record
      await supabase
        .from('attachments')
        .insert([{
          message_id: messageResult.id,
          file_name: file.name,
          file_size: file.size,
          file_type: file.type,
          file_url: uploadData.path
        }]);

      toast({
        title: t('messaging_fileUploaded'),
        description: t('messaging_fileUploadedSuccess')
      });

    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        variant: "destructive",
        title: t('messaging_errorUploadingFile'),
        description: error.message
      });
    } finally {
      setUploading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const renderMessage = (message) => {
    const isOwnMessage = message.sender_id === user.id;
    
    return (
      <motion.div
        key={message.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4`}
      >
        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
          isOwnMessage 
            ? 'bg-orange-500 text-white' 
            : 'bg-gray-200 text-gray-800'
        }`}>
          {message.message_type === 'image' && message.attachments?.[0] && (
            <div className="mb-2">
              <img
                src={`${supabase.storage.from('message-attachments').getPublicUrl(message.attachments[0].file_url).data.publicUrl}`}
                alt={message.content}
                className="rounded-lg max-w-full h-auto"
              />
            </div>
          )}
          
          {message.message_type === 'file' && message.attachments?.[0] && (
            <div className="flex items-center space-x-2 mb-2">
              <File className="w-5 h-5" />
              <span className="text-sm truncate">{message.content}</span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => window.open(
                  supabase.storage.from('message-attachments').getPublicUrl(message.attachments[0].file_url).data.publicUrl
                )}
              >
                <Download className="w-4 h-4" />
              </Button>
            </div>
          )}
          
          <p className="text-sm">{message.content}</p>
          <div className={`text-xs mt-1 ${isOwnMessage ? 'text-orange-100' : 'text-gray-500'}`}>
            {formatTime(message.created_at)}
          </div>
        </div>
      </motion.div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!conversation) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <div className="text-center">
          <h3 className="text-lg font-medium mb-2">{t('messaging_selectConversation')}</h3>
          <p className="text-sm">{t('messaging_selectConversationDesc')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full flex items-center justify-center text-white font-semibold">
              {conversation.otherParticipant?.full_name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                {conversation.otherParticipant?.full_name || t('messaging_unknownUser')}
              </h3>
              {conversation.otherParticipant?.company_name && (
                <p className="text-sm text-gray-600">
                  {conversation.otherParticipant.company_name}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Button variant="ghost" size="sm">
              <Phone className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Video className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Info className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(renderMessage)}
        
        {/* Typing Indicator */}
        <AnimatePresence>
          {otherUserTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex justify-start"
            >
              <div className="bg-gray-200 rounded-lg px-4 py-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            <Paperclip className="w-5 h-5" />
          </Button>
          
          <div className="flex-1">
            <Input
              type="text"
              placeholder={t('messaging_typeMessage')}
              value={newMessage}
              onChange={(e) => handleTyping(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              disabled={uploading}
            />
          </div>
          
          <Button
            onClick={sendMessage}
            disabled={!newMessage.trim() || uploading}
            size="sm"
            className="bg-orange-500 hover:bg-orange-600"
          >
            <Send className="w-4 h-4" />
          </Button>
          
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileUpload}
            accept="image/*,.pdf,.doc,.docx,.txt"
          />
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;