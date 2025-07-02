import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, User, Building } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const NewConversationModal = ({ isOpen, onClose, onConversationCreated }) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchUsers();
    }
  }, [isOpen]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, company_name, user_type, email')
        .neq('id', user.id)
        .limit(50);

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        variant: "destructive",
        title: t('messaging_errorLoadingUsers'),
        description: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  const createConversation = async (otherUserId) => {
    setCreating(true);
    try {
      // Check if conversation already exists
      const { data: existingConv, error: checkError } = await supabase
        .from('conversations')
        .select('*')
        .or(`and(participant1_id.eq.${user.id},participant2_id.eq.${otherUserId}),and(participant1_id.eq.${otherUserId},participant2_id.eq.${user.id})`)
        .maybeSingle();

      if (checkError) throw checkError;

      if (existingConv) {
        // Conversation already exists, just select it
        onConversationCreated(existingConv);
        onClose();
        return;
      }

      // Create new conversation
      const { data: newConv, error: createError } = await supabase
        .from('conversations')
        .insert([{
          participant1_id: user.id,
          participant2_id: otherUserId,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select(`
          *,
          participant1:participant1_id(id, full_name, company_name, user_type),
          participant2:participant2_id(id, full_name, company_name, user_type)
        `)
        .single();

      if (createError) throw createError;

      // Format conversation data
      const otherParticipant = newConv.participant1.id === user.id ? newConv.participant2 : newConv.participant1;
      const conversationData = {
        ...newConv,
        otherParticipant,
        lastMessage: null,
        unreadCount: 0
      };

      onConversationCreated(conversationData);
      onClose();

      toast({
        title: t('messaging_conversationCreated'),
        description: t('messaging_conversationCreatedDesc')
      });

    } catch (error) {
      console.error('Error creating conversation:', error);
      toast({
        variant: "destructive",
        title: t('messaging_errorCreatingConversation'),
        description: error.message
      });
    } finally {
      setCreating(false);
    }
  };

  const filteredUsers = users.filter(user =>
    user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getUserTypeLabel = (userType) => {
    switch (userType) {
      case 'supplier':
        return t('supplier');
      case 'manufacturer':
        return t('manufacturer');
      case 'buyer':
        return t('client');
      default:
        return t('client');
    }
  };

  const getUserTypeColor = (userType) => {
    switch (userType) {
      case 'supplier':
        return 'bg-blue-100 text-blue-800';
      case 'manufacturer':
        return 'bg-green-100 text-green-800';
      case 'buyer':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[80vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              {t('messaging_newConversation')}
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Search */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder={t('messaging_searchUsers')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full"
              />
            </div>
          </div>

          {/* Users List */}
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-32 text-gray-500">
                <User className="w-8 h-8 mb-2 text-gray-300" />
                <p className="text-sm">{t('messaging_noUsersFound')}</p>
              </div>
            ) : (
              filteredUsers.map((contact) => (
                <motion.div
                  key={contact.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => createConversation(contact.id)}
                >
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    {/* Avatar */}
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full flex items-center justify-center text-white font-semibold">
                      {contact.full_name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>

                    {/* User Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <h3 className="font-medium text-gray-900 truncate">
                          {contact.full_name || t('messaging_unknownUser')}
                        </h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${getUserTypeColor(contact.user_type)}`}>
                          {getUserTypeLabel(contact.user_type)}
                        </span>
                      </div>
                      
                      {contact.company_name && (
                        <div className="flex items-center mt-1 text-sm text-gray-600">
                          <Building className="w-3 h-3 mr-1 rtl:ml-1 rtl:mr-0" />
                          <span className="truncate">{contact.company_name}</span>
                        </div>
                      )}
                      
                      <p className="text-sm text-gray-500 truncate mt-1">
                        {contact.email}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={onClose}
              className="w-full"
              disabled={creating}
            >
              {t('messaging_cancel')}
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default NewConversationModal;