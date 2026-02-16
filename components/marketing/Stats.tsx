'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { TrendingUp, Car, MapPin, Award } from 'lucide-react';
import Container from '@/components/shared/Container';
import type { LucideIcon } from 'lucide-react';

interface StatItem {
  icon: LucideIcon;
  value: number;
  suffix: string;
  label: string;
  description: string;
}

const stats: StatItem[] = [
  {
    icon: TrendingUp,
    value: 2000,
    suffix: '+',
    label: 'Trip Terlayani',
    description: 'Perjalanan sukses sejak 2024',
  },
  {
    icon: Car,
    value: 100,
    suffix: '+',
    label: 'Unit Armada',
    description: 'Termasuk jaringan mitra',
  },
  {
    icon: MapPin,
    value: 10,
    suffix: '+',
    label: 'Kota Jangkauan',
    description: 'Tersedia di seluruh Indonesia',
  },
  {
    icon: Award,
    value: 98,
    suffix: '%',
    label: 'Tingkat Kepuasan',
    description: 'Berdasarkan feedback pelanggan',
  },
];

function useCountUp(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);
  const ref = useRef<HTMLDivElement>(null);

  const animate = useCallback(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    let startTime: number | null = null;
    const step = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      // ease-out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      setCount(Math.floor(eased * end));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [end, duration]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [animate]);

  return { count, ref };
}

function StatCard({ stat }: { stat: StatItem }) {
  const { count, ref } = useCountUp(stat.value);

  return (
    <div ref={ref} className="text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/20 text-gold">
        <stat.icon className="h-6 w-6" />
      </div>
      <p className="bg-gradient-to-r from-gold to-yellow-400 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl">
        {count.toLocaleString('id-ID')}
        {stat.suffix}
      </p>
      <p className="mt-2 text-lg font-semibold text-white">{stat.label}</p>
      <p className="mt-1 text-sm text-slate-400">{stat.description}</p>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="bg-gradient-to-br from-slate-900 via-navy-900 to-slate-900 py-20 sm:py-28">
      <Container>
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-4 lg:gap-12">
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </div>
      </Container>
    </section>
  );
}
