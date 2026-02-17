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

export type TransferType = 'Bandara' | 'Stasiun' | 'Pelabuhan' | 'Terminal';

export interface TransferVehicle {
  vehicle_name: string;
  seats: number;
  price: string;
}

export interface TransferRoute {
  id: string;
  type: TransferType;
  origin: string;
  origin_code: string;
  destination: string;
  estimation: string;
  vehicles: TransferVehicle[];
  includes: string[];
}
