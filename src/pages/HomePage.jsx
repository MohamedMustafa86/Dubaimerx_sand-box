
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import CategoriesSection from '@/components/CategoriesSection';
import SuppliersSection from '@/components/SuppliersSection';
import TrustSection from '@/components/TrustSection';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Building, ShoppingBag } from 'lucide-react';

const PromoBanners = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 -mt-16 mb-12 relative z-10">
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-gradient-to-tr from-orange-500 to-amber-500 p-6 rounded-xl shadow-lg text-white"
        >
          <div className="flex items-center">
            <Building className="w-10 h-10 mr-4 rtl:ml-4 rtl:mr-0" />
            <div>
              <h3 className="font-bold text-lg">{t('promoBannerSupplier_title')}</h3>
              <p className="text-sm">{t('promoBannerSupplier_desc')}</p>
            </div>
          </div>
          <Button onClick={() => navigate('/register/supplier')} variant="outline" className="w-full mt-4 bg-white/20 text-white border-white hover:bg-white/30">
            {t('registerAsSupplier')} <ArrowRight className="ml-2 rtl:mr-2 rtl:ml-0 w-4 h-4" />
          </Button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gradient-to-tr from-blue-500 to-sky-500 p-6 rounded-xl shadow-lg text-white"
        >
          <div className="flex items-center">
            <ShoppingBag className="w-10 h-10 mr-4 rtl:ml-4 rtl:mr-0" />
            <div>
              <h3 className="font-bold text-lg">{t('promoBannerBuyer_title')}</h3>
              <p className="text-sm">{t('promoBannerBuyer_desc')}</p>
            </div>
          </div>
          <Button onClick={() => navigate('/register/buyer')} variant="outline" className="w-full mt-4 bg-white/20 text-white border-white hover:bg-white/30">
            {t('registerAsBuyer')} <ArrowRight className="ml-2 rtl:mr-2 rtl:ml-0 w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};


const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>DUBAIMERX - Connect Gulf Excellence with Global Markets</title>
        <meta name="description" content="Leading B2B platform connecting Gulf suppliers, manufacturers and exporters with international buyers. Discover premium non-oil products from UAE and GCC region." />
      </Helmet>
      
      <div className="min-h-screen bg-white">
        <Header />
        
        <main className="pt-24 pb-16">
          <HeroSection />
          <PromoBanners />
          <CategoriesSection />
          <SuppliersSection />
          <TrustSection />
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
