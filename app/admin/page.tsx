'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  LayoutDashboard, Settings, FileText, Image, MessageSquare, BarChart3,
  LogOut, Plus, Trash2, Edit2, Eye
} from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

type Tab = 'overview' | 'services' | 'portfolio' | 'testimonials' | 'requests' | 'messages';

interface Service {
  id: string;
  name_fr: string;
  is_active: boolean;
}

interface PortfolioProject {
  id: string;
  title_fr: string;
  category: string;
}

interface Testimonial {
  id: string;
  client_name: string;
  rating: number;
}

interface QuoteRequest {
  id: string;
  name: string;
  email: string;
  status: string;
  created_at: string;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  status: string;
  created_at: string;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({ services: 0, portfolio: 0, testimonials: 0, quotes: 0, messages: 0 });

  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        router.push('/admin/login');
        return;
      }
      setIsAuthorized(true);
      fetchStats();
    };

    checkAuth();
  }, [router]);

  const fetchStats = async () => {
    try {
      const [
        { count: servicesCount },
        { count: portfolioCount },
        { count: testimonialsCount },
        { count: quotesCount },
        { count: messagesCount },
      ] = await Promise.all([
        supabase.from('services').select('id', { count: 'exact' }).eq('is_active', true),
        supabase.from('portfolio_projects').select('id', { count: 'exact' }),
        supabase.from('testimonials').select('id', { count: 'exact' }).eq('is_active', true),
        supabase.from('quote_requests').select('id', { count: 'exact' }),
        supabase.from('contact_messages').select('id', { count: 'exact' }),
      ]);

      setStats({
        services: servicesCount || 0,
        portfolio: portfolioCount || 0,
        testimonials: testimonialsCount || 0,
        quotes: quotesCount || 0,
        messages: messagesCount || 0,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.push('/');
  };

  if (!isAuthorized) return null;

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
                IT
              </div>
              <span className="font-bold text-orange-500">ITBAALI</span>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Tableau de Bord</h1>
            <p className="text-gray-600">Gérez votre contenu et vos données</p>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="gap-2 border-red-200 text-red-600 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" />
            Déconnexion
          </Button>
        </div>

        {/* Stats Grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            {[
              { label: 'Services', value: stats.services, icon: Settings, color: 'teal' },
              { label: 'Portfolio', value: stats.portfolio, icon: Image, color: 'blue' },
              { label: 'Avis', value: stats.testimonials, icon: MessageSquare, color: 'orange' },
              { label: 'Devis', value: stats.quotes, icon: FileText, color: 'purple' },
              { label: 'Messages', value: stats.messages, icon: BarChart3, color: 'green' },
            ].map((stat) => (
              <Card key={stat.label} className="border-0 shadow-lg rounded-xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">{stat.label}</p>
                      <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                      <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Tabs */}
        <Card className="border-0 shadow-lg rounded-xl">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as Tab)} className="w-full">
            <TabsList className="w-full justify-start border-b bg-transparent p-0 rounded-none">
              <TabsTrigger value="overview" className="gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:bg-transparent">
                <LayoutDashboard className="h-4 w-4" />
                Aperçu
              </TabsTrigger>
              <TabsTrigger value="services" className="gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:bg-transparent">
                <Settings className="h-4 w-4" />
                Services
              </TabsTrigger>
              <TabsTrigger value="portfolio" className="gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:bg-transparent">
                <Image className="h-4 w-4" />
                Portfolio
              </TabsTrigger>
              <TabsTrigger value="testimonials" className="gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-teal-600 data-[state=active]:bg-transparent">
                <MessageSquare className="h-4 w-4" />
                Avis
              </TabsTrigger>
              <TabsTrigger value="requests" className="gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-teal-600 data-[state=active]:bg-transparent">
                <FileText className="h-4 w-4" />
                Devis
              </TabsTrigger>
              <TabsTrigger value="messages" className="gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-teal-600 data-[state=active]:bg-transparent">
                <MessageSquare className="h-4 w-4" />
                Messages
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="p-6">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Vue d'ensemble</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-lg">Gestion du contenu</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button variant="outline" className="w-full justify-start" asChild>
                        <Link href="/admin/services">
                          <Settings className="mr-2 h-4 w-4" />
                          Gérer les services
                        </Link>
                      </Button>
                      <Button variant="outline" className="w-full justify-start" asChild>
                        <Link href="/admin/portfolio">
                          <Image className="mr-2 h-4 w-4" />
                          Gérer le portfolio
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-lg">Demandes clients</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button variant="outline" className="w-full justify-start" asChild>
                        <Link href="#requests">
                          <FileText className="mr-2 h-4 w-4" />
                          Voir les devis ({stats.quotes})
                        </Link>
                      </Button>
                      <Button variant="outline" className="w-full justify-start" asChild>
                        <Link href="#messages">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Voir les messages ({stats.messages})
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="services" className="p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Services</h2>
                  <Button asChild className="gap-2 bg-orange-500 hover:bg-orange-600">
                    <Link href="/admin/services/new">
                      <Plus className="h-4 w-4" />
                      Ajouter un service
                    </Link>
                  </Button>
                </div>
                <p className="text-gray-600">Total: {stats.services} services actifs</p>
                <Button asChild variant="outline">
                  <Link href="/admin/services">Voir la liste complète</Link>
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="portfolio" className="p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Portfolio</h2>
                  <Button asChild className="gap-2 bg-orange-500 hover:bg-orange-600">
                    <Link href="/admin/portfolio/new">
                      <Plus className="h-4 w-4" />
                      Ajouter un projet
                    </Link>
                  </Button>
                </div>
                <p className="text-gray-600">Total: {stats.portfolio} projets</p>
                <Button asChild variant="outline">
                  <Link href="/admin/portfolio">Voir la liste complète</Link>
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="testimonials" className="p-6">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Avis Clients</h2>
                <p className="text-gray-600">Total: {stats.testimonials} avis actifs</p>
                <Button asChild variant="outline">
                  <Link href="/admin/testimonials">Gérer les avis</Link>
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="requests" className="p-6">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Demandes de Devis</h2>
                <p className="text-gray-600">Total: {stats.quotes} demandes</p>
                <Button asChild variant="outline">
                  <Link href="/admin/quote-requests">Voir les devis</Link>
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="messages" className="p-6">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Messages de Contact</h2>
                <p className="text-gray-600">Total: {stats.messages} messages</p>
                <Button asChild variant="outline">
                  <Link href="/admin/messages">Voir les messages</Link>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
