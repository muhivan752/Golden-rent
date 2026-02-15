import type { FleetItem, ServiceItem, WhyUsItem } from './types';

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
  {
    id: 'innova-reborn',
    name: 'Toyota Innova Reborn',
    category: 'MPV',
    price: 'Mulai dari Rp 600rb/hari',
    features: ['7 Penumpang', 'Bensin', 'Automatic'],
    emoji: '🚐',
  },
  {
    id: 'fortuner',
    name: 'Toyota Fortuner',
    category: 'SUV',
    price: 'Mulai dari Rp 900rb/hari',
    features: ['7 Penumpang', 'Diesel', 'Automatic'],
    emoji: '🚙',
  },
  {
    id: 'camry',
    name: 'Toyota Camry',
    category: 'Sedan',
    price: 'Mulai dari Rp 800rb/hari',
    features: ['5 Penumpang', 'Bensin', 'Automatic'],
    emoji: '🚗',
  },
  {
    id: 'alphard',
    name: 'Toyota Alphard',
    category: 'Luxury MPV',
    price: 'Hubungi Kami',
    features: ['7 Penumpang', 'Bensin', 'Premium'],
    emoji: '🚐',
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
