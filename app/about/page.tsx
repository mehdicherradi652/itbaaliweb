'use client';

import { useLanguage } from '@/providers/language-provider';
import { Award, Palette, Users, Clock, CheckCircle, Target, Heart, Zap } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import React from 'react';

function useInViewHook(threshold = 0.1) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function AboutPage() {
  const { t } = useLanguage();
  const storySection = useInViewHook();
  const valuesSection = useInViewHook();
  const teamSection = useInViewHook();

  if (!t) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-sky-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500" />
      </div>
    );
  }

  const about = t.about;

  const stats = [
    { icon: Users, value: '500+', label: about.stats?.clients || 'Happy Clients' },
    { icon: Award, value: '1000+', label: about.stats?.projects || 'Projects Completed' },
    { icon: Clock, value: '12+', label: about.stats?.years || 'Years Experience' },
  ];

  const values = [
    { icon: Award, title: about.values?.quality || 'Quality', description: about.values?.quality_desc || 'We deliver exceptional quality in every project' },
    { icon: Palette, title: about.values?.creativity || 'Creativity', description: about.values?.creativity_desc || 'Innovative designs that stand out' },
    { icon: CheckCircle, title: about.values?.reliability || 'Reliability', description: about.values?.reliability_desc || 'On-time delivery, every time' },
    { icon: Heart, title: 'Passion', description: 'We love what we do, and it shows' },
  ];

  const team = [
    { name: 'Creative Director', image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=300', role: 'Design Leadership' },
    { name: 'Print Specialist', image: 'https://images.pexels.com/photos/3769077/pexels-photo-3769077.jpeg?auto=compress&cs=tinysrgb&w=300', role: 'Production Expert' },
    { name: 'Brand Designer', image: 'https://images.pexels.com/photos/3756165/pexels-photo-3756165.jpeg?auto=compress&cs=tinysrgb&w=300', role: 'Visual Identity' },
    { name: 'Sales Manager', image: 'https://images.pexels.com/photos/3764119/pexels-photo-3764119.jpeg?auto=compress&cs=tinysrgb&w=300', role: 'Client Relations' },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Team Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-gray-900/80" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/20 to-sky-500/20 backdrop-blur-sm border border-white/10 text-orange-400 px-6 py-2.5 rounded-full mb-6">
              <Target className="h-4 w-4" />
              <span className="text-sm font-medium">{about.subtitle}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {about.title}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-sky-400 mt-2">
                Excellence in Every Detail
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {about.story?.content || 'ITBAALI is a leading printing and design company in Tangier, Morocco.'}
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section
        ref={storySection.ref}
        className={`section-container bg-white transition-all duration-700 ${storySection.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="ITBAALI Team"
                width={600}
                height={400}
                className="w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/30 to-transparent" />
            </div>

            {/* Floating Stats Card */}
            <div className="absolute -bottom-8 -right-8 bg-white rounded-3xl p-8 shadow-2xl hidden lg:block">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">12+</p>
                  <p className="text-gray-500">{about.stats?.years || 'Years'}</p>
                </div>
              </div>
            </div>

            {/* Accent Shape */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-sky-500 to-sky-600 rounded-2xl opacity-20 -z-10" />
          </div>

          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-50 to-sky-50 text-orange-600 px-6 py-2.5 rounded-full">
              <Target className="h-4 w-4" />
              <span className="text-sm font-medium">{about.story?.title || 'Our Story'}</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              From Vision to Reality
            </h2>

            <p className="text-lg text-gray-600 leading-relaxed">
              Founded in 2012, ITBAALI has grown from a small print shop to one of Tangier's leading design and printing companies. We combine traditional craftsmanship with cutting-edge technology to deliver exceptional results.
            </p>

            <p className="text-lg text-gray-600 leading-relaxed">
              {about.mission?.content || 'Our mission is to help businesses communicate effectively through stunning visual design and premium-quality printing.'}
            </p>

            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-4 bg-gray-50 rounded-2xl">
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-orange-500" />
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section
        ref={valuesSection.ref}
        className={`py-20 bg-gray-50 transition-all duration-700 ${valuesSection.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-50 to-sky-50 text-sky-600 px-6 py-2.5 rounded-full mb-6">
              <Heart className="h-4 w-4" />
              <span className="text-sm font-medium">{about.values?.title || 'Our Values'}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Drives Us Forward
            </h2>
            <p className="text-lg text-gray-600">
              Our core values define who we are and how we serve our clients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 text-white transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <value.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section
        ref={teamSection.ref}
        className={`py-20 bg-white transition-all duration-700 ${teamSection.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-50 to-sky-50 text-orange-600 px-6 py-2.5 rounded-full mb-6">
              <Users className="h-4 w-4" />
              <span className="text-sm font-medium">Our Team</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet the Experts
            </h2>
            <p className="text-lg text-gray-600">
              Dedicated professionals committed to delivering excellence
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div key={index} className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                <div className="aspect-3/4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white font-bold text-lg">{member.name}</h3>
                  <p className="text-gray-300 text-sm">{member.role}</p>
                </div>
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
            alt="Background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/95 via-orange-500/90 to-sky-500/85" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Work Together?</h2>
            <p className="text-xl text-white/90 mb-10">
              Let's bring your vision to life with our expertise in design and printing.
            </p>
            <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-gray-100 font-semibold px-10 h-14 rounded-xl shadow-xl transition-all duration-300 hover:scale-105">
              <Link href="/quote">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
