
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Target, Eye } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';

const PlatformGoalPage = () => {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{t('pageTitlePlatformGoal')} - DUBAIMERX</title>
      </Helmet>
      <Header />
      <div className="min-h-screen bg-white pt-28 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t('platformGoalTitle')}</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('aboutSubtitle')}</p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-0 shadow-lg hover-lift">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Target className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {t('ourMission')}
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {t('ourMissionDesc')}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-0 shadow-lg hover-lift">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Eye className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {t('ourVision')}
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {t('ourVisionDesc')}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="text-center">
            <Link to="/" className="inline-flex items-center space-x-2 text-orange-600 hover:text-orange-700 font-medium">
              <ArrowLeft className="w-5 h-5" />
              <span>{t('backToHome')}</span>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PlatformGoalPage;
