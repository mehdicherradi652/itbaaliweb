'use client';

import { useLanguage } from '@/providers/language-provider';
import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Send, CheckCircle, Loader2, Phone, Mail, MapPin, Clock, MessageCircle, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const PHONE_NUMBER = '+212631082817';
const EMAIL = 'itbaalione@gmail.com';
const ADDRESS = 'Boukhalef, Tangier, Morocco';

export default function ContactPage() {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('contact_messages').insert([{
        name: formData.name, email: formData.email, phone: formData.phone || null,
        subject: formData.subject || null, message: formData.message,
      }]);
      if (error) throw error;
      setIsSubmitted(true);
      toast.success(t.contact?.form?.success || 'Message sent successfully!');
    } catch {
      toast.error(t.contact?.form?.error || 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!t) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-sky-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500" />
      </div>
    );
  }

  const contact = t.contact;
  const nav = t.nav;
  const whatsappUrl = `https://wa.me/212631082817?text=${encodeURIComponent('Bonjour! Je suis intéressé par vos services.')}`;

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <Card className="max-w-lg mx-auto text-center border-none shadow-2xl rounded-3xl overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-orange-500 to-sky-500" />
            <CardContent className="pt-12 pb-10">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mb-8">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{contact.form.success}</h2>
              <p className="text-gray-600 mb-8">We will get back to you as soon as possible.</p>
              <Button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
                }}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white h-12 px-8 rounded-xl font-semibold"
              >
                Send another message
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="https://images.pexels.com/photos/533938/pexels-photo-533938.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Contact Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-gray-900/80" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/20 to-sky-500/20 backdrop-blur-sm border border-white/10 text-orange-400 px-6 py-2.5 rounded-full mb-6">
              <MessageCircle className="h-4 w-4" />
              <span className="text-sm font-medium">{contact.title}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {nav.contact}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-sky-400 mt-2">
                Let's Connect
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {contact.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="border-none shadow-xl rounded-3xl overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-orange-500 to-orange-600" />
                <CardHeader className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
                  <CardTitle className="text-xl">{contact.info?.title || 'Contact Information'}</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-orange-50 transition-colors duration-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-orange-500/20">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{contact.info?.phone || 'Phone'}</p>
                      <a href={`tel:${PHONE_NUMBER}`} className="text-lg font-semibold text-gray-900 hover:text-orange-600 transition-colors duration-300">
                        {PHONE_NUMBER}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-orange-50 transition-colors duration-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-sky-600 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-sky-500/20">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{contact.info?.email || 'Email'}</p>
                      <a href={`mailto:${EMAIL}`} className="text-lg font-semibold text-gray-900 hover:text-orange-600 transition-colors duration-300 break-all">
                        {EMAIL}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-orange-50 transition-colors duration-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-orange-500/20">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{contact.info?.address || 'Address'}</p>
                      <p className="text-lg font-semibold text-gray-900">{ADDRESS}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-orange-50 transition-colors duration-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-sky-600 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-sky-500/20">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{contact.info?.hours || 'Hours'}</p>
                      <p className="text-lg font-semibold text-gray-900">{contact.info?.hours_value || 'Mon-Sat: 9AM-6PM'}</p>
                    </div>
                  </div>

                  <Button asChild className="w-full h-12 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl shadow-lg" size="lg">
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-2 h-5 w-5" />
                      {contact.info?.whatsapp || 'WhatsApp'}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-none shadow-xl rounded-3xl overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-sky-500 to-sky-600" />
                <CardHeader className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
                  <CardTitle className="text-xl">Send us a Message</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-700 font-medium">{contact.form.name} *</Label>
                        <Input
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="John Doe"
                          className="h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500 rounded-xl"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-700 font-medium">{contact.form.email} *</Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="john@example.com"
                          className="h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500 rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-gray-700 font-medium">{contact.form.phone}</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="+212 600 000 000"
                          className="h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500 rounded-xl"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject" className="text-gray-700 font-medium">{contact.form.subject}</Label>
                        <Input
                          id="subject"
                          value={formData.subject}
                          onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                          placeholder="Project inquiry"
                          className="h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500 rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-gray-700 font-medium">{contact.form.message} *</Label>
                      <Textarea
                        id="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        placeholder="How can we help you?"
                        className="border-gray-200 focus:border-orange-500 focus:ring-orange-500 resize-none rounded-xl"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.02]"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          {contact.form.submit}
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-12">
            <Card className="border-none shadow-xl rounded-3xl overflow-hidden">
              <div className="aspect-[21/9] w-full bg-gray-100">
                <iframe
                  src="https://www.google.com/maps/place/%D8%A5%D8%B7%D8%A8%D8%B9%D9%84%D9%8A%E2%80%AD/@35.7355995,-5.8793998,17z/data=!4m6!3m5!1s0xd0b87ea42b67555:0x64f3c81d009be1de!8m2!3d35.7355768!4d-5.8795031!16s%2Fg%2F11l6sj6ywc?hl=en&entry=ttu&g_ep=EgoyMDI2MDYwMS4wIKXMDSoASAFQAw%3D%3D?hl=en"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '400px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                />
              </div>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
