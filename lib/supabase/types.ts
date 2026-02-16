export interface DbFleetItem {
  id: string;
  name: string;
  category: string;
  fuel: 'Bensin' | 'Diesel' | 'Hybrid' | 'Elektrik';
  price: string;
  year: string;
  seats: number;
  transmission: string;
  image_url: string | null;
  is_available: boolean;
  sort_order: number;
  created_at: string;
}

export interface DbTestimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  rating: number;
  text: string;
  location: string;
  is_visible: boolean;
  sort_order: number;
  created_at: string;
}

export interface DbFAQ {
  id: string;
  question: string;
  answer: string;
  is_visible: boolean;
  sort_order: number;
  created_at: string;
}
