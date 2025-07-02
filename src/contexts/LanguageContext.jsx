
import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  en: {
    // Header & Sidebar
    suppliers: 'Suppliers',
    manufacturers: 'Manufacturers',
    products: 'Products',
    sidebarTitle: 'Menu',
    
    // Footer
    home: 'Home',
    tips: 'Tips',
    messenger: 'Messenger',
    cart: 'Cart',
    myDubaimerx: 'My Dubaimerx',
    
    // Homepage
    heroTitle: 'Connect Gulf Excellence with Global Markets',
    heroSubtitle: 'Discover premium non-oil products from the UAE and GCC region. Connect with trusted suppliers, manufacturers, and expand your business globally.',
    getStarted: 'Get Started',
    exploreProducts: 'Explore Products',
    promoBannerSupplier_title: 'Are you a supplier or manufacturer?',
    promoBannerSupplier_desc: 'Register and add your products for free!',
    promoBannerBuyer_title: 'Looking for Gulf Products?',
    promoBannerBuyer_desc: 'Register and source your needs for free!',
    
    // Categories
    categoriesTitle: 'Product Categories',
    categoriesSubtitle: 'Explore our diverse range of Gulf products',
    viewAllCategories: 'View All Categories',
    productExamples: 'Product Examples',
    cat_consumer: 'Consumer Products',
    cat_consumer_ex1: 'Perfumes',
    cat_consumer_ex2: 'Cosmetics',
    cat_consumer_ex3: 'Cleaning supplies',
    cat_consumer_ex4: 'Personal care',
    cat_food: 'Food Products',
    cat_food_ex1: 'Dates & derivatives',
    cat_food_ex2: 'Dairy & juices',
    cat_food_ex3: 'Canned & frozen foods',
    cat_food_ex4: 'Spices & oils',
    cat_building: 'Building Materials',
    cat_building_ex1: 'Ceramics & porcelain',
    cat_building_ex2: 'Industrial glass',
    cat_building_ex3: 'Sanitary ware',
    cat_building_ex4: 'Aluminum & iron',
    cat_industrial: 'Industrial Products',
    cat_industrial_ex1: 'Pipes & cables',
    cat_industrial_ex2: 'Electrical equipment',
    cat_industrial_ex3: 'Plastic products',
    cat_industrial_ex4: 'Filters & components',
    cat_tech: 'Tech & Smart Products',
    cat_tech_ex1: 'Surveillance devices',
    cat_tech_ex2: 'Smart home solutions',
    cat_tech_ex3: 'SaaS applications',
    cat_tech_ex4: 'Light electronics',
    cat_medical: 'Medical & Health',
    cat_medical_ex1: 'Medicines & supplements',
    cat_medical_ex2: 'Gloves & masks',
    cat_medical_ex3: 'First aid kits',
    cat_medical_ex4: 'Medical packaging',
    cat_packaging: 'Packaging Products',
    cat_packaging_ex1: 'Plastic & glass containers',
    cat_packaging_ex2: 'Wrapping coils & boxes',
    cat_packaging_ex3: 'Labels & barcodes',
    cat_packaging_ex4: 'Eco-friendly packaging',
    cat_furniture: 'Furniture & Furnishings',
    cat_furniture_ex1: 'Wooden & metal furniture',
    cat_furniture_ex2: 'Hotel furnishings',
    cat_furniture_ex3: 'Mattresses & curtains',
    cat_furniture_ex4: 'Rugs & carpets',
    cat_sustainable: 'Sustainable Products',
    cat_sustainable_ex1: 'Biodegradable products',
    cat_sustainable_ex2: 'Solar power systems',
    cat_sustainable_ex3: 'Recycling solutions',
    cat_sustainable_ex4: 'Water & energy saving tools',
    
    // Suppliers
    suppliersTitle: 'Featured Suppliers',
    suppliersSubtitle: 'Connect with verified Gulf suppliers and manufacturers',
    viewProfile: 'View Profile',
    
    // Trust section
    trustTitle: 'Why Choose DUBAIMERX?',
    trustSubtitle: 'Your trusted partner for Gulf trade',
    verifiedSuppliers: 'Verified Suppliers',
    verifiedSuppliersDesc: 'All suppliers are thoroughly vetted and verified',
    globalReach: 'Global Reach',
    globalReachDesc: 'Connect with buyers and suppliers worldwide',
    secureTransactions: 'Secure Transactions',
    secureTransactionsDesc: 'Safe and secure payment processing',
    
    // Registration
    registerTitle: 'Join DUBAIMERX',
    registerSubtitle: 'Create your account and start trading',
    registerChoiceTitle: 'Choose Your Account Type',
    registerChoiceSubtitle: 'How would you like to join our platform?',
    registerAsBuyer: 'Register as a Buyer',
    registerAsBuyerDesc: 'Source products and connect with suppliers.',
    registerAsSupplier: 'Register as a Supplier/Manufacturer',
    registerAsSupplierDesc: 'Sell your products to a global audience.',
    buyerRegistration: 'Buyer Registration',
    supplierRegistration: 'Supplier/Manufacturer Registration',
    businessInfo: 'Business Information',
    companyDocs: 'Company Documents',
    licenseNumber: 'Business License Number',
    companyType: 'Company Type',
    fullName: 'Full Name',
    email: 'Email Address',
    phone: 'Phone Number',
    company: 'Company Name',
    userType: 'I am a',
    client: 'Client/Buyer',
    supplier: 'Supplier',
    manufacturer: 'Manufacturer',
    country: 'Country',
    createAccount: 'Create Account',
    alreadyHaveAccount: 'Already have an account?',
    signIn: 'Sign In',
    
    // About & Goal
    aboutTitle: 'About DUBAIMERX',
    aboutSubtitle: 'Connecting Gulf Excellence with Global Markets',
    aboutDescription: 'DUBAIMERX.COM is a leading B2B e-commerce and industrial sourcing platform dedicated to promoting non-oil Gulf products globally. We bridge the gap between Gulf-based suppliers, manufacturers, and exporters with international buyers.',
    ourMission: 'Our Mission',
    ourMissionDesc: 'To create a comprehensive digital marketplace that showcases the quality and diversity of Gulf products while facilitating seamless international trade relationships.',
    ourVision: 'Our Vision',
    ourVisionDesc: 'To become the premier global platform for Gulf trade, fostering economic growth and international partnerships.',
    platformGoalTitle: 'Our Goal',
    
    // Product Management
    addProduct: 'Add Product',
    productName: 'Product Name',
    productDescription: 'Product Description',
    productCategory: 'Product Category',
    productPrice: 'Price (USD)',
    productStock: 'Stock Quantity',
    productImages: 'Product Images',
    uploadImages: 'Upload Images',
    
    // Page Titles
    pageTitleSuppliers: 'Suppliers',
    pageTitleManufacturers: 'Manufacturers',
    pageTitleProducts: 'Products',
    pageTitleTips: 'Tips',
    pageTitleMessenger: 'Messenger',
    pageTitleCart: 'Shopping Cart',
    pageTitleProfile: 'My Profile',
    pageTitleAboutUs: 'About Us',
    pageTitlePlatformGoal: 'Platform Goal',
    pageTitleAddProduct: 'Add New Product',

    // Common
    loading: 'Loading...',
    search: 'What are you looking for?',
    contactUs: 'Contact Us',
    learnMore: 'Learn More',
    notImplemented: '🚧 This feature isn\'t implemented yet—but don\'t worry! You can request it in your next prompt! 🚀',
    backToHome: 'Back to Home',
    comingSoon: 'Content coming soon!',
  },
  ar: {
    // Header & Sidebar
    suppliers: 'الموردين',
    manufacturers: 'المصنعين',
    products: 'المنتجات',
    sidebarTitle: 'القائمة',

    // Footer
    home: 'الرئيسية',
    tips: 'نصائح',
    messenger: 'المراسلة',
    cart: 'السلة',
    myDubaimerx: 'حسابي',
    
    // Homepage
    heroTitle: 'ربط التميز الخليجي بالأسواق العالمية',
    heroSubtitle: 'اكتشف المنتجات الممتازة غير النفطية من دولة الإمارات ومنطقة الخليج. تواصل مع موردين موثوقين ومصنعين ووسع أعمالك عالمياً.',
    getStarted: 'ابدأ الآن',
    exploreProducts: 'استكشف المنتجات',
    promoBannerSupplier_title: 'أنت مورد أو مصنع؟',
    promoBannerSupplier_desc: 'سجل وأضف منتجاتك مجانا!',
    promoBannerBuyer_title: 'هل تبحث عن منتجات خليجية؟',
    promoBannerBuyer_desc: 'سجل واحصل على ما تحتاجه مجاناً!',

    // Categories
    categoriesTitle: 'فئات المنتجات',
    categoriesSubtitle: 'استكشف مجموعتنا المتنوعة من المنتجات الخليجية',
    viewAllCategories: 'عرض كل الفئات',
    productExamples: 'أمثلة للمنتجات',
    cat_consumer: 'المنتجات الاستهلاكية',
    cat_consumer_ex1: 'العطور',
    cat_consumer_ex2: 'مستحضرات التجميل',
    cat_consumer_ex3: 'مواد التنظيف',
    cat_consumer_ex4: 'العناية الشخصية',
    cat_food: 'المنتجات الغذائية',
    cat_food_ex1: 'التمور ومشتقاتها',
    cat_food_ex2: 'الألبان والعصائر',
    cat_food_ex3: 'الأغذية المعلبة والمجمدة',
    cat_food_ex4: 'التوابل والزيوت',
    cat_building: 'مواد البناء والتشطيب',
    cat_building_ex1: 'السيراميك والبورسلين',
    cat_building_ex2: 'الزجاج الصناعي',
    cat_building_ex3: 'الأدوات الصحية',
    cat_building_ex4: 'الألمنيوم والحديد',
    cat_industrial: 'المنتجات الصناعية',
    cat_industrial_ex1: 'الأنابيب والكابلات',
    cat_industrial_ex2: 'المعدات الكهربائية',
    cat_industrial_ex3: 'المنتجات البلاستيكية',
    cat_industrial_ex4: 'الفلاتر والمكونات الصناعية',
    cat_tech: 'منتجات تقنية وذكية',
    cat_tech_ex1: 'أجهزة المراقبة',
    cat_tech_ex2: 'حلول المنازل الذكية',
    cat_tech_ex3: 'تطبيقات وخدمات SaaS',
    cat_tech_ex4: 'أجهزة إلكترونية خفيفة',
    cat_medical: 'المنتجات الطبية والصحية',
    cat_medical_ex1: 'الأدوية والمكملات',
    cat_medical_ex2: 'القفازات والكمامات',
    cat_medical_ex3: 'أدوات الإسعاف الأولي',
    cat_medical_ex4: 'العبوات الطبية',
    cat_packaging: 'منتجات التعبئة والتغليف',
    cat_packaging_ex1: 'عبوات بلاستيكية وزجاجية',
    cat_packaging_ex2: 'لفائف تغليف وصناديق',
    cat_packaging_ex3: 'ملصقات وباركودات',
    cat_packaging_ex4: 'حلول تغليف صديقة للبيئة',
    cat_furniture: 'الأثاث والمفروشات',
    cat_furniture_ex1: 'أثاث خشبي ومعدني',
    cat_furniture_ex2: 'مفروشات فندقية',
    cat_furniture_ex3: 'مراتب وستائر',
    cat_furniture_ex4: 'سجاد وسجاد صناعي',
    cat_sustainable: 'المنتجات المستدامة',
    cat_sustainable_ex1: 'منتجات قابلة للتحلل',
    cat_sustainable_ex2: 'أنظمة طاقة شمسية',
    cat_sustainable_ex3: 'حلول تدوير',
    cat_sustainable_ex4: 'أدوات توفير المياه والطاقة',
    
    // Suppliers
    suppliersTitle: 'الموردين المميزين',
    suppliersSubtitle: 'تواصل مع موردين ومصنعين خليجيين معتمدين',
    viewProfile: 'عرض الملف الشخصي',
    
    // Trust section
    trustTitle: 'لماذا تختار دبي مركس؟',
    trustSubtitle: 'شريكك الموثوق للتجارة الخليجية',
    verifiedSuppliers: 'موردين معتمدين',
    verifiedSuppliersDesc: 'جميع الموردين تم فحصهم والتحقق منهم بدقة',
    globalReach: 'وصول عالمي',
    globalReachDesc: 'تواصل مع المشترين والموردين في جميع أنحاء العالم',
    secureTransactions: 'معاملات آمنة',
    secureTransactionsDesc: 'معالجة دفع آمنة ومضمونة',
    
    // Registration
    registerTitle: 'انضم إلى دبي مركس',
    registerSubtitle: 'أنشئ حسابك وابدأ التداول',
    registerChoiceTitle: 'اختر نوع حسابك',
    registerChoiceSubtitle: 'كيف تود الانضمام إلى منصتنا؟',
    registerAsBuyer: 'التسجيل كمشتري',
    registerAsBuyerDesc: 'ابحث عن المنتجات وتواصل مع الموردين.',
    registerAsSupplier: 'التسجيل كمورد/مصنع',
    registerAsSupplierDesc: 'بع منتجاتك لجمهور عالمي.',
    buyerRegistration: 'تسجيل المشتري',
    supplierRegistration: 'تسجيل المورد/المصنع',
    businessInfo: 'معلومات العمل',
    companyDocs: 'مستندات الشركة',
    licenseNumber: 'رقم الرخصة التجارية',
    companyType: 'نوع الشركة',
    fullName: 'الاسم الكامل',
    email: 'البريد الإلكتروني',
    phone: 'رقم الهاتف',
    company: 'اسم الشركة',
    userType: 'أنا',
    client: 'عميل/مشتري',
    supplier: 'مورد',
    manufacturer: 'مصنع',
    country: 'البلد',
    createAccount: 'إنشاء حساب',
    alreadyHaveAccount: 'لديك حساب بالفعل؟',
    signIn: 'تسجيل الدخول',
    
    // About & Goal
    aboutTitle: 'من نحن',
    aboutSubtitle: 'ربط التميز الخليجي بالأسواق العالمية',
    aboutDescription: 'دبي مركس هي منصة رائدة للتجارة الإلكترونية والمصادر الصناعية مخصصة لترويج المنتجات الخليجية غير النفطية عالمياً. نحن نسد الفجوة بين الموردين والمصنعين والمصدرين الخليجيين مع المشترين الدوليين.',
    ourMission: 'مهمتنا',
    ourMissionDesc: 'إنشاء سوق رقمي شامل يعرض جودة وتنوع المنتجات الخليجية مع تسهيل علاقات التجارة الدولية السلسة.',
    ourVision: 'رؤيتنا',
    ourVisionDesc: 'أن نصبح المنصة العالمية الرائدة للتجارة الخليجية، وتعزيز النمو الاقتصادي والشراكات الدولية.',
    platformGoalTitle: 'هدفنا',
    
    // Product Management
    addProduct: 'إضافة منتج',
    productName: 'اسم المنتج',
    productDescription: 'وصف المنتج',
    productCategory: 'فئة المنتج',
    productPrice: 'السعر (بالدولار الأمريكي)',
    productStock: 'الكمية المتاحة',
    productImages: 'صور المنتج',
    uploadImages: 'رفع الصور',

    // Page Titles
    pageTitleSuppliers: 'الموردين',
    pageTitleManufacturers: 'المصنعين',
    pageTitleProducts: 'المنتجات',
    pageTitleTips: 'نصائح',
    pageTitleMessenger: 'المراسلة',
    pageTitleCart: 'سلة التسوق',
    pageTitleProfile: 'ملفي الشخصي',
    pageTitleAboutUs: 'من نحن',
    pageTitlePlatformGoal: 'هدف المنصة',
    pageTitleAddProduct: 'إضافة منتج جديد',

    // Common
    loading: 'جاري التحميل...',
    search: 'ما الذي تبحث عنه؟',
    contactUs: 'اتصل بنا',
    learnMore: 'اعرف المزيد',
    notImplemented: '🚧 هذه الميزة غير مطبقة بعد - لكن لا تقلق! يمكنك طلبها في رسالتك التالية! 🚀',
    backToHome: 'العودة للرئيسية',
    comingSoon: 'المحتوى قادم قريباً!',
  },
  fr: {
    // Header & Sidebar
    suppliers: 'Fournisseurs',
    manufacturers: 'Fabricants',
    products: 'Produits',
    sidebarTitle: 'Menu',
    
    // Footer
    home: 'Accueil',
    tips: 'Conseils',
    messenger: 'Messagerie',
    cart: 'Panier',
    myDubaimerx: 'Mon Dubaimerx',
    
    // Homepage
    heroTitle: 'Connecter l\'Excellence du Golfe aux Marchés Mondiaux',
    heroSubtitle: 'Découvrez des produits non pétroliers de qualité supérieure des Émirats arabes unis et de la région du CCG. Connectez-vous avec des fournisseurs de confiance, des fabricants et développez votre entreprise à l\'échelle mondiale.',
    getStarted: 'Commencer',
    exploreProducts: 'Explorer les Produits',
    promoBannerSupplier_title: 'Êtes-vous un fournisseur ou un fabricant ?',
    promoBannerSupplier_desc: 'Inscrivez-vous et ajoutez vos produits gratuitement !',
    promoBannerBuyer_title: 'Vous cherchez des produits du Golfe ?',
    promoBannerBuyer_desc: 'Inscrivez-vous et trouvez ce dont vous avez besoin gratuitement !',

    // Categories
    categoriesTitle: 'Catégories de Produits',
    categoriesSubtitle: 'Explorez notre gamme diversifiée de produits du Golfe',
    viewAllCategories: 'Voir toutes les catégories',
    productExamples: 'Exemples de produits',
    cat_consumer: 'Produits de Consommation',
    cat_consumer_ex1: 'Parfums',
    cat_consumer_ex2: 'Cosmétiques',
    cat_consumer_ex3: 'Produits de nettoyage',
    cat_consumer_ex4: 'Soins personnels',
    cat_food: 'Produits Alimentaires',
    cat_food_ex1: 'Dattes et dérivés',
    cat_food_ex2: 'Produits laitiers et jus',
    cat_food_ex3: 'Aliments en conserve et surgelés',
    cat_food_ex4: 'Épices et huiles',
    cat_building: 'Matériaux de Construction',
    cat_building_ex1: 'Céramique et porcelaine',
    cat_building_ex2: 'Verre industriel',
    cat_building_ex3: 'Appareils sanitaires',
    cat_building_ex4: 'Aluminium et fer',
    cat_industrial: 'Produits Industriels',
    cat_industrial_ex1: 'Tuyaux et câbles',
    cat_industrial_ex2: 'Équipement électrique',
    cat_industrial_ex3: 'Produits en plastique',
    cat_industrial_ex4: 'Filtres et composants',
    cat_tech: 'Produits Tech et Intelligents',
    cat_tech_ex1: 'Appareils de surveillance',
    cat_tech_ex2: 'Solutions de maison intelligente',
    cat_tech_ex3: 'Applications SaaS',
    cat_tech_ex4: 'Électronique légère',
    cat_medical: 'Médical et Santé',
    cat_medical_ex1: 'Médicaments et suppléments',
    cat_medical_ex2: 'Gants et masques',
    cat_medical_ex3: 'Kits de premiers secours',
    cat_medical_ex4: 'Emballages médicaux',
    cat_packaging: 'Produits d\'Emballage',
    cat_packaging_ex1: 'Contenants en plastique et en verre',
    cat_packaging_ex2: 'Bobines d\'emballage et boîtes',
    cat_packaging_ex3: 'Étiquettes et codes-barres',
    cat_packaging_ex4: 'Emballages écologiques',
    cat_furniture: 'Meubles et Ameublement',
    cat_furniture_ex1: 'Meubles en bois et en métal',
    cat_furniture_ex2: 'Ameublement hôtelier',
    cat_furniture_ex3: 'Matelas et rideaux',
    cat_furniture_ex4: 'Tapis et moquettes',
    cat_sustainable: 'Produits Durables',
    cat_sustainable_ex1: 'Produits biodégradables',
    cat_sustainable_ex2: 'Systèmes d\'énergie solaire',
    cat_sustainable_ex3: 'Solutions de recyclage',
    cat_sustainable_ex4: 'Outils d\'économie d\'eau et d\'énergie',

    // Suppliers
    suppliersTitle: 'Fournisseurs en Vedette',
    suppliersSubtitle: 'Connectez-vous avec des fournisseurs et fabricants du Golfe vérifiés',
    viewProfile: 'Voir le Profil',
    
    // Trust section
    trustTitle: 'Pourquoi Choisir DUBAIMERX?',
    trustSubtitle: 'Votre partenaire de confiance pour le commerce du Golfe',
    verifiedSuppliers: 'Fournisseurs Vérifiés',
    verifiedSuppliersDesc: 'Tous les fournisseurs sont soigneusement contrôlés et vérifiés',
    globalReach: 'Portée Mondiale',
    globalReachDesc: 'Connectez-vous avec des acheteurs et fournisseurs du monde entier',
    secureTransactions: 'Transactions Sécurisées',
    secureTransactionsDesc: 'Traitement de paiement sûr et sécurisé',
    
    // Registration
    registerTitle: 'Rejoindre DUBAIMERX',
    registerSubtitle: 'Créez votre compte et commencez à trader',
    registerChoiceTitle: 'Choisissez votre type de compte',
    registerChoiceSubtitle: 'Comment souhaitez-vous rejoindre notre plateforme ?',
    registerAsBuyer: 'S\'inscrire en tant qu\'acheteur',
    registerAsBuyerDesc: 'Trouvez des produits et connectez-vous avec des fournisseurs.',
    registerAsSupplier: 'S\'inscrire en tant que fournisseur/fabricant',
    registerAsSupplierDesc: 'Vendez vos produits à un public mondial.',
    buyerRegistration: 'Inscription de l\'acheteur',
    supplierRegistration: 'Inscription du fournisseur/fabricant',
    businessInfo: 'Informations sur l\'entreprise',
    companyDocs: 'Documents de l\'entreprise',
    licenseNumber: 'Numéro de licence commerciale',
    companyType: 'Type d\'entreprise',
    fullName: 'Nom Complet',
    email: 'Adresse Email',
    phone: 'Numéro de Téléphone',
    company: 'Nom de l\'Entreprise',
    userType: 'Je suis un',
    client: 'Client/Acheteur',
    supplier: 'Fournisseur',
    manufacturer: 'Fabricant',
    country: 'Pays',
    createAccount: 'Créer un Compte',
    alreadyHaveAccount: 'Vous avez déjà un compte?',
    signIn: 'Se Connecter',
    
    // About & Goal
    aboutTitle: 'À Propos de DUBAIMERX',
    aboutSubtitle: 'Connecter l\'Excellence du Golfe aux Marchés Mondiaux',
    ourDescription: 'DUBAIMERX.COM est une plateforme leader de commerce électronique B2B et d\'approvisionnement industriel dédiée à la promotion des produits non pétroliers du Golfe à l\'échelle mondiale. Nous comblons le fossé entre les fournisseurs, fabricants et exportateurs basés dans le Golfe avec les acheteurs internationaux.',
    ourMission: 'Notre Mission',
    ourMissionDesc: 'Créer une place de marché numérique complète qui met en valeur la qualité et la diversité des produits du Golfe tout en facilitant des relations commerciales internationales fluides.',
    ourVision: 'Notre Vision',
    ourVisionDesc: 'Devenir la plateforme mondiale de référence pour le commerce du Golfe, favorisant la croissance économique et les partenariats internationaux.',
    platformGoalTitle: 'Notre Objectif',
    
    // Product Management
    addProduct: 'Ajouter un Produit',
    productName: 'Nom du produit',
    productDescription: 'Description du produit',
    productCategory: 'Catégorie de produit',
    productPrice: 'Prix (USD)',
    productStock: 'Quantité en stock',
    productImages: 'Images du produit',
    uploadImages: 'Télécharger des images',

    // Page Titles
    pageTitleSuppliers: 'Fournisseurs',
    pageTitleManufacturers: 'Fabricants',
    pageTitleProducts: 'Produits',
    pageTitleTips: 'Conseils',
    pageTitleMessenger: 'Messagerie',
    pageTitleCart: 'Panier d\'achat',
    pageTitleProfile: 'Mon Profil',
    pageTitleAboutUs: 'À Propos de Nous',
    pageTitlePlatformGoal: 'Objectif de la Plateforme',
    pageTitleAddProduct: 'Ajouter un Nouveau Produit',

    // Common
    loading: 'Chargement...',
    search: 'Que recherchez-vous ?',
    contactUs: 'Nous Contacter',
    learnMore: 'En Savoir Plus',
    notImplemented: '🚧 Cette fonctionnalité n\'est pas encore implémentée - mais ne vous inquiétez pas! Vous pouvez la demander dans votre prochaine demande! 🚀',
    backToHome: 'Retour à l\'accueil',
    comingSoon: 'Contenu bientôt disponible !',
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('ar');

  const t = (key) => {
    return translations[language][key] || key;
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t, isRTL }}>
      <div className={isRTL ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};
