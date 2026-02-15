export type FuelType = 'Bensin' | 'Diesel' | 'Hybrid' | 'Elektrik';

export interface FleetItem {
  id: string;
  name: string;
  category: string;
  fuel: FuelType;
  price: string;
  year: string;
  seats: number;
  transmission: string;
  image?: string; // path ke /public/images/fleet/[id].webp
}

export interface ServiceItem {
  icon: string;
  title: string;
  description: string;
}

export interface WhyUsItem {
  icon: string;
  title: string;
  description: string;
}
