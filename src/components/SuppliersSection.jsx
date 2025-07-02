
import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Users, Award } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const SuppliersSection = () => {
  const { t } = useLanguage();
  const { toast } = useToast();

  const suppliers = [
    {
      id: 1,
      name: 'Emirates Tech Solutions',
      nameAr: 'حلول الإمارات التقنية',
      nameFr: 'Solutions Tech Émirats',
      location: 'Dubai, UAE',
      locationAr: 'دبي، الإمارات',
      locationFr: 'Dubaï, EAU',
      rating: 4.9,
      reviews: 245,
      employees: '500+',
      speciality: 'Electronics & Technology',
      specialityAr: 'الإلكترونيات والتكنولوجيا',
      specialityFr: 'Électronique et Technologie',
      verified: true,
      badge: 'Gold Supplier'
    },
    {
      id: 2,
      name: 'Gulf Fashion House',
      nameAr: 'بيت الأزياء الخليجي',
      nameFr: 'Maison de Mode du Golfe',
      location: 'Abu Dhabi, UAE',
      locationAr: 'أبوظبي، الإمارات',
      locationFr: 'Abu Dhabi, EAU',
      rating: 4.8,
      reviews: 189,
      employees: '200+',
      speciality: 'Textiles & Fashion',
      specialityAr: 'المنسوجات والأزياء',
      specialityFr: 'Textiles et Mode',
      verified: true,
      badge: 'Premium Partner'
    },
    {
      id: 3,
      name: 'Arabian Food Industries',
      nameAr: 'الصناعات الغذائية العربية',
      nameFr: 'Industries Alimentaires Arabes',
      location: 'Sharjah, UAE',
      locationAr: 'الشارقة، الإمارات',
      locationFr: 'Sharjah, EAU',
      rating: 4.7,
      reviews: 156,
      employees: '300+',
      speciality: 'Food & Beverages',
      specialityAr: 'الأغذية والمشروبات',
      specialityFr: 'Alimentation et Boissons',
      verified: true,
      badge: 'Certified Supplier'
    }
  ];

  const handleViewProfile = (supplier) => {
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
            {t('suppliersTitle')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('suppliersSubtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {suppliers.map((supplier, index) => (
            <motion.div
              key={supplier.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="group hover-lift border-0 shadow-lg overflow-hidden">
                <div className="relative">
                  <img  
                    alt={`${supplier.name} company building`}
                    className="w-full h-48 object-cover"
                   src="https://images.unsplash.com/photo-1683022929127-d97c5c34db19" />
                  
                  {supplier.verified && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
                      <Award className="w-4 h-4" />
                      <span>Verified</span>
                    </div>
                  )}
                  
                  <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {supplier.badge}
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {supplier.name}
                    </h3>
                    
                    <div className="flex items-center space-x-2 text-gray-600 mb-2">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{supplier.location}</span>
                    </div>
                    
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-semibold">{supplier.rating}</span>
                        <span className="text-sm text-gray-500">({supplier.reviews})</span>
                      </div>
                      
                      <div className="flex items-center space-x-1 text-gray-600">
                        <Users className="w-4 h-4" />
                        <span className="text-sm">{supplier.employees}</span>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium inline-block">
                      {supplier.speciality}
                    </div>
                  </div>

                  <Button
                    onClick={() => handleViewProfile(supplier)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                  >
                    {t('viewProfile')}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button
            onClick={() => handleViewProfile('all')}
            className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition-colors shadow-lg hover-lift"
          >
            View All Suppliers
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default SuppliersSection;
