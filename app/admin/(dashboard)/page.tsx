'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Car, MessageSquareQuote, HelpCircle, ExternalLink } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface Counts {
  fleet: number;
  testimonials: number;
  faqs: number;
}

export default function AdminDashboardPage() {
  const [counts, setCounts] = useState<Counts>({ fleet: 0, testimonials: 0, faqs: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCounts() {
      const supabase = createClient();

      const [fleet, testimonials, faqs] = await Promise.all([
        supabase.from('fleet').select('id', { count: 'exact', head: true }),
        supabase.from('testimonials').select('id', { count: 'exact', head: true }),
        supabase.from('faqs').select('id', { count: 'exact', head: true }),
      ]);

      setCounts({
        fleet: fleet.count ?? 0,
        testimonials: testimonials.count ?? 0,
        faqs: faqs.count ?? 0,
      });
      setLoading(false);
    }

    fetchCounts();
  }, []);

  const cards = [
    {
      label: 'Armada',
      count: counts.fleet,
      icon: Car,
      href: '/admin/fleet',
      color: 'bg-blue-50 text-blue-600',
    },
    {
      label: 'Testimonial',
      count: counts.testimonials,
      icon: MessageSquareQuote,
      href: '/admin/testimonials',
      color: 'bg-green-50 text-green-600',
    },
    {
      label: 'FAQ',
      count: counts.faqs,
      icon: HelpCircle,
      href: '/admin/faq',
      color: 'bg-purple-50 text-purple-600',
    },
  ];

  return (
    <div>
      {/* Welcome */}
      <div className="mb-8 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 p-6 text-white sm:p-8">
        <h2 className="text-xl font-bold sm:text-2xl">Selamat Datang di Admin Panel</h2>
        <p className="mt-2 text-sm text-slate-300">
          Kelola armada, testimonial, dan FAQ langsung dari sini. Semua perubahan akan tampil di
          website secara real-time.
        </p>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20"
        >
          <ExternalLink className="h-4 w-4" />
          Lihat Website
        </a>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="group rounded-xl border border-slate-200 bg-white p-6 transition-all hover:border-yellow-300 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">{card.label}</p>
                <p className="mt-1 text-3xl font-bold text-slate-900">
                  {loading ? '—' : card.count}
                </p>
              </div>
              <div className={`rounded-xl p-3 ${card.color}`}>
                <card.icon className="h-6 w-6" />
              </div>
            </div>
            <p className="mt-3 text-sm text-slate-400 group-hover:text-yellow-600">
              Kelola {card.label.toLowerCase()} &rarr;
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
