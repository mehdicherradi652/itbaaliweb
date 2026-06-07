'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/providers/language-provider';
import { LanguageSwitcher } from '@/components/language-switcher';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const PHONE_NUMBER = '+212631082817';

export function SiteHeader() {
  const { t, isRtl } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsLoaded(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!t) return null;

  const nav = t.nav;
  const routes = [
    { href: '/', label: nav.home },
    { href: '/services', label: nav.services },
    { href: '/portfolio', label: nav.portfolio },
    { href: '/quote', label: nav.quote },
    { href: '/about', label: nav.about },
    { href: '/contact', label: nav.contact },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-gray-200 shadow-md'
          : 'bg-white border-transparent'
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className={cn('transition-all duration-300', isLoaded ? 'opacity-100' : 'opacity-0')}>
            <div className="flex items-center gap-2">
              <img src="/itbaali_flyer_p.png" alt="ITBAALI Logo" className="h-12 w-auto" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {routes.map((route, index) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300',
                  pathname === route.href
                    ? 'bg-teal-50 text-teal-600'
                    : 'text-gray-700 hover:text-teal-600 hover:bg-gray-50'
                )}
              >
                {route.label}
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild className="gap-2">
                <a href={`tel:${PHONE_NUMBER}`}>
                  <Phone className="h-4 w-4" />
                  <span className="hidden xl:inline">{PHONE_NUMBER}</span>
                </a>
              </Button>
            </div>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side={isRtl ? 'left' : 'right'} className="w-80">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-8">
                    <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                      <div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold">
                        IT
                      </div>
                      <span className="font-bold text-teal-600">ITBAALI</span>
                    </Link>
                  </div>

                  <nav className="flex flex-col gap-2 mb-8">
                    {routes.map((route) => (
                      <Link
                        key={route.href}
                        href={route.href}
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-3 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all duration-300"
                      >
                        {route.label}
                      </Link>
                    ))}
                  </nav>

                  <div className="mt-auto space-y-3 border-t pt-6">
                    <Button asChild className="w-full gap-2 bg-orange-500 hover:bg-orange-600">
                      <a href={`tel:${PHONE_NUMBER}`}>
                        <Phone className="h-4 w-4" />
                        {PHONE_NUMBER}
                      </a>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
