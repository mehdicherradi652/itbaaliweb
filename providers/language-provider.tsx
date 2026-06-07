'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

// Language types
export type Language = 'fr' | 'ar' | 'en';

// Default language
const defaultLanguage: Language = 'fr';

// RTL languages
const rtlLanguages: Language[] = ['ar'];

// Language names
const languageNames: Record<Language, string> = {
  fr: 'Français',
  ar: 'العربية',
  en: 'English',
};

// Translations
const translations = {
  fr: {
    nav: { home: 'Accueil', services: 'Services', portfolio: 'Portfolio', quote: 'Demander un Devis', about: 'À Propos', contact: 'Contact' },
    hero: { title: 'ITBAALI', subtitle: 'Publicité, Impression & Design Graphique', description: 'Créez une image de marque exceptionnelle avec nos services professionnels de design graphique et d\'impression à Tanger, Maroc.', cta: 'Demander un Devis', cta_secondary: 'Voir nos Services' },
    services: { title: 'Nos Services', subtitle: 'Des solutions créatives pour tous vos besoins en publicité et impression', view_all: 'Voir tous les services' },
    portfolio: { title: 'Notre Portfolio', subtitle: 'Découvrez nos réalisations', view_project: 'Voir le projet', all: 'Tous', logos: 'Logos', business_cards: 'Cartes de Visite', flyers: 'Flyers', banners: 'Bannières', menus: 'Menus', invitations: 'Invitations', websites: 'Sites Web' },
    testimonials: { title: 'Ce que disent nos clients', subtitle: 'La satisfaction de nos clients est notre priorité' },
    quote: { title: 'Demander un Devis', subtitle: 'Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais', form: { name: 'Nom complet', email: 'Adresse email', phone: 'Numéro de téléphone', service: 'Type de service', select_service: 'Sélectionnez un service', description: 'Description du projet', budget: 'Budget estimé', deadline: 'Date limite souhaitée', submit: 'Envoyer la demande', success: 'Votre demande a été envoyée avec succès!', error: 'Une erreur s\'est produite.' } },
    about: { title: 'À Propos de ITBAALI', subtitle: 'Votre partenaire créatif à Tanger', story: { title: 'Notre Histoire', content: 'ITBAALI est une entreprise leader dans le domaine de la publicité, de l\'impression et du design graphique à Tanger, Maroc.' }, mission: { title: 'Notre Mission', content: 'Nous visons à transformer les idées en réalité visuelle.' }, values: { title: 'Nos Valeurs', quality: 'Qualité', quality_desc: 'Nous nous engageons à livrer un travail de la plus haute qualité.', creativity: 'Créativité', creativity_desc: 'Nous apportons des idées fraîches et innovantes.', reliability: 'Fiabilité', reliability_desc: 'Vous pouvez compter sur nous.' }, stats: { clients: 'Clients Satisfaits', projects: 'Projets Réalisés', years: 'Années d\'Expérience' } },
    contact: { title: 'Contactez-nous', subtitle: 'Nous sommes là pour vous aider', form: { name: 'Nom complet', email: 'Adresse email', phone: 'Numéro de téléphone', subject: 'Sujet', message: 'Message', submit: 'Envoyer le message', success: 'Votre message a été envoyé avec succès!', error: 'Une erreur s\'est produite.' }, info: { title: 'Informations de Contact', address: 'Boukhalef, Tanger, Maroc', phone: 'Téléphone', email: 'Email', whatsapp: 'WhatsApp', hours: 'Horaires d\'Ouverture', hours_value: 'Lun - Sam: 9h00 - 18h00' } },
    footer: { description: 'Votre partenaire de confiance pour tous vos besoins en publicité, impression et design graphique à Tanger, Maroc.', quick_links: 'Liens Rapides', contact_info: 'Contact', follow_us: 'Suivez-nous', rights: 'Tous droits réservés.' },
    common: { loading: 'Chargement...', error: 'Une erreur s\'est produite', no_results: 'Aucun résultat trouvé' }
  },
  ar: {
    nav: { home: 'الرئيسية', services: 'الخدمات', portfolio: 'أعمالنا', quote: 'طلب عرض سعر', about: 'من نحن', contact: 'اتصل بنا' },
    hero: { title: 'ITBAALI', subtitle: 'إعلان، طباعة وتصميم جرافيك', description: 'أنشئ صورة علامة تجارية استثنائية مع خدماتنا الاحترافية في التصميم الجرافيكي والطباعة في طنجة، المغرب.', cta: 'طلب عرض سعر', cta_secondary: 'عرض خدماتنا' },
    services: { title: 'خدماتنا', subtitle: 'حلول إبداعية لجميع احتياجاتك في الإعلان والطباعة', view_all: 'عرض جميع الخدمات' },
    portfolio: { title: 'أعمالنا', subtitle: 'اكتشف إنجازاتنا', view_project: 'عرض المشروع', all: 'الكل', logos: 'شعارات', business_cards: 'بطاقات عمل', flyers: 'منشورات', banners: 'لافتات', menus: 'قوائم', invitations: 'دعوات', websites: 'مواقع ويب' },
    testimonials: { title: 'ماذا يقول عملاؤنا', subtitle: 'رضا عملائنا هو أولويتنا' },
    quote: { title: 'طلب عرض سعر', subtitle: 'املأ النموذج أدناه وسنرد عليك في أقرب وقت ممكن', form: { name: 'الاسم الكامل', email: 'البريد الإلكتروني', phone: 'رقم الهاتف', service: 'نوع الخدمة', select_service: 'اختر خدمة', description: 'وصف المشروع', budget: 'الميزانية التقديرية', deadline: 'الموعد النهائي المطلوب', submit: 'إرسال الطلب', success: 'تم إرسال طلبك بنجاح!', error: 'حدث خطأ.' } },
    about: { title: 'من نحن ITBAALI', subtitle: 'شريكك الإبداعي في طنجة', story: { title: 'قصتنا', content: 'ITBAALI هي شركة رائدة في مجال الإعلان والطباعة والتصميم الجرافيكي في طنجة، المغرب.' }, mission: { title: 'مهمتنا', content: 'نسعى لتحويل الأفكار إلى واقع مرئي.' }, values: { title: 'قيمنا', quality: 'الجودة', quality_desc: 'نلتزم بتسليم عمل بأعلى جودة.', creativity: 'الإبداع', creativity_desc: 'نجلب أفكاراً جديدة ومبتكرة.', reliability: 'الموثوقية', reliability_desc: 'يمكنك الاعتماد علينا.' }, stats: { clients: 'عميل راضٍ', projects: 'مشروع منجز', years: 'سنوات خبرة' } },
    contact: { title: 'اتصل بنا', subtitle: 'نحن هنا لمساعدتك', form: { name: 'الاسم الكامل', email: 'البريد الإلكتروني', phone: 'رقم الهاتف', subject: 'الموضوع', message: 'الرسالة', submit: 'إرسال الرسالة', success: 'تم إرسال رسالتك بنجاح!', error: 'حدث خطأ.' }, info: { title: 'معلومات الاتصال', address: 'بوكحلف، طنجة، المغرب', phone: 'الهاتف', email: 'البريد الإلكتروني', whatsapp: 'واتساب', hours: 'ساعات العمل', hours_value: 'الاثنين - السبت: 9:00 - 18:00' } },
    footer: { description: 'شريكك الموثوق لجميع احتياجاتك في الإعلان والطباعة والتصميم الجرافيكي في طنجة، المغرب.', quick_links: 'روابط سريعة', contact_info: 'اتصل بنا', follow_us: 'تابعنا', rights: 'جميع الحقوق محفوظة.' },
    common: { loading: 'جاري التحميل...', error: 'حدث خطأ', no_results: 'لم يتم العثور على نتائج' }
  },
  en: {
    nav: { home: 'Home', services: 'Services', portfolio: 'Portfolio', quote: 'Request a Quote', about: 'About Us', contact: 'Contact' },
    hero: { title: 'ITBAALI', subtitle: 'Advertising, Printing & Graphic Design', description: 'Create an exceptional brand image with our professional graphic design and printing services in Tangier, Morocco.', cta: 'Request a Quote', cta_secondary: 'View Our Services' },
    services: { title: 'Our Services', subtitle: 'Creative solutions for all your advertising and printing needs', view_all: 'View All Services' },
    portfolio: { title: 'Our Portfolio', subtitle: 'Discover our achievements', view_project: 'View Project', all: 'All', logos: 'Logos', business_cards: 'Business Cards', flyers: 'Flyers', banners: 'Banners', menus: 'Menus', invitations: 'Invitations', websites: 'Websites' },
    testimonials: { title: 'What Our Clients Say', subtitle: 'Client satisfaction is our priority' },
    quote: { title: 'Request a Quote', subtitle: 'Fill out the form below and we will get back to you as soon as possible', form: { name: 'Full Name', email: 'Email Address', phone: 'Phone Number', service: 'Service Type', select_service: 'Select a service', description: 'Project Description', budget: 'Estimated Budget', deadline: 'Desired Deadline', submit: 'Submit Request', success: 'Your request has been submitted successfully!', error: 'An error occurred.' } },
    about: { title: 'About ITBAALI', subtitle: 'Your creative partner in Tangier', story: { title: 'Our Story', content: 'ITBAALI is a leading company in advertising, printing, and graphic design in Tangier, Morocco.' }, mission: { title: 'Our Mission', content: 'We aim to transform ideas into visual reality.' }, values: { title: 'Our Values', quality: 'Quality', quality_desc: 'We deliver work of the highest quality.', creativity: 'Creativity', creativity_desc: 'We bring fresh and innovative ideas.', reliability: 'Reliability', reliability_desc: 'You can count on us.' }, stats: { clients: 'Satisfied Clients', projects: 'Projects Completed', years: 'Years of Experience' } },
    contact: { title: 'Contact Us', subtitle: 'We\'re here to help you', form: { name: 'Full Name', email: 'Email Address', phone: 'Phone Number', subject: 'Subject', message: 'Message', submit: 'Send Message', success: 'Your message has been sent successfully!', error: 'An error occurred.' }, info: { title: 'Contact Information', address: 'Boukhalef, Tangier, Morocco', phone: 'Phone', email: 'Email', whatsapp: 'WhatsApp', hours: 'Opening Hours', hours_value: 'Mon - Sat: 9:00 AM - 6:00 PM' } },
    footer: { description: 'Your trusted partner for all your advertising, printing, and graphic design needs in Tangier, Morocco.', quick_links: 'Quick Links', contact_info: 'Contact', follow_us: 'Follow Us', rights: 'All rights reserved.' },
    common: { loading: 'Loading...', error: 'An error occurred', no_results: 'No results found' }
  }
};

type Translations = typeof translations.fr;

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  isRtl: boolean;
  t: Translations;
  languageNames: Record<Language, string>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(defaultLanguage);

  const isRtl = rtlLanguages.includes(language);

  const setLanguage = useCallback((newLanguage: Language) => {
    setLanguageState(newLanguage);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', newLanguage);
      document.documentElement.lang = newLanguage;
      document.documentElement.dir = rtlLanguages.includes(newLanguage) ? 'rtl' : 'ltr';
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('language') as Language | null;
      if (saved && ['fr', 'ar', 'en'].includes(saved)) {
        setLanguageState(saved);
      }
      document.documentElement.lang = language;
      document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    }
  }, [language, isRtl]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    isRtl,
    t: translations[language],
    languageNames,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
