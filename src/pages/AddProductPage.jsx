
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Upload } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const AddProductPage = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Product Added (Simulated)",
      description: "Your new product has been saved successfully.",
      duration: 4000
    });
    setTimeout(() => navigate('/'), 2000);
  };

  const handleUploadClick = () => {
    toast({
        title: t('notImplemented'),
        duration: 3000,
    });
  }

  return (
    <>
      <Helmet>
        <title>{t('pageTitleAddProduct')} - DUBAIMERX</title>
      </Helmet>
      <Header />
      <div className="min-h-screen bg-white pt-28 pb-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Card className="max-w-2xl mx-auto shadow-lg border">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold">{t('pageTitleAddProduct')}</CardTitle>
                <CardDescription>Fill in the details to list a new product on the platform.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="productName">{t('productName')}</Label>
                    <Input id="productName" type="text" required />
                  </div>
                  <div>
                    <Label htmlFor="productDescription">{t('productDescription')}</Label>
                    <Textarea id="productDescription" required />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="productCategory">{t('productCategory')}</Label>
                      <Select required>
                        <SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="electronics">Electronics & Technology</SelectItem>
                          <SelectItem value="fashion">Textiles & Fashion</SelectItem>
                          <SelectItem value="food">Food & Beverages</SelectItem>
                          <SelectItem value="construction">Construction Materials</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="productPrice">{t('productPrice')}</Label>
                      <Input id="productPrice" type="number" step="0.01" required />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="productStock">{t('productStock')}</Label>
                    <Input id="productStock" type="number" required />
                  </div>
                  <div>
                    <Label>{t('productImages')}</Label>
                    <div
                      onClick={handleUploadClick} 
                      className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-orange-500"
                    >
                      <div className="space-y-1 text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <p className="pl-1">{t('uploadImages')}</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold text-lg">{t('addProduct')}</Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddProductPage;
