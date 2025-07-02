import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Plus, ArrowLeft, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ConversationList from '@/components/messaging/ConversationList';
import ChatWindow from '@/components/messaging/ChatWindow';
import NewConversationModal from '@/components/messaging/NewConversationModal';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const MessengerPage = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [showNewConversationModal, setShowNewConversationModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showConversationList, setShowConversationList] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setShowConversationList(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Auto-hide conversation list on mobile when a conversation is selected
    if (isMobile && selectedConversation) {
      setShowConversationList(false);
    }
  }, [selectedConversation, isMobile]);

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    if (isMobile) {
      setShowConversationList(false);
    }
  };

  const handleBackToConversations = () => {
    setSelectedConversation(null);
    setShowConversationList(true);
  };

  const handleNewConversation = (conversation) => {
    setSelectedConversation(conversation);
    setShowNewConversationModal(false);
    if (isMobile) {
      setShowConversationList(false);
    }
  };

  // Redirect to login if not authenticated
  if (!user) {
    return (
      <>
        <Helmet>
          <title>{t('pageTitleMessenger')} - DUBAIMERX</title>
        </Helmet>
        <Header />
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 pt-40 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h1 className="text-3xl font-bold mb-4 text-gray-900">{t('pageTitleMessenger')}</h1>
            <p className="text-lg text-gray-600 mb-8 max-w-md">
              {t('messaging_loginRequired')}
            </p>
            <Button 
              onClick={() => window.location.href = '/register'}
              className="bg-orange-500 hover:bg-orange-600"
            >
              {t('signIn')}
            </Button>
          </motion.div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{t('pageTitleMessenger')} - DUBAIMERX</title>
      </Helmet>
      
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <div className="pt-24 pb-4">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
              style={{ height: 'calc(100vh - 8rem)' }}
            >
              <div className="flex h-full">
                {/* Conversation List */}
                <div className={`${
                  isMobile 
                    ? (showConversationList ? 'w-full' : 'hidden') 
                    : 'w-1/3 border-r border-gray-200'
                } flex flex-col`}>
                  {/* Header */}
                  <div className="bg-white border-b border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                      <h1 className="text-xl font-semibold text-gray-900">
                        {t('messaging_conversations')}
                      </h1>
                      <Button
                        onClick={() => setShowNewConversationModal(true)}
                        size="sm"
                        className="bg-orange-500 hover:bg-orange-600"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Conversation List Component */}
                  <div className="flex-1 overflow-hidden">
                    <ConversationList
                      onSelectConversation={handleSelectConversation}
                      selectedConversationId={selectedConversation?.id}
                    />
                  </div>
                </div>

                {/* Chat Window */}
                <div className={`${
                  isMobile 
                    ? (showConversationList ? 'hidden' : 'w-full') 
                    : 'flex-1'
                } flex flex-col`}>
                  {/* Mobile Back Button */}
                  {isMobile && selectedConversation && (
                    <div className="bg-white border-b border-gray-200 p-4 md:hidden">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBackToConversations}
                        className="flex items-center space-x-2"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>{t('messaging_conversations')}</span>
                      </Button>
                    </div>
                  )}

                  {/* Chat Window Component */}
                  <div className="flex-1">
                    {selectedConversation ? (
                      <ChatWindow
                        conversation={selectedConversation}
                        onBack={handleBackToConversations}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full bg-gray-50">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="text-center"
                        >
                          <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                          <h3 className="text-xl font-medium text-gray-700 mb-2">
                            {t('messaging_selectConversation')}
                          </h3>
                          <p className="text-gray-500 mb-6">
                            {t('messaging_selectConversationDesc')}
                          </p>
                          <Button
                            onClick={() => setShowNewConversationModal(true)}
                            className="bg-orange-500 hover:bg-orange-600"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            {t('messaging_newConversation')}
                          </Button>
                        </motion.div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* New Conversation Modal */}
        <NewConversationModal
          isOpen={showNewConversationModal}
          onClose={() => setShowNewConversationModal(false)}
          onConversationCreated={handleNewConversation}
        />
      </div>
    </>
  );
};

export default MessengerPage;