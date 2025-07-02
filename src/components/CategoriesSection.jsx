
import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Check } from 'lucide-react';

const CategoriesSection = () => {
  const { t } = useLanguage();
  const { toast } = useToast();

  const categoriesData = [
    { id: 1, icon: '🧴', nameKey: 'cat_consumer', examples: ['cat_consumer_ex1', 'cat_consumer_ex2', 'cat_consumer_ex3', 'cat_consumer_ex4'], color: 'from-pink-500 to-rose-500' },
    { id: 2, icon: '🍱', nameKey: 'cat_food', examples: ['cat_food_ex1', 'cat_food_ex2', 'cat_food_ex3', 'cat_food_ex4'], color: 'from-green-500 to-emerald-500' },
    { id: 3, icon: '🏗️', nameKey: 'cat_building', examples: ['cat_building_ex1', 'cat_building_ex2', 'cat_building_ex3', 'cat_building_ex4'], color: 'from-gray-500 to-slate-500' },
    { id: 4, icon: '⚙️', nameKey: 'cat_industrial', examples: ['cat_industrial_ex1', 'cat_industrial_ex2', 'cat_industrial_ex3', 'cat_industrial_ex4'], color: 'from-blue-500 to-cyan-500' },
    { id: 5, icon: '💡', nameKey: 'cat_tech', examples: ['cat_tech_ex1', 'cat_tech_ex2', 'cat_tech_ex3', 'cat_tech_ex4'], color: 'from-indigo-500 to-purple-500' },
    { id: 6, icon: '💊', nameKey: 'cat_medical', examples: ['cat_medical_ex1', 'cat_medical_ex2', 'cat_medical_ex3', 'cat_medical_ex4'], color: 'from-red-500 to-orange-500' },
    { id: 7, icon: '📦', nameKey: 'cat_packaging', examples: ['cat_packaging_ex1', 'cat_packaging_ex2', 'cat_packaging_ex3', 'cat_packaging_ex4'], color: 'from-amber-500 to-yellow-500' },
    { id: 8, icon: '🪑', nameKey: 'cat_furniture', examples: ['cat_furniture_ex1', 'cat_furniture_ex2', 'cat_furniture_ex3', 'cat_furniture_ex4'], color: 'from-lime-500 to-green-500' },
    { id: 9, icon: '🌿', nameKey: 'cat_sustainable', examples: ['cat_sustainable_ex1', 'cat_sustainable_ex2', 'cat_sustainable_ex3', 'cat_sustainable_ex4'], color: 'from-teal-500 to-cyan-500' },
  ];

  const handleCategoryClick = () => {
    toast({
      title: t('notImplemented'),
      duration: 3000,
    });
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('categoriesTitle')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('categoriesSubtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoriesData.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <Card 
                className="group cursor-pointer hover-lift border border-gray-200 shadow-lg overflow-hidden h-full flex flex-col"
                onClick={handleCategoryClick}
              >
                <div className={`h-2 bg-gradient-to-r ${category.color}`}></div>
                <CardContent className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center space-x-4 rtl:space-x-reverse mb-4">
                    <div className={`w-14 h-14 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center text-3xl shadow-md`}>
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                      {t(category.nameKey)}
                    </h3>
                  </div>
                  
                  <div className="mt-4 border-t pt-4 flex-grow">
                    <h4 className="font-semibold text-sm text-gray-500 mb-2">{t('productExamples')}</h4>
                    <ul className="space-y-1.5">
                      {category.examples.map(exampleKey => (
                        <li key={exampleKey} className="flex items-center text-sm text-gray-700">
                           <Check className="w-3.5 h-3.5 mr-2 rtl:ml-2 rtl:mr-0 text-green-500 flex-shrink-0" />
                          <span>{t(exampleKey)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button
            onClick={handleCategoryClick}
            className="bg-orange-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-700 transition-colors shadow-lg hover-lift"
          >
            {t('viewAllCategories')}
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default CategoriesSection;
