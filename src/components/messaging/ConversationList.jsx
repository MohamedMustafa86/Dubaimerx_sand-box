import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, MessageCircle, Clock, CheckCheck, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/lib/customSupabaseClient';
import { Input } from '@/components/ui/input';

const ConversationList = ({ onSelectConversation, selectedConversationId }) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchConversations();
      subscribeToConversations();
    }
  }, [user]);

  const fetchConversations = async () => {
    try {
      const { data, error } = await supabase
        .from('conversations')
        .select(`
          *,
          participant1:participant1_id(id, full_name, company_name, user_type),
          participant2:participant2_id(id, full_name, company_name, user_type),
          last_message:messages(content, created_at, sender_id, message_type, read_status)
        `)
        .or(`participant1_id.eq.${user.id},participant2_id.eq.${user.id}`)
        .order('updated_at', { ascending: false });

      if (error) throw error;

      const processedConversations = data.map(conv => {
        const otherParticipant = conv.participant1.id === user.id ? conv.participant2 : conv.participant1;
        const lastMessage = conv.last_message?.[0];
        
        return {
          ...conv,
          otherParticipant,
          lastMessage,
          unreadCount: 0 // Will be calculated separately
        };
      });

      setConversations(processedConversations);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const subscribeToConversations = () => {
    const subscription = supabase
      .channel('conversations')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'conversations' },
        () => fetchConversations()
      )
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'messages' },
        () => fetchConversations()
      )
      .subscribe();

    return () => subscription.unsubscribe();
  };

  const filteredConversations = conversations.filter(conv =>
    conv.otherParticipant?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.otherParticipant?.company_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return t('messaging_justNow');
    if (diffInMinutes < 60) return `${diffInMinutes}${t('messaging_minutesAgo')}`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}${t('messaging_hoursAgo')}`;
    return date.toLocaleDateString();
  };

  const getMessageStatus = (message) => {
    if (!message || message.sender_id !== user.id) return null;
    
    switch (message.read_status) {
      case 'sent':
        return <Check className="w-4 h-4 text-gray-400" />;
      case 'delivered':
        return <CheckCheck className="w-4 h-4 text-gray-400" />;
      case 'read':
        return <CheckCheck className="w-4 h-4 text-blue-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Search Bar */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder={t('messaging_searchConversations')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <MessageCircle className="w-12 h-12 mb-4 text-gray-300" />
            <p className="text-lg font-medium">{t('messaging_noConversations')}</p>
            <p className="text-sm">{t('messaging_startFirstConversation')}</p>
          </div>
        ) : (
          filteredConversations.map((conversation) => (
            <motion.div
              key={conversation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedConversationId === conversation.id ? 'bg-orange-50 border-orange-200' : ''
              }`}
              onClick={() => onSelectConversation(conversation)}
            >
              <div className="flex items-start space-x-3 rtl:space-x-reverse">
                {/* Avatar */}
                <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full flex items-center justify-center text-white font-semibold">
                  {conversation.otherParticipant?.full_name?.charAt(0)?.toUpperCase() || 'U'}
                </div>

                {/* Conversation Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {conversation.otherParticipant?.full_name || t('messaging_unknownUser')}
                    </h3>
                    <div className="flex items-center space-x-1 rtl:space-x-reverse text-xs text-gray-500">
                      {getMessageStatus(conversation.lastMessage)}
                      <span>{conversation.lastMessage ? formatTime(conversation.lastMessage.created_at) : ''}</span>
                    </div>
                  </div>
                  
                  {conversation.otherParticipant?.company_name && (
                    <p className="text-sm text-gray-600 truncate">
                      {conversation.otherParticipant.company_name}
                    </p>
                  )}
                  
                  <p className="text-sm text-gray-500 truncate mt-1">
                    {conversation.lastMessage?.content || t('messaging_noMessages')}
                  </p>
                </div>

                {/* Unread Badge */}
                {conversation.unreadCount > 0 && (
                  <div className="bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {conversation.unreadCount}
                  </div>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default ConversationList;