import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ProfilePage = () => {
  const { t } = useLanguage();
  return (
    <>
      <Helmet>
        <title>{t('pageTitleProfile')} - DUBAIMERX</title>
      </Helmet>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 pt-40 pb-20">
        <h1 className="text-4xl font-bold mb-4">{t('pageTitleProfile')}</h1>
        <p className="text-lg text-gray-600 mb-8">{t('comingSoon')}</p>
        <Link to="/" className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 font-medium">
          <ArrowLeft className="w-5 h-5" />
          <span>{t('backToHome')}</span>
        </Link>
      </div>
      <Footer />
    </>
  );
};
export default ProfilePage;