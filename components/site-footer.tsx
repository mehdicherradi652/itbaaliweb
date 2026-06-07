'use client';

import Link from 'next/link';
import { useLanguage } from '@/providers/language-provider';
import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';

const PHONE_NUMBER = '+212631082817';
const EMAIL = 'itbaalione@gmail.com';
const ADDRESS = 'Boukhalef, Tangier, Morocco';

export function SiteFooter() {
  const { t } = useLanguage();

  if (!t) return null;

  const nav = t.nav;

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <img src="/itbaali_flyer_p.png" alt="ITBAALI Logo" className="h-12 w-auto" />
            </Link>
            <p className="text-gray-400 leading-relaxed">
              Solutions complètes en design graphique, impression et communication visuelle.
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com/ITBAALII" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-orange-500 rounded-full flex items-center justify-center transition-colors duration-300">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://instagram.com/ITBAALII" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-blue-500 rounded-full flex items-center justify-center transition-colors duration-300">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Liens Rapides</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-teal-400 transition-colors duration-300">
                  {nav.home}
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-teal-400 transition-colors duration-300">
                  {nav.services}
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-gray-400 hover:text-teal-400 transition-colors duration-300">
                  {nav.portfolio}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-teal-400 transition-colors duration-300">
                  {nav.about}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-teal-400 transition-colors duration-300">
                  {nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Nous Contacter</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-teal-400 mt-1 shrink-0" />
                <a href={`tel:${PHONE_NUMBER}`} className="text-gray-400 hover:text-orange-500 transition-colors duration-300">
                  {PHONE_NUMBER}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-teal-400 mt-1 shrink-0" />
                <a href={`mailto:${EMAIL}`} className="text-gray-400 hover:text-teal-400 transition-colors duration-300">
                  {EMAIL}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-teal-400 mt-1 shrink-0" />
                <span className="text-gray-400">{ADDRESS}</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Horaires</h4>
            <ul className="space-y-3 text-gray-400">
              <li>Lun - Ven</li>
              <li>9:00 - 18:00</li>
              <li className="mt-4">Sam</li>
              <li>10:00 - 16:00</li>
              <li className="mt-4 text-sm">Dimanche: Fermé</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} ITBAALI. Tous droits réservés.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-teal-400 text-sm transition-colors duration-300">
                Politique de Confidentialité
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-400 text-sm transition-colors duration-300">
                Conditions d'Utilisation
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
