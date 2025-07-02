import React from 'react';
import { motion } from 'framer-motion';
import { Home, Lightbulb, MessageCircle, ShoppingCart, User } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const footerItems = [
    { key: 'home', icon: Home, path: '/' },
    { key: 'tips', icon: Lightbulb, path: '/tips' },
    { key: 'messenger', icon: MessageCircle, path: '/messenger' },
    { key: 'cart', icon: ShoppingCart, path: '/cart' },
    { key: 'myDubaimerx', icon: User, path: '/profile' }
  ];

  const handleFooterClick = (path) => {
    navigate(path);
  };

  return (
    <motion.footer
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg"
    >
      <div className="container mx-auto px-1 py-0.5">
        <div className="flex items-center justify-around">
          {footerItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <motion.button
                key={item.key}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleFooterClick(item.path)}
                className={`flex flex-col items-center space-y-0.5 p-1 rounded-md transition-all duration-200 w-14 ${
                  isActive 
                    ? 'text-pink-500' 
                    : 'text-gray-500 hover:text-pink-500'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-xs font-medium">{t(item.key)}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;