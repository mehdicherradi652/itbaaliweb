'use client';

import { useLanguage } from '@/providers/language-provider';
import { PortfolioProject } from '@/lib/types';
import { ImageOff, X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { cn } from '@/lib/utils';

// Professional Portfolio Data
const portfolioData = [
  { id: '1', title_en: 'Executive Business Cards', title_fr: 'Cartes de Visite Premium', title_ar: 'بطاقات العمل التنفيذية', category: 'business_cards', image_url: 'https://postimg.cc/3WpJWymK?auto=compress&cs=tinysrgb&w=800', is_featured: true, sort_order: 1 },
  { id: '2', title_en: 'Modern Logo Collection', title_fr: 'Collection de Logos Modernes', title_ar: 'مجموعة شعارات حديثة', category: 'logos', image_url: 'https://images.pexels.com/photos/7087/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800', is_featured: true, sort_order: 2 },
  { id: '3', title_en: 'Restaurant Menu Design', title_fr: 'Menu Restaurant Élégant', title_ar: 'تصميم قائمة مطعم', category: 'menus', image_url: 'https://pin.it/6H5MVxz1I', is_featured: true, sort_order: 3 },
  { id: '4', title_en: 'Large Format Banners', title_fr: 'Bannières Grand Format', title_ar: 'لافتات كبيرة الحجم', category: 'banners', image_url: 'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=800', is_featured: true, sort_order: 4 },
  { id: '5', title_en: 'Marketing Flyers', title_fr: 'Flyers Marketing Créatifs', title_ar: 'منشورات تسويقية', category: 'flyers', image_url: 'https://images.pexels.com/photos/7656738/pexels-photo-7656738.jpeg?auto=compress&cs=tinysrgb&w=800', is_featured: false, sort_order: 5 },
  { id: '6', title_en: 'Brand Identity Package', title_fr: 'Pack Identité Visuelle', title_ar: 'حزمة الهوية المؤسسية', category: 'logos', image_url: 'https://images.pexels.com/photos/3850994/pexels-photo-3850994.jpeg?auto=compress&cs=tinysrgb&w=800', is_featured: true, sort_order: 6 },
  { id: '7', title_en: 'Corporate Brochure', title_fr: 'Brochure Corporate', title_ar: 'كتيب مؤسسي', category: 'flyers', image_url: 'https://images.pexels.com/photos/1178669/pexels-photo-1178669.jpeg?auto=compress&cs=tinysrgb&w=800', is_featured: false, sort_order: 7 },
  { id: '8', title_en: 'Event Invitation Cards', title_fr: 'Cartes d\'Invitation', title_ar: 'بطاقات دعوة', category: 'invitations', image_url: 'https://images.pexels.com/photos/1116905/pexels-photo-1116905.jpeg?auto=compress&cs=tinysrgb&w=800', is_featured: false, sort_order: 8 },
  { id: '9', title_en: 'Vehicle Branding', title_fr: 'Marquage Véhicule', title_ar: 'تغليف المركبات', category: 'banners', image_url: 'https://images.pexels.com/photos/2127733/pexels-photo-2127733.jpeg?auto=compress&cs=tinysrgb&w=800', is_featured: true, sort_order: 9 },
  { id: '10', title_en: 'Premium Business Cards', title_fr: 'Cartes Professionnelles', title_ar: 'بطاقات أعمال فاخرة', category: 'business_cards', image_url: 'https://images.pexels.com/photos/669612/pexels-photo-669612.jpeg?auto=compress&cs=tinysrgb&w=800', is_featured: false, sort_order: 10 },
  { id: '11', title_en: 'Restaurant Branding', title_fr: 'Image de Marque Restaurant', title_ar: 'هوية مطعم', category: 'menus', image_url: 'https://images.pexels.com/photos/6843265/pexels-photo-6843265.jpeg?auto=compress&cs=tinysrgb&w=800', is_featured: false, sort_order: 11 },
  { id: '12', title_en: 'Tech Startup Logo', title_fr: 'Logo Startup Tech', title_ar: 'شعار تقني', category: 'logos', image_url: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=800', is_featured: false, sort_order: 12 },
  { id: '13', title_en: 'Fashion Brand Cards', title_fr: 'Cartes Marque Mode', title_ar: 'بطاقات علامة أزياء', category: 'business_cards', image_url: 'https://images.pexels.com/photos/7679626/pexels-photo-7679626.jpeg?auto=compress&cs=tinysrgb&w=800', is_featured: false, sort_order: 13 },
  { id: '14', title_en: 'Creative Posters', title_fr: 'Affiches Créatives', title_ar: 'ملصقات إبداعية', category: 'flyers', image_url: 'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=800', is_featured: false, sort_order: 14 },
  { id: '15', title_en: 'Wedding Invitations', title_fr: 'Invitations Mariage Luxe', title_ar: 'دعوات زفاف', category: 'invitations', image_url: 'https://images.pexels.com/photos/169190/pexels-photo-169190.jpeg?auto=compress&cs=tinysrgb&w=800', is_featured: false, sort_order: 15 },
];

export default function PortfolioPage() {
  const { t, language } = useLanguage();
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lightboxProject, setLightboxProject] = useState<PortfolioProject | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('masonry');

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await supabase.from('portfolio_projects').select('*').order('sort_order', { ascending: true });
      // Use database data if available, otherwise use local data
      if (data && data.length > 0) {
        setProjects(data);
      } else {
        // Seed portfolio data to database
        await supabase.from('portfolio_projects').insert(portfolioData);
        setProjects(portfolioData as PortfolioProject[]);
      }
      setIsLoading(false);
    };
    fetchProjects();
  }, []);

  const getTitle = (p: PortfolioProject) => language === 'ar' ? p.title_ar : language === 'en' ? p.title_en : p.title_fr;

  const portfolio = t.portfolio;
  const nav = t.nav;

  const categories = [
    { id: 'all', label: portfolio.all, icon: null, count: projects.length },
    { id: 'logos', label: portfolio.logos, icon: null, count: projects.filter(p => p.category === 'logos').length },
    { id: 'business_cards', label: portfolio.business_cards, icon: null, count: projects.filter(p => p.category === 'business_cards').length },
    { id: 'flyers', label: portfolio.flyers, icon: null, count: projects.filter(p => p.category === 'flyers').length },
    { id: 'banners', label: portfolio.banners, icon: null, count: projects.filter(p => p.category === 'banners').length },
    { id: 'menus', label: portfolio.menus, icon: null, count: projects.filter(p => p.category === 'menus').length },
    { id: 'invitations', label: portfolio.invitations, icon: null, count: projects.filter(p => p.category === 'invitations').length },
  ];

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  const navigateLightbox = useCallback((direction: 'prev' | 'next') => {
    if (!lightboxProject) return;
    const currentIndex = filteredProjects.findIndex(p => p.id === lightboxProject.id);
    let newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    if (newIndex < 0) newIndex = filteredProjects.length - 1;
    if (newIndex >= filteredProjects.length) newIndex = 0;
    setLightboxProject(filteredProjects[newIndex]);
  }, [lightboxProject, filteredProjects]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxProject) return;
      if (e.key === 'Escape') setLightboxProject(null);
      if (e.key === 'ArrowLeft') navigateLightbox('prev');
      if (e.key === 'ArrowRight') navigateLightbox('next');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxProject, navigateLightbox]);

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-gray-900/90" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/20 to-sky-500/20 backdrop-blur-sm border border-white/10 text-orange-400 px-6 py-2.5 rounded-full mb-6">
              <span className="text-sm font-medium">{portfolio.title}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {nav.portfolio}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-sky-400 mt-2">Creative Works</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {portfolio.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Filter & View Controls */}
      <section className="sticky top-20 z-30 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    "rounded-full transition-all duration-300",
                    selectedCategory === category.id
                      ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/20"
                      : "border-gray-200 hover:border-orange-300 hover:text-orange-500"
                  )}
                >
                  {category.label}
                  {category.count > 0 && (
                    <span className={cn(
                      "ml-2 px-2 py-0.5 text-xs rounded-full",
                      selectedCategory === category.id ? "bg-white/20" : "bg-gray-100"
                    )}>
                      {category.count}
                    </span>
                  )}
                </Button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode('masonry')}
                className={cn("rounded-md", viewMode === 'masonry' ? "bg-white shadow-sm" : "")}
              >
                Masonry
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode('grid')}
                className={cn("rounded-md", viewMode === 'grid' ? "bg-white shadow-sm" : "")}
              >
                Grid
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Gallery */}
      <section className="py-12 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1,2,3,4,5,6,7,8,9].map(i => (
                <div key={i} className="aspect-4/3 bg-gray-200 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : filteredProjects.length > 0 ? (
            viewMode === 'masonry' ? (
              /* Masonry Layout */
              <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {filteredProjects.map((project, index) => {
                  const isLarger = index % 5 === 0; // Every 5th item is larger
                  return (
                    <button
                      key={project.id}
                      onClick={() => setLightboxProject(project)}
                      className={cn(
                        "group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 break-inside-avoid w-full focus:outline-none focus:ring-4 focus:ring-orange-500/50",
                        isLarger ? "aspect-3/4" : "aspect-4/3"
                      )}
                    >
                      <Image
                        src={project.image_url}
                        alt={getTitle(project) || 'Portfolio project'}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                      {/* Featured Badge */}
                      {project.is_featured && (
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                          Featured
                        </div>
                      )}

                      {/* Info Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <span className="inline-block px-3 py-1 bg-sky-500/80 backdrop-blur-sm text-white text-xs font-medium rounded-full mb-2">
                          {categories.find(c => c.id === project.category)?.label || project.category}
                        </span>
                        <h3 className="text-white text-xl font-bold mb-2">{getTitle(project)}</h3>
                        <div className="flex items-center gap-2 text-white/80 text-sm">
                          <ExternalLink className="w-4 h-4" />
                          <span>View Project</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              /* Grid Layout */
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredProjects.map((project) => (
                  <button
                    key={project.id}
                    onClick={() => setLightboxProject(project)}
                    className="group relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 focus:outline-none focus:ring-4 focus:ring-orange-500/50"
                  >
                    <Image
                      src={project.image_url}
                      alt={getTitle(project) || 'Portfolio project'}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    {project.is_featured && (
                      <div className="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                        Featured
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <h3 className="text-white text-sm font-bold truncate">{getTitle(project)}</h3>
                    </div>
                  </button>
                ))}
              </div>
            )
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
              <ImageOff className="h-20 w-20 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">{t.common.no_results}</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxProject && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8" onClick={() => setLightboxProject(null)}>
          {/* Close Button */}
          <button
            onClick={() => setLightboxProject(null)}
            className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Navigation */}
          <button
            onClick={(e) => { e.stopPropagation(); navigateLightbox('prev'); }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); navigateLightbox('next'); }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
          </button>

          {/* Image Container */}
          <div className="relative max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={lightboxProject.image_url}
                alt={getTitle(lightboxProject) || 'Portfolio project'}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Info Bar */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="inline-block px-3 py-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-medium rounded-full mb-2">
                  {categories.find(c => c.id === lightboxProject.category)?.label || lightboxProject.category}
                </span>
                <h3 className="text-white text-2xl md:text-3xl font-bold">{getTitle(lightboxProject)}</h3>
              </div>
              <div className="text-gray-400 text-sm">
                {filteredProjects.findIndex(p => p.id === lightboxProject.id) + 1} / {filteredProjects.length}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Start Your Project?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Let us bring your vision to life with our professional printing and design services.
          </p>
          <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-gray-100 font-semibold px-10 h-14 rounded-xl shadow-xl transition-all duration-300 hover:scale-105">
            <a href="/quote">Get a Free Quote</a>
          </Button>
        </div>
      </section>
    </>
  );
}
