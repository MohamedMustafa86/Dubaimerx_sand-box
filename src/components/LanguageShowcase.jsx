import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Languages } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const LanguageShowcase = () => {
  const { t, language, changeLanguage, isRTL } = useLanguage();

  const languages = [
    {
      code: 'en',
      name: 'English',
      flag: '🇺🇸',
      sample: 'Connect Gulf Excellence with Global Markets'
    },
    {
      code: 'ar',
      name: 'العربية',
      flag: '🇦🇪',
      sample: 'ربط التميز الخليجي بالأسواق العالمية'
    },
    {
      code: 'fr',
      name: 'Français',
      flag: '🇫🇷',
      sample: 'Connecter l\'Excellence du Golfe aux Marchés Mondiaux'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <Globe className="w-8 h-8 text-orange-500 mr-3 rtl:ml-3 rtl:mr-0" />
            <Languages className="w-8 h-8 text-blue-500" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('language')} {t('supportTitle') || 'Multi-Language Support'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('languageDescription') || 'Experience DUBAIMERX in your preferred language. Switch between English, Arabic, and French seamlessly.'}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {languages.map((lang, index) => (
            <motion.div
              key={lang.code}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`relative group cursor-pointer ${
                language === lang.code ? 'transform scale-105' : ''
              }`}
              onClick={() => changeLanguage(lang.code)}
            >
              <div className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                language === lang.code 
                  ? 'border-orange-400 bg-gradient-to-br from-orange-50 to-orange-100 shadow-lg' 
                  : 'border-gray-200 bg-white hover:border-orange-300 hover:shadow-md'
              }`}>
                {/* Flag and Language Name */}
                <div className="flex items-center justify-center mb-4">
                  <span className="text-4xl mr-3 rtl:ml-3 rtl:mr-0">{lang.flag}</span>
                  <h3 className={`text-xl font-semibold ${
                    language === lang.code ? 'text-orange-700' : 'text-gray-800'
                  } ${lang.code === 'ar' ? 'font-arabic' : ''}`}>
                    {lang.name}
                  </h3>
                </div>

                {/* Sample Text */}
                <div className={`text-center ${lang.code === 'ar' ? 'text-right' : ''}`}>
                  <p className={`text-sm font-medium mb-2 ${
                    language === lang.code ? 'text-orange-600' : 'text-gray-600'
                  }`}>
                    {lang.code === 'en' && 'Sample Text:'}
                    {lang.code === 'ar' && 'نص تجريبي:'}
                    {lang.code === 'fr' && 'Texte d\'exemple:'}
                  </p>
                  <p className={`text-gray-800 leading-relaxed ${
                    lang.code === 'ar' ? 'text-right font-arabic' : ''
                  }`}>
                    "{lang.sample}"
                  </p>
                </div>

                {/* Active Indicator */}
                {language === lang.code && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2 right-2 w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center"
                  >
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </motion.div>
                )}

                {/* Hover Effect */}
                <div className={`absolute inset-0 rounded-xl transition-opacity duration-300 ${
                  language === lang.code 
                    ? 'opacity-0' 
                    : 'opacity-0 group-hover:opacity-10 bg-orange-500'
                }`}></div>
              </div>

              {/* Language Stats */}
              <div className="mt-3 text-center">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  language === lang.code 
                    ? 'bg-orange-100 text-orange-700' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {lang.code === 'en' && 'Primary'}
                  {lang.code === 'ar' && 'أساسي'}
                  {lang.code === 'fr' && 'International'}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Current Language Display */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-white rounded-full px-6 py-3 shadow-md border border-gray-200">
            <Globe className="w-5 h-5 text-orange-500" />
            <span className="text-gray-600">
              {t('currentLanguage') || 'Current Language'}:
            </span>
            <span className="font-semibold text-gray-800">
              {languages.find(l => l.code === language)?.name}
            </span>
            <span className="text-lg">
              {languages.find(l => l.code === language)?.flag}
            </span>
          </div>
        </motion.div>

        {/* Feature List */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse text-gray-600">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-sm">
                {t('featureComplete') || 'Complete Translation'}
              </span>
            </div>
            <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse text-gray-600">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm">
                {t('featureRTL') || 'RTL Support'}
              </span>
            </div>
            <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">
                {t('featureSeamless') || 'Seamless Switching'}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LanguageShowcase;