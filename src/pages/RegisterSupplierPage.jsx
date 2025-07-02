
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

const RegisterSupplierPage = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    company: '',
    licenseNumber: '',
    companyType: '',
    fullName: '',
    email: '',
    phone: '',
    country: ''
  });

  const countries = [
    'United Arab Emirates', 'Saudi Arabia', 'Kuwait', 'Qatar', 'Bahrain', 'Oman',
    'United States', 'United Kingdom', 'Germany', 'France', 'China', 'India',
    'Turkey', 'Egypt', 'Jordan', 'Lebanon', 'Morocco', 'Tunisia'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const registrationData = { ...formData, registeredAt: new Date().toISOString(), id: Date.now().toString() };
    localStorage.setItem('dubaimerx_user_supplier', JSON.stringify(registrationData));
    toast({
      title: "Registration Successful! 🎉",
      description: "Welcome to DUBAIMERX! Your supplier account has been created.",
      duration: 5000,
    });
    setTimeout(() => navigate('/'), 2000);
  };

  return (
    <>
      <Helmet>
        <title>{t('supplierRegistration')} - DUBAIMERX</title>
      </Helmet>
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="w-full max-w-lg">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            onClick={() => navigate('/register')}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6 font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{t('backToHome')}</span>
          </motion.button>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Card className="shadow-2xl border">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">{t('supplierRegistration')}</CardTitle>
                <CardDescription>{t('registerAsSupplierDesc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold">{t('businessInfo')}</h3>
                    <div>
                      <Label htmlFor="company">{t('company')}</Label>
                      <Input id="company" type="text" value={formData.company} onChange={(e) => handleInputChange('company', e.target.value)} required />
                    </div>
                    <div>
                      <Label htmlFor="licenseNumber">{t('licenseNumber')}</Label>
                      <Input id="licenseNumber" type="text" value={formData.licenseNumber} onChange={(e) => handleInputChange('licenseNumber', e.target.value)} required />
                    </div>
                    <div>
                      <Label>{t('companyType')}</Label>
                      <Select onValueChange={(value) => handleInputChange('companyType', value)} required>
                        <SelectTrigger><SelectValue placeholder="Select company type" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="supplier">{t('supplier')}</SelectItem>
                          <SelectItem value="manufacturer">{t('manufacturer')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold">Contact Person</h3>
                    <div>
                      <Label htmlFor="fullName">{t('fullName')}</Label>
                      <Input id="fullName" type="text" value={formData.fullName} onChange={(e) => handleInputChange('fullName', e.target.value)} required />
                    </div>
                    <div>
                      <Label htmlFor="email">{t('email')}</Label>
                      <Input id="email" type="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} required />
                    </div>
                    <div>
                      <Label htmlFor="phone">{t('phone')}</Label>
                      <Input id="phone" type="tel" value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} required />
                    </div>
                  </div>
                  <div>
                    <Label>{t('country')}</Label>
                    <Select onValueChange={(value) => handleInputChange('country', value)} required>
                      <SelectTrigger><SelectValue placeholder="Select your country" /></SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => <SelectItem key={country} value={country}>{country}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold text-lg">{t('createAccount')}</Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default RegisterSupplierPage;
