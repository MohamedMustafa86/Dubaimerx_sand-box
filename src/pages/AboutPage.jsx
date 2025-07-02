
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Target, Eye, Users, Globe, Award, Zap } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const AboutPage = () => {
  const { t } = useLanguage();

  const values = [
    {
      icon: Users,
      title: 'Trust & Reliability',
      description: 'Building lasting relationships through verified partnerships and transparent business practices.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Globe,
      title: 'Global Connectivity',
      description: 'Connecting Gulf excellence with international markets through innovative digital solutions.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Award,
      title: 'Quality Excellence',
      description: 'Promoting the highest standards of Gulf products and manufacturing excellence worldwide.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Leveraging cutting-edge technology to revolutionize B2B trade in the Gulf region.',
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <>
      <Helmet>
        <title>{t('pageTitleAboutUs')} - DUBAIMERX</title>
        <meta name="description" content="Learn about DUBAIMERX mission to connect Gulf excellence with global markets. Leading B2B platform for non-oil Gulf products and international trade." />
      </Helmet>
      <Header />
      <div className="min-h-screen bg-white pt-28 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              {t('aboutTitle')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              {t('aboutSubtitle')}
            </p>
          </motion.div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              {t('aboutDescription')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
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
              transition={{ duration: 0.8, delay: 0.6 }}
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

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center mt-12"
          >
            <Link to="/" className="inline-flex items-center space-x-2 text-orange-600 hover:text-orange-700 font-medium">
              <ArrowLeft className="w-5 h-5" />
              <span>{t('backToHome')}</span>
            </Link>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
