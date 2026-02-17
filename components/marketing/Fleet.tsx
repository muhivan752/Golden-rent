'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { MessageCircle, Fuel, Zap, Droplets, Leaf, Users, Calendar, Settings2, KeyRound, UserCheck, Route } from 'lucide-react';
import Container from '@/components/shared/Container';
import BookingModal from '@/components/marketing/BookingModal';
import { fleet } from '@/lib/constants';
import type { FleetItem, FuelType } from '@/lib/types';

const fuelIcons: Record<FuelType, typeof Fuel> = {
  Bensin: Fuel,
  Diesel: Droplets,
  Hybrid: Leaf,
  Elektrik: Zap,
};

const fuelColors: Record<FuelType, string> = {
  Bensin: 'bg-blue-100 text-blue-700',
  Diesel: 'bg-amber-100 text-amber-700',
  Hybrid: 'bg-green-100 text-green-700',
  Elektrik: 'bg-purple-100 text-purple-700',
};

const placeholderGradients: Record<FuelType, string> = {
  Bensin: 'from-slate-700 to-slate-900',
  Diesel: 'from-stone-700 to-stone-900',
  Hybrid: 'from-emerald-800 to-emerald-950',
  Elektrik: 'from-violet-800 to-violet-950',
};

interface FleetProps {
  data?: FleetItem[];
}

export default function Fleet({ data }: FleetProps) {
  // Only fallback to hardcoded data if Supabase is not configured (data is undefined)
  // If data is empty array, it means all cars were deleted from admin — show nothing
  const fleetData = data !== undefined ? data : fleet;
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [activeFuel, setActiveFuel] = useState<FuelType | 'Semua'>('Semua');
  const [selectedVehicle, setSelectedVehicle] = useState<FleetItem | null>(null);

  // Build dynamic category filters from actual data
  const categoryFilters = useMemo(() => {
    const categories = Array.from(new Set(fleetData.map((v) => v.category)));
    return ['Semua', ...categories];
  }, [fleetData]);

  // Build dynamic fuel filters from actual data
  const fuelFilterOptions = useMemo(() => {
    const fuels = Array.from(new Set(fleetData.map((v) => v.fuel)));
    return ['Semua' as const, ...fuels];
  }, [fleetData]);

  const filtered = fleetData.filter((v) => {
    const matchCategory = activeCategory === 'Semua' || v.category === activeCategory;
    const matchFuel = activeFuel === 'Semua' || v.fuel === activeFuel;
    return matchCategory && matchFuel;
  });

  return (
    <section id="fleet" className="bg-slate-50 py-20 sm:py-28">
      <Container>
        <div className="mb-10 text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl">
            Armada Kami
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Pilihan kendaraan berkualitas untuk berbagai kebutuhan perjalanan Anda
          </p>

          {/* Layanan info */}
          <div className="mx-auto mt-6 flex flex-wrap justify-center gap-3 text-sm">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-slate-600 ring-1 ring-slate-200">
              <KeyRound className="h-3.5 w-3.5 text-gold" />
              Lepas Kunci
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-slate-600 ring-1 ring-slate-200">
              <UserCheck className="h-3.5 w-3.5 text-gold" />
              Dengan Driver
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-slate-600 ring-1 ring-slate-200">
              <Route className="h-3.5 w-3.5 text-gold" />
              Luar Kota &amp; Dinas
            </span>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-4 flex flex-wrap justify-center gap-2">
          {categoryFilters.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-gold text-white shadow-md shadow-gold/25'
                  : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Fuel Filter */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {fuelFilterOptions.map((fuel) => (
            <button
              key={fuel}
              onClick={() => setActiveFuel(fuel)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200 ${
                activeFuel === fuel
                  ? 'bg-slate-800 text-white'
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              {fuel}
            </button>
          ))}
        </div>

        {/* Fleet Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((vehicle) => {
            const FuelIcon = fuelIcons[vehicle.fuel];
            return (
              <div
                key={vehicle.id}
                className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                {/* Image / Placeholder */}
                <div className={`relative flex h-48 items-center justify-center bg-gradient-to-br ${placeholderGradients[vehicle.fuel]}`}>
                  {vehicle.image ? (
                    <Image
                      src={vehicle.image}
                      alt={vehicle.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-white/60">
                      <Settings2 className="h-10 w-10" />
                      <span className="text-xs font-medium tracking-wide uppercase">Foto Segera</span>
                    </div>
                  )}
                  {/* Fuel Badge */}
                  <span className={`absolute top-3 right-3 flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${fuelColors[vehicle.fuel]}`}>
                    <FuelIcon className="h-3 w-3" />
                    {vehicle.fuel}
                  </span>
                </div>

                <div className="p-5">
                  {/* Category */}
                  <span className="inline-block rounded-full bg-gold/10 px-3 py-0.5 text-xs font-medium text-gold-700">
                    {vehicle.category}
                  </span>

                  <h3 className="mt-2 text-lg font-semibold text-slate-900">
                    {vehicle.name}
                  </h3>

                  <p className="mt-1 text-lg font-bold text-gold">
                    {vehicle.price}
                  </p>

                  {/* Specs */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                      <Users className="h-3 w-3" />
                      {vehicle.seats} Kursi
                    </span>
                    <span className="flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                      <Calendar className="h-3 w-3" />
                      {vehicle.year}
                    </span>
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                      {vehicle.transmission}
                    </span>
                  </div>

                  {/* Booking Button */}
                  <button
                    onClick={() => setSelectedVehicle(vehicle)}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-2.5 text-sm font-semibold text-navy-900 shadow-lg shadow-gold/25 transition-all duration-200 hover:bg-gold-300"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Booking Sekarang
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sewa info */}
        <p className="mt-8 text-center text-sm text-slate-500">
          Tersedia sewa <strong>Harian</strong>, <strong>Mingguan</strong>, <strong>Bulanan</strong>, dan <strong>Tahunan</strong> &mdash; pilih durasi saat booking
        </p>
      </Container>

      {/* Booking Modal */}
      {selectedVehicle && (
        <BookingModal
          vehicle={selectedVehicle}
          onClose={() => setSelectedVehicle(null)}
        />
      )}
    </section>
  );
}
