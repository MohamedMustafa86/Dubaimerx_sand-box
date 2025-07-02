import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Search, Menu } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/components/ui/use-toast';
import { Link, NavLink } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import Sidebar from '@/components/Sidebar';
const Header = () => {
  const {
    language,
    changeLanguage,
    t,
    isRTL
  } = useLanguage();
  const {
    toast
  } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isLangOpen, setLangOpen] = useState(false);
  const langRef = useRef(null);
  const languages = [{
    code: 'en',
    name: 'English',
    flag: '🇺🇸'
  }, {
    code: 'ar',
    name: 'العربية',
    flag: '🇦🇪'
  }, {
    code: 'fr',
    name: 'Français',
    flag: '🇫🇷'
  }];
  useEffect(() => {
    const handleClickOutside = event => {
      if (langRef.current && !langRef.current.contains(event.target)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [langRef]);
  const handleLanguageChange = langCode => {
    changeLanguage(langCode);
    setLangOpen(false);
    toast({
      title: "Language Changed",
      description: `Language switched to ${languages.find(l => l.code === langCode)?.name}`,
      duration: 2000
    });
  };
  const handleSearchSubmit = e => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    toast({
      title: "Search Submitted",
      description: `You searched for: ${searchQuery}`
    });
  };
  const navItems = [{
    key: 'products',
    path: '/products'
  }, {
    key: 'manufacturers',
    path: '/manufacturers'
  }, {
    key: 'suppliers',
    path: '/suppliers'
  }];
  return <>
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />
      <motion.header initial={{
      y: -100,
      opacity: 0
    }} animate={{
      y: 0,
      opacity: 1
    }} transition={{
      duration: 0.5
    }} className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-4 py-1 flex flex-col items-center">
          <div className="w-full flex justify-between items-center mb-1.5">
            <div className="relative" ref={langRef}>
              <motion.button whileHover={{
              scale: 1.1
            }} onClick={() => setLangOpen(!isLangOpen)} className="p-1 text-gray-600 hover:text-orange-500 transition-colors">
                <Globe className="w-4 h-4" />
              </motion.button>
              <AnimatePresence>
                {isLangOpen && <motion.div initial={{
                opacity: 0,
                y: -10
              }} animate={{
                opacity: 1,
                y: 0
              }} exit={{
                opacity: 0,
                y: -10
              }} className={`absolute top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 min-w-[120px] ${isRTL ? 'right-0' : 'left-0'}`}>
                    {languages.map(lang => <button key={lang.code} onClick={() => handleLanguageChange(lang.code)} className={`w-full px-4 py-2 text-left hover:bg-orange-50 transition-colors flex items-center space-x-2 text-sm ${language === lang.code ? 'bg-orange-50 text-orange-600' : 'text-gray-700'} ${lang.code === 'ar' ? 'text-right' : ''}`}>
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>)}
                  </motion.div>}
              </AnimatePresence>
            </div>
            
            <Link to="/">
              <motion.div whileHover={{
              scale: 1.05
            }} className="flex items-center">
                <span className="text-lg font-bold text-gradient">DUBAIMERX.COM          </span>
              </motion.div>
            </Link>

            <motion.button whileHover={{
            scale: 1.1
          }} whileTap={{
            scale: 0.9
          }} onClick={() => setSidebarOpen(true)} className="p-1 text-gray-600 hover:text-orange-500 transition-colors">
              <Menu className="w-4 h-4" />
            </motion.button>
          </div>

          <form onSubmit={handleSearchSubmit} className="w-full max-w-md relative mb-1.5">
            <Input type="search" placeholder={t('search')} value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="h-8 pl-8 pr-3 rounded-full border-gray-300 focus:border-orange-500 focus:ring-orange-500 text-xs" />
            <button type="submit" className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${isRTL ? 'right-2.5' : 'left-2.5'}`}>
              <Search className="w-3.5 h-3.5" />
            </button>
          </form>

          <nav className="w-full flex justify-center items-center space-x-2">
            {navItems.map(item => <NavLink key={item.key} to={item.path} className={({
            isActive
          }) => `py-1 px-3 text-xs font-semibold transition-colors duration-200 border-b-2
                  ${isActive ? 'text-orange-600 border-orange-600' : 'text-gray-500 border-transparent hover:text-orange-500 hover:border-orange-500'}`}>
                {t(item.key)}
              </NavLink>)}
          </nav>
        </div>
      </motion.header>
    </>;
};
export default Header;