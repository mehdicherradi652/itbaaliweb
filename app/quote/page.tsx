'use client';

import { useState } from 'react';
import { useLanguage } from '@/providers/language-provider';
import { supabase } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Send, CheckCircle, Loader2, Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

const PHONE_NUMBER = '+212631082817';
const EMAIL = 'itbaalione@gmail.com';
const ADDRESS = 'Boukhalef, Tangier, Morocco';

export default function QuotePage() {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service_type: '',
    project_description: '',
    budget: '',
    deadline: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('quote_requests').insert([{
        ...formData,
        status: 'pending',
      }]);
      if (error) throw error;
      setIsSubmitted(true);
      toast.success('Demande de devis envoyée avec succès!');
    } catch (err) {
      toast.error('Erreur lors de l\'envoi du devis');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!t) return null;

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <Card className="max-w-lg mx-auto text-center border-0 shadow-xl rounded-2xl">
            <div className="h-2 bg-gradient-to-r from-teal-600 to-orange-500" />
            <CardContent className="pt-12 pb-10">
              <div className="w-24 h-24 mx-auto bg-teal-100 rounded-full flex items-center justify-center mb-8">
                <CheckCircle className="h-12 w-12 text-teal-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Merci!</h2>
              <p className="text-gray-600 mb-4">Votre demande de devis a été envoyée avec succès.</p>
              <p className="text-gray-600 mb-8">Nous vous contacterons dans les 24 heures.</p>
              <Button
                onClick={() => window.location.href = '/'}
                className="bg-teal-600 hover:bg-teal-700 text-white"
              >
                Retour à l'accueil
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="min-h-screen pt-32 pb-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Demander un Devis</h1>
              <p className="text-xl text-gray-600">Remplissez le formulaire ci-dessous et recevez un devis personnalisé</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Form */}
              <div className="lg:col-span-2">
                <Card className="border-0 shadow-lg rounded-2xl">
                  <CardContent className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label className="font-medium text-gray-700">Nom Complet *</Label>
                          <Input
                            required
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Votre nom"
                            className="h-11 rounded-lg"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="font-medium text-gray-700">Email *</Label>
                          <Input
                            required
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            placeholder="votre@email.com"
                            className="h-11 rounded-lg"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label className="font-medium text-gray-700">Téléphone</Label>
                          <Input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                            placeholder="+212 600 000 000"
                            className="h-11 rounded-lg"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="font-medium text-gray-700">Type de Service</Label>
                          <Input
                            value={formData.service_type}
                            onChange={(e) => setFormData(prev => ({ ...prev, service_type: e.target.value }))}
                            placeholder="Ex: Logo, Flyer, etc."
                            className="h-11 rounded-lg"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="font-medium text-gray-700">Description du Projet *</Label>
                        <Textarea
                          required
                          rows={5}
                          value={formData.project_description}
                          onChange={(e) => setFormData(prev => ({ ...prev, project_description: e.target.value }))}
                          placeholder="Décrivez votre projet en détail..."
                          className="rounded-lg resize-none"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label className="font-medium text-gray-700">Budget Estimé</Label>
                          <Input
                            value={formData.budget}
                            onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                            placeholder="Ex: 1000 - 5000 MAD"
                            className="h-11 rounded-lg"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="font-medium text-gray-700">Date Limite</Label>
                          <Input
                            type="date"
                            value={formData.deadline}
                            onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
                            className="h-11 rounded-lg"
                          />
                        </div>
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-12 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg font-semibold hover:from-teal-700 hover:to-teal-800"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Envoi en cours...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-5 w-5" />
                            Demander un Devis
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Info */}
              <div className="space-y-6">
                <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
                  <div className="h-2 bg-gradient-to-r from-teal-600 to-orange-500" />
                  <CardHeader>
                    <CardTitle className="text-lg">Besoin d'aide?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <Phone className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-600">Appelez-nous</p>
                          <a href={`tel:${PHONE_NUMBER}`} className="font-bold text-gray-900 hover:text-teal-600">
                            {PHONE_NUMBER}
                          </a>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Mail className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-600">Email</p>
                          <a href={`mailto:${EMAIL}`} className="font-bold text-gray-900 hover:text-teal-600">
                            {EMAIL}
                          </a>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <MapPin className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-600">Adresse</p>
                          <p className="font-bold text-gray-900">{ADDRESS}</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t">
                      <p className="text-sm text-gray-600 mb-4">Temps de réponse garanti: 24h</p>
                      <Button asChild className="w-full gap-2 bg-green-600 hover:bg-green-700">
                        <a href={`https://wa.me/${PHONE_NUMBER.replace('+', '')}`} target="_blank" rel="noopener noreferrer">
                          <MessageCircle className="h-4 w-4" />
                          WhatsApp
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
