import type { FleetItem, FuelType, ServiceItem, WhyUsItem } from './types';

export const fuelFilters: { label: string; value: FuelType | 'Semua' }[] = [
  { label: 'Semua', value: 'Semua' },
  { label: 'Bensin', value: 'Bensin' },
  { label: 'Diesel', value: 'Diesel' },
  { label: 'Hybrid', value: 'Hybrid' },
  { label: 'Elektrik', value: 'Elektrik' },
];

export const services: ServiceItem[] = [
  {
    icon: 'Car',
    title: 'Daily Rental',
    description:
      'Rental harian dengan armada terawat, pilihan dengan/tanpa driver sesuai kebutuhan Anda.',
  },
  {
    icon: 'Clock',
    title: 'Weekly/Monthly',
    description:
      'Paket mingguan dan bulanan dengan harga spesial untuk kebutuhan jangka panjang.',
  },
  {
    icon: 'Building2',
    title: 'Corporate Fleet',
    description:
      'Solusi fleet management untuk perusahaan dengan layanan all-inclusive dan fleksibel.',
  },
  {
    icon: 'Users',
    title: 'Event & Airport',
    description:
      'Layanan transportasi untuk event dan airport transfer dengan driver profesional.',
  },
];

export const fleet: FleetItem[] = [
  // ── Bensin ──
  {
    id: 'agya',
    name: 'Toyota Agya',
    category: 'City Car',
    fuel: 'Bensin',
    price: 'Mulai Rp 250rb/hari',
    year: '2023',
    seats: 5,
    transmission: 'Automatic',
  },
  {
    id: 'xenia',
    name: 'Daihatsu Xenia',
    category: 'MPV',
    fuel: 'Bensin',
    price: 'Mulai Rp 350rb/hari',
    year: '2023',
    seats: 7,
    transmission: 'Automatic',
  },
  {
    id: 'avanza',
    name: 'Toyota Avanza',
    category: 'MPV',
    fuel: 'Bensin',
    price: 'Mulai Rp 400rb/hari',
    year: '2023',
    seats: 7,
    transmission: 'Automatic',
  },
  {
    id: 'innova-reborn',
    name: 'Toyota Innova Reborn',
    category: 'MPV',
    fuel: 'Bensin',
    price: 'Mulai Rp 600rb/hari',
    year: '2022',
    seats: 7,
    transmission: 'Automatic',
  },
  {
    id: 'crv',
    name: 'Honda CR-V',
    category: 'SUV',
    fuel: 'Bensin',
    price: 'Mulai Rp 800rb/hari',
    year: '2023',
    seats: 7,
    transmission: 'Automatic',
  },
  {
    id: 'alphard',
    name: 'Toyota Alphard',
    category: 'Luxury MPV',
    fuel: 'Bensin',
    price: 'Hubungi Kami',
    year: '2023',
    seats: 7,
    transmission: 'Automatic',
  },
  // ── Diesel ──
  {
    id: 'fortuner',
    name: 'Toyota Fortuner',
    category: 'SUV',
    fuel: 'Diesel',
    price: 'Mulai Rp 900rb/hari',
    year: '2023',
    seats: 7,
    transmission: 'Automatic',
  },
  {
    id: 'pajero',
    name: 'Mitsubishi Pajero Sport',
    category: 'SUV',
    fuel: 'Diesel',
    price: 'Mulai Rp 900rb/hari',
    year: '2023',
    seats: 7,
    transmission: 'Automatic',
  },
  // ── Hybrid ──
  {
    id: 'innova-zenix',
    name: 'Toyota Innova Zenix',
    category: 'MPV',
    fuel: 'Hybrid',
    price: 'Mulai Rp 750rb/hari',
    year: '2024',
    seats: 7,
    transmission: 'Automatic',
  },
  // ── Elektrik ──
  {
    id: 'wuling-air-ev',
    name: 'Wuling Air EV',
    category: 'City Car',
    fuel: 'Elektrik',
    price: 'Mulai Rp 350rb/hari',
    year: '2024',
    seats: 4,
    transmission: 'Automatic',
  },
  {
    id: 'chery-omoda',
    name: 'Chery Omoda E5',
    category: 'SUV',
    fuel: 'Elektrik',
    price: 'Mulai Rp 600rb/hari',
    year: '2024',
    seats: 5,
    transmission: 'Automatic',
  },
  {
    id: 'byd-atto3',
    name: 'BYD Atto 3',
    category: 'SUV',
    fuel: 'Elektrik',
    price: 'Mulai Rp 650rb/hari',
    year: '2024',
    seats: 5,
    transmission: 'Automatic',
  },
];

export const whyUs: WhyUsItem[] = [
  {
    icon: 'Shield',
    title: 'Armada Terawat',
    description:
      'Semua kendaraan rutin di-service dan dalam kondisi prima.',
  },
  {
    icon: 'Award',
    title: 'Driver Profesional',
    description:
      'Driver berpengalaman, ramah, dan berlisensi resmi.',
  },
  {
    icon: 'Clock',
    title: 'Layanan 24/7',
    description:
      'Siap melayani kebutuhan rental Anda kapan saja.',
  },
  {
    icon: 'Headphones',
    title: 'Customer Support',
    description:
      'Tim support responsif dan siap membantu Anda.',
  },
];

export const cities: string[] = [
  'Jakarta',
  'Medan',
  'Surabaya',
  'Bandung',
  'Bali',
  'Semarang',
  'Makassar',
  'Palembang',
  'Yogyakarta',
  'Batam',
  'Manado',
  'Balikpapan',
  'Pekanbaru',
  'Banjarmasin',
  'Padang',
  'Malang',
  'Solo',
  'Samarinda',
  'Jambi',
  'Pontianak',
];
