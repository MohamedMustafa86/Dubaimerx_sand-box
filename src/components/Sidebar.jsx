import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Home, Info, Target, PlusCircle, User, LogIn } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from './ui/button';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { t, isRTL } = useLanguage();
  const location = useLocation();

  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: isRTL ? '100%' : '-100%' },
  };

  const navItems = [
    { name: t('home'), path: '/', icon: Home },
    { name: t('pageTitleAboutUs'), path: '/about', icon: Info },
    { name: t('pageTitlePlatformGoal'), path: '/platform-goal', icon: Target },
    { name: t('addProduct'), path: '/add-product', icon: PlusCircle },
    { name: t('myDubaimerx'), path: '/profile', icon: User },
    { name: t('registerAsSupplier'), path: '/register', icon: LogIn },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 z-50"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            variants={sidebarVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`fixed top-0 ${isRTL ? 'right-0' : 'left-0'} h-full w-72 bg-white shadow-2xl z-50 flex flex-col`}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-bold text-gradient">{t('sidebarTitle')}</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="flex-1 p-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center p-3 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? 'bg-orange-100 text-orange-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;