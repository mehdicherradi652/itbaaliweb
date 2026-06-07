'use client';

import { MessageCircle } from 'lucide-react';

const PHONE_NUMBER = '212631082817';

export function WhatsAppButton() {
  const message = 'Bonjour! Je suis intéressé par vos services.';
  const whatsappUrl = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-lg transition-all duration-300 hover:scale-110 animate-fade-in"
    >
      <MessageCircle className="w-7 h-7 text-white" />
    </a>
  );
}
