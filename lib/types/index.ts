export interface Service {
  id: string;
  name_fr: string;
  name_ar: string;
  name_en: string;
  description_fr: string | null;
  description_ar: string | null;
  description_en: string | null;
  icon: string | null;
  sort_order: number;
  is_active: boolean;
}

export interface PortfolioProject {
  id: string;
  title_fr: string;
  title_ar: string | null;
  title_en: string | null;
  category: string;
  image_url: string;
  is_featured: boolean;
}

export interface Testimonial {
  id: string;
  client_name: string;
  client_company: string | null;
  content_fr: string;
  content_ar: string | null;
  content_en: string | null;
  rating: number;
  is_active: boolean;
}
