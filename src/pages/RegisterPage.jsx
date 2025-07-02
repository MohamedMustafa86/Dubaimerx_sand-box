
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Building, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const RegisterChoicePage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleChoice = (path) => {
    navigate(path);
  };

  return (
    <>
      <Helmet>
        <title>{t('registerChoiceTitle')} - DUBAIMERX</title>
        <meta name="description" content="Choose your account type on DUBAIMERX. Register as a buyer to source products or as a supplier/manufacturer to sell globally." />
      </Helmet>

      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6 font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{t('backToHome')}</span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{t('registerChoiceTitle')}</h1>
            <p className="text-lg text-gray-600">{t('registerChoiceSubtitle')}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card 
                className="h-full text-center hover-lift border-2 border-transparent hover:border-orange-500 cursor-pointer shadow-xl"
                onClick={() => handleChoice('/register/buyer')}
              >
                <CardHeader>
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-2xl">{t('registerAsBuyer')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-6">{t('registerAsBuyerDesc')}</CardDescription>
                  <div className="flex justify-center items-center text-orange-500 font-semibold">
                    <span>Get Started</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card 
                className="h-full text-center hover-lift border-2 border-transparent hover:border-orange-500 cursor-pointer shadow-xl"
                onClick={() => handleChoice('/register/supplier')}
              >
                <CardHeader>
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Building className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-2xl">{t('registerAsSupplier')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-6">{t('registerAsSupplierDesc')}</CardDescription>
                  <div className="flex justify-center items-center text-orange-500 font-semibold">
                    <span>Get Started</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterChoicePage;
