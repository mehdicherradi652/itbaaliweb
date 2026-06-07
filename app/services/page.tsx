'use client';

import { useLanguage } from '@/providers/language-provider';
import { Service } from '@/lib/types';
import { Palette, Layers, CreditCard, FileText, BookOpen, ImageIcon, PanelTop, UtensilsCrossed, Award, Camera, Video, Shirt, Heart, Ticket, Globe, ArrowRight, CheckCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Palette, Layers, CreditCard, FileText, BookOpen, Image: ImageIcon, Banner: PanelTop,
  UtensilsCrossed, Award, Camera, Video, Shirt, Heart, Ticket, Globe,
};

const serviceImages: Record<string, string> = {
  'Logo Design': 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=600',
  'Business Cards': 'https://images.pexels.com/photos/6843265/pexels-photo-6843265.jpeg?auto=compress&cs=tinysrgb&w=600',
  'Flyers & Brochures': 'https://images.pexels.com/photos/7656738/pexels-photo-7656738.jpeg?auto=compress&cs=tinysrgb&w=600',
  'Banners & Signs': 'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=600',
  'Menu Design': 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=600',
  'Social Media': 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=600',
  'Vehicle Branding': 'https://images.pexels.com/photos/2127733/pexels-photo-2127733.jpeg?auto=compress&cs=tinysrgb&w=600',
  'Default': 'https://images.pexels.com/photos/3850994/pexels-photo-3850994.jpeg?auto=compress&cs=tinysrgb&w=600',
};

const serviceFeatures: Record<string, string[]> = {
  'Logo Design': ['Multiple Concepts', 'Unlimited Revisions', 'Vector Files', 'Brand Guidelines'],
  'Business Cards': ['Premium Paper', 'Custom Finishes', 'Unique Designs', 'Fast Turnaround'],
  'Flyers & Brochures': ['Eye-catching Design', 'Print Ready', 'Custom Sizes', 'Marketing Focus'],
  'Banners & Signs': ['Large Format', 'Weather Resistant', 'Vibrant Colors', 'Professional Install'],
  'Menu Design': ['Custom Layout', 'Food Photography', 'Brand Consistency', 'Multiple Formats'],
  'Social Media': ['Content Strategy', 'Engaging Graphics', 'Story Templates', 'Analytics Setup'],
};

export default function ServicesPage() {
  const { t, language } = useLanguage();
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      const { data } = await supabase.from('services').select('*').eq('is_active', true).order('sort_order', { ascending: true });
      if (data) setServices(data);
      setIsLoading(false);
    };
    fetchServices();
  }, []);

  if (!t) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-sky-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500" />
      </div>
    );
  }

  const servicesDict = t.services;
  const quote = t.quote;
  const nav = t.nav;

  const getName = (s: Service) => language === 'ar' ? s.name_ar : language === 'en' ? s.name_en : s.name_fr;
  const getDesc = (s: Service) => language === 'ar' ? s.description_ar : language === 'en' ? s.description_en : s.description_fr;

  // Map service name to image
  const getImage = (s: Service) => {
    const name = getName(s);
    return serviceImages[name] || serviceImages['Default'];
  };

  // Get features for service
  const getFeatures = (s: Service) => {
    const name = getName(s);
    return serviceFeatures[name] || ['Professional Design', 'Quality Materials', 'Fast Delivery', 'Expert Support'];
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-30">
          <Image
            src="https://images.pexels.com/photos/326502/pexels-photo-326502.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Services Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-gray-900/80" />

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-48 h-48 bg-sky-500/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/20 to-sky-500/20 backdrop-blur-sm border border-white/10 text-orange-400 px-6 py-2.5 rounded-full mb-6">
              <Layers className="h-4 w-4" />
              <span className="text-sm font-medium">Professional Services</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {nav.services}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-sky-400 mt-2">
                Excellence in Every Print
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {servicesDict.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1,2,3,4,5,6].map(i => <div key={i} className="h-96 bg-gray-100 rounded-3xl animate-pulse" />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const IconComponent = service.icon ? iconMap[service.icon] || Palette : Palette;
                const features = getFeatures(service);

                return (
                  <Card
                    key={service.id}
                    className="group relative overflow-hidden border border-gray-100 bg-white hover:bg-gradient-to-br hover:from-orange-50 hover:to-white transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/10 rounded-3xl"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Service Image */}
                    <div className="relative h-48 overflow-hidden rounded-t-3xl">
                      <Image
                        src={getImage(service)}
                        alt={getName(service)}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />

                      {/* Icon Badge */}
                      <div className="absolute top-4 left-4 w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-500/30 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                        <IconComponent className="h-7 w-7" />
                      </div>
                    </div>

                    <CardHeader className="pt-4 pb-2 px-6">
                      <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                        {getName(service)}
                      </CardTitle>
                      <CardDescription className="text-gray-600 text-sm leading-relaxed">
                        {getDesc(service)}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="pt-2 px-6 pb-6">
                      {/* Features List */}
                      <ul className="grid grid-cols-2 gap-2 mb-6">
                        {features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-gray-500">
                            <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      {/* CTA Button */}
                      <Button
                        asChild
                        className="w-full bg-gradient-to-r from-gray-100 to-gray-50 hover:from-orange-500 hover:to-orange-600 text-gray-900 hover:text-white border border-gray-200 hover:border-orange-600 rounded-xl h-12 font-semibold transition-all duration-300 group-hover:shadow-lg"
                      >
                        <Link href="/quote">
                          Get Quote
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose ITBAALI?</h2>
            <p className="text-lg text-gray-600">We deliver excellence in every project</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Award, title: 'Premium Quality', desc: 'We use the finest materials and latest technology' },
              { icon: Palette, title: 'Creative Design', desc: 'Unique designs tailored to your brand' },
              { icon: Layers, title: 'Wide Range', desc: 'From business cards to large format prints' },
              { icon: CreditCard, title: 'Competitive Pricing', desc: 'Best value for premium services' },
            ].map((item, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
                  <item.icon className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Process</h2>
            <p className="text-lg text-gray-600">Simple steps to bring your vision to life</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Consult', desc: 'Share your ideas and requirements', icon: ArrowRight },
              { step: '02', title: 'Design', desc: 'Our team creates stunning concepts', icon: ArrowRight },
              { step: '03', title: 'Approve', desc: 'Review and finalize your design', icon: ArrowRight },
              { step: '04', title: 'Print', desc: 'High-quality production & delivery', icon: CheckCircle },
            ].map((item, index) => (
              <div key={index} className="relative text-center group">
                <div className="text-6xl font-bold text-gray-100 group-hover:text-orange-100 transition-colors duration-300 mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>

                {index < 3 && (
                  <div className="hidden md:block absolute top-8 -right-4 text-gray-200">
                    <item.icon className="w-8 h-8" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.pexels.com/photos/2182980/pexels-photo-2182980.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="CTA Background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/95 via-orange-500/90 to-sky-500/85" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">{quote.title}</h2>
            <p className="text-xl text-white/90 mb-10">{quote.subtitle}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-gray-100 font-semibold px-10 h-14 rounded-xl shadow-xl transition-all duration-300 hover:scale-105">
                <Link href="/quote">{quote.form.submit}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold px-10 h-14 rounded-xl transition-all duration-300 hover:scale-105">
                <a href="tel:+212631082817">Call +212 631 082 817</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
