'use client';

import { useState } from 'react';
import {
  Plane,
  Train,
  Ship,
  Bus,
  Car,
  Check,
  MessageCircle,
  MapPin,
  Phone,
} from 'lucide-react';
import Container from '@/components/shared/Container';
import { transferTypeFilters, transferRoutes as defaultRoutes } from '@/lib/constants';
import { siteConfig } from '@/config/site';
import type { TransferRoute, TransferType } from '@/lib/types';

const typeIcons: Record<TransferType, typeof Plane> = {
  Bandara: Plane,
  Stasiun: Train,
  Pelabuhan: Ship,
  Terminal: Bus,
};

interface TransferProps {
  data?: TransferRoute[];
}

export default function Transfer({ data }: TransferProps) {
  const routes = data ?? defaultRoutes;
  const [activeFilter, setActiveFilter] = useState<TransferType | 'Semua'>('Semua');

  const filteredRoutes =
    activeFilter === 'Semua'
      ? routes
      : routes.filter((r) => r.type === activeFilter);

  const formatPrice = (price: string) => {
    if (!price) return 'Hubungi Kami';
    return `Rp ${Number(price).toLocaleString('id-ID')}`;
  };

  const buildWhatsappUrl = (route: TransferRoute) => {
    const message = `Halo GoRent, saya ingin booking transfer:\n\n📍 ${route.origin} → ${route.destination}\n⏱️ Estimasi: ${route.estimation}\n\nMohon info lebih lanjut. Terima kasih!`;
    return `https://wa.me/${siteConfig.contacts.admin1.whatsapp.replace('+', '')}?text=${encodeURIComponent(message)}`;
  };

  return (
    <section id="transfer" className="bg-slate-50 py-20 sm:py-28">
      <Container>
        {/* Header */}
        <div className="mb-14 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gold/10 px-4 py-1.5">
            <MapPin className="h-4 w-4 text-gold" />
            <span className="text-sm font-medium text-gold-700">
              Transfer & Antar Jemput
            </span>
          </div>
          <h2 className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl">
            Transfer Bandara & Stasiun
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Layanan antar jemput dari dan ke Bandara, Stasiun, Pelabuhan &
            Terminal. Harga transparan, tanpa biaya tersembunyi.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {transferTypeFilters.map((filter) => {
            const isActive = activeFilter === filter.value;
            const Icon = filter.value !== 'Semua' ? typeIcons[filter.value] : null;
            return (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-gold text-navy-900 shadow-md'
                    : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:-translate-y-0.5 hover:shadow-md'
                }`}
              >
                {Icon && <Icon className="h-4 w-4" />}
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* Route Cards */}
        {filteredRoutes.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">
            <MapPin className="mx-auto mb-3 h-10 w-10 text-slate-300" />
            <p className="text-sm text-slate-500">
              Belum ada rute transfer untuk kategori ini.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredRoutes.map((route) => {
              const TypeIcon = typeIcons[route.type];
              return (
                <div
                  key={route.id}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-2 hover:ring-gold/20"
                >
                  {/* Card Header */}
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 text-gold transition-colors group-hover:bg-gold group-hover:text-navy-900">
                        <TypeIcon className="h-5 w-5" />
                      </div>
                      <span className="rounded-full bg-gold/10 px-2.5 py-1 text-xs font-medium text-gold-700">
                        {route.type}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400">
                      {route.estimation}
                    </span>
                  </div>

                  {/* Route Visual */}
                  <div className="mb-5">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col items-center gap-1">
                        <div className="h-3 w-3 rounded-full bg-gold ring-4 ring-gold/20" />
                        <div className="h-8 w-0.5 bg-gradient-to-b from-gold to-slate-200" />
                        <div className="h-3 w-3 rounded-full bg-navy ring-4 ring-navy/20" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-slate-900">
                          {route.origin}
                        </p>
                        <div className="my-2" />
                        <p className="text-sm font-semibold text-slate-900">
                          {route.destination}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Vehicle Options */}
                  <div className="mb-4 rounded-xl bg-slate-50 p-3">
                    <p className="mb-2 text-xs font-medium text-slate-500">
                      Pilihan Kendaraan:
                    </p>
                    <div className="space-y-2">
                      {route.vehicles.map((v) => (
                        <div
                          key={v.vehicle_name}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <Car className="h-3.5 w-3.5 text-slate-400" />
                            <span className="text-xs text-slate-600">
                              {v.vehicle_name}
                            </span>
                            <span className="text-xs text-slate-400">
                              ({v.seats} seat)
                            </span>
                          </div>
                          <span className="text-sm font-bold text-gold">
                            {formatPrice(v.price)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Includes */}
                  <div className="mb-5 flex flex-wrap gap-2">
                    {route.includes.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs text-green-700"
                      >
                        <Check className="h-3 w-3" />
                        {item}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <a
                    href={buildWhatsappUrl(route)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-gold py-3 text-sm font-semibold text-navy-900 shadow-lg shadow-gold/25 transition-all hover:bg-gold-300"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Pesan via WhatsApp
                  </a>
                </div>
              );
            })}
          </div>
        )}

        {/* Custom Route Banner */}
        <div className="mt-10 flex flex-col items-center gap-6 rounded-2xl bg-gradient-to-r from-navy-900 via-navy to-navy-800 p-6 sm:flex-row sm:p-8">
          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gold/20">
            <MapPin className="h-7 w-7 text-gold" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h3 className="mb-1 text-lg font-bold text-white">
              Rute tidak ada di daftar?
            </h3>
            <p className="text-sm text-slate-300">
              Hubungi kami untuk rute custom. Kami melayani transfer ke seluruh
              kota di Indonesia.
            </p>
          </div>
          <a
            href={`tel:${siteConfig.contacts.admin1.phone}`}
            className="flex items-center gap-2 whitespace-nowrap rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy-900 shadow-lg shadow-gold/25 transition-all hover:bg-gold-300"
          >
            <Phone className="h-4 w-4" />
            Hubungi Kami
          </a>
        </div>
      </Container>
    </section>
  );
}
