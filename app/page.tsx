'use client';

import { useLanguage } from '@/providers/language-provider';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/lib/supabase/client';
import { Service, Testimonial } from '@/lib/types';
import { useEffect, useState, useRef, useCallback } from 'react';
import { ArrowRight, Phone, MessageCircle, Star, Users, CheckCircle, Zap, Award, Clock } from 'lucide-react';

const PHONE_NUMBER = '+212631082817';

function useCountUp(end: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, start]);
  return count;
}

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const printingImages = [
  'https://pin.it/2yvfJYEJW',
  'https://pin.it/2yvfJYEJW',
  'https://pin.it/2yvfJYEJW',
];

export default function Home() {
  const { t, language } = useLanguage();
  const [services, setServices] = useState<Service[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const statsRef = useRef<HTMLDivElement>(null);
  const [statsInView, setStatsInView] = useState(false);
  const servicesSection = useInView();
  const testimonialsSection = useInView();
  const whyChooseSection = useInView();

  const projectsCount = useCountUp(100, 2000, statsInView);
  const clientsCount = useCountUp(50, 2500, statsInView);
  const satisfactionCount = useCountUp(98, 2000, statsInView);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const [servicesRes, testimonialsRes] = await Promise.all([
        supabase.from('services').select('*').eq('is_active', true).order('sort_order', { ascending: true }).limit(6),
        supabase.from('testimonials').select('*').eq('is_active', true).order('sort_order', { ascending: true }),
      ]);
      if (servicesRes.data) setServices(servicesRes.data);
      if (testimonialsRes.data) setTestimonials(testimonialsRes.data);
      setIsLoading(false);
    };
    fetchData();

    const statsObserver = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsInView(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) statsObserver.observe(statsRef.current);
    return () => statsObserver.disconnect();
  }, []);

  if (!t) return null;

  const getName = (s: Service) => language === 'ar' ? s.name_ar : language === 'en' ? s.name_en : s.name_fr;
  const getDesc = (s: Service) => language === 'ar' ? s.description_ar : language === 'en' ? s.description_en : s.description_fr;
  const getTestimonialContent = (testimonial: Testimonial) => language === 'ar' ? testimonial.content_ar : language === 'en' ? testimonial.content_en : testimonial.content_fr;

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-white overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-30 -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30 -z-10" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="max-w-2xl fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 border border-orange-200 rounded-full mb-6">
                <Star className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-medium text-orange-600">Publicité & Impression Professionnelle</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                ITBAALI
                <span className="block text-gradient-brand">Vos Idées en Réalité</span>
              </h1>

              <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl">
                Nous transformons vos idées en supports visuels professionnels grâce au design graphique, à l'impression et à la communication visuelle.
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                <Button asChild className="btn-primary">
                  <Link href="/quote">
                    Demander un devis
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild className="btn-secondary">
                  <a href={`https://wa.me/${PHONE_NUMBER.replace('+', '')}`} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    WhatsApp
                  </a>
                </Button>
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-orange-500" />
                  <span>Qualité Premium</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-orange-500" />
                  <span>Livraison Rapide</span>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="hidden lg:block relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/hero.png"
                  alt="Professional Printing"
                  width={500}
                  height={400}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent" />
              </div>

              {/* Floating Card */}
              <div className="absolute -bottom-8 -left-8 bg-white rounded-xl shadow-2xl p-6 max-w-xs border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
                    24h
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Temps de réponse</p>
                    <p className="font-bold text-gray-900">Garanti</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-16 bg-gradient-to-r from-orange-500 to-blue-500 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">{projectsCount}+</div>
              <div className="text-white/80">Projets Réalisés</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">{clientsCount}+</div>
              <div className="text-white/80">Clients Satisfaits</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">{satisfactionCount}%</div>
              <div className="text-white/80">Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesSection.ref} className={`section-container transition-all duration-700 ${servicesSection.inView ? 'opacity-100' : 'opacity-0'}`}>
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Nos Services</h2>
          <p className="text-xl text-gray-600">Solutions complètes pour tous vos besoins en publicité et impression</p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1,2,3,4,5,6].map(i => <div key={i} className="h-64 bg-gray-200 rounded-xl animate-pulse" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children">
            {services.map((service) => (
              <Card key={service.id} className="card-hover border-0 shadow-lg rounded-xl overflow-hidden">
                <div className="h-40 bg-gradient-to-br from-orange-50 to-blue-50 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-blue-500 rounded-2xl opacity-20" />
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{getName(service)}</h3>
                  <p className="text-gray-600 mb-6 line-clamp-3">{getDesc(service)}</p>
                  <Button variant="outline" className="w-full border-teal-200 text-teal-600 hover:bg-teal-50">
                    En savoir plus
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Button asChild className="btn-primary">
            <Link href="/services">
              Voir tous les services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Why Choose Us */}
      <section ref={whyChooseSection.ref} className={`section-container bg-gray-50 transition-all duration-700 ${whyChooseSection.inView ? 'opacity-100' : 'opacity-0'}`}>
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Pourquoi nous choisir?</h2>
          <p className="text-xl text-gray-600">Nous offrons l'excellence dans chaque détail</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children">
          {[
            { icon: Award, title: 'Qualité Premium', desc: 'Matériaux haut de gamme et finitions professionnelles' },
            { icon: Zap, title: 'Livraison Rapide', desc: 'Délais respectés et service express disponible' },
            { icon: Users, title: 'Équipe Expérte', desc: 'Designers et techniciens qualifiés' },
            { icon: Star, title: 'Prix Compétitif', desc: 'Tarifs justes sans compromis sur la qualité' },
            { icon: CheckCircle, title: 'Support Client', desc: 'Assistance disponible 24h/24' },
            { icon: Zap, title: 'Équipement Moderne', desc: 'Technologies d\'impression dernière génération' },
          ].map((item, i) => (
            <Card key={i} className="card-hover border-0 shadow-lg rounded-xl p-8">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-600 to-orange-500 rounded-xl flex items-center justify-center text-white mb-4">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section ref={testimonialsSection.ref} className={`section-container transition-all duration-700 ${testimonialsSection.inView ? 'opacity-100' : 'opacity-0'}`}>
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-orange-500 fill-orange-500" />
              ))}
            </div>
            <span className="font-bold text-gray-900">5.0/5</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Ce que disent nos clients</h2>
          <p className="text-xl text-gray-600">Témoignages de nos clients satisfaits</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="card-hover border-0 shadow-lg rounded-xl overflow-hidden bg-gradient-to-br from-white to-gray-50">
              <CardContent className="p-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-orange-500 fill-orange-500" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{getTestimonialContent(testimonial)}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {testimonial.client_name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{testimonial.client_name}</p>
                    {testimonial.client_company && <p className="text-sm text-gray-500">{testimonial.client_company}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-gradient-to-r from-teal-600 to-teal-700 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -z-10" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Prêt à démarrer?</h2>
            <p className="text-xl text-white/90 mb-10">
              Contactez-nous aujourd'hui et recevez une évaluation gratuite de votre projet.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild className="bg-white text-teal-600 hover:bg-gray-100 font-semibold px-8 h-12 rounded-lg shadow-lg">
                <Link href="/quote">Demander un devis</Link>
              </Button>
              <Button
                asChild
                className="bg-white/20 border-2 border-white text-white hover:bg-white/30 font-semibold px-8 h-12 rounded-lg"
              >
                <a href={`https://wa.me/${PHONE_NUMBER.replace('+', '')}`} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
