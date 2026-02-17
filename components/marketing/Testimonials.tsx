'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Star, Quote, MapPin } from 'lucide-react';
import Container from '@/components/shared/Container';

export interface TestimonialData {
  name: string;
  role: string;
  company: string;
  initials: string;
  rating: number;
  text: string;
  location: string;
}

const defaultTestimonials: TestimonialData[] = [
  {
    name: 'Budi Santoso',
    role: 'HR Manager',
    company: 'PT. Asuransi Askrida Syariah',
    initials: 'BS',
    rating: 5,
    text: 'Pelayanan sangat profesional, driver ramah dan punctual. Armada yang dikirim selalu bersih dan terawat. Kami sudah menggunakan GoRent untuk transport karyawan dan sangat puas!',
    location: 'Jakarta',
  },
  {
    name: 'Siti Rahma',
    role: 'Event Organizer',
    company: 'Eventku Indonesia',
    initials: 'SR',
    rating: 5,
    text: 'GoRent sangat membantu kesuksesan event kami. Koordinasi mudah, harga kompetitif, dan yang paling penting: reliable! Pernah butuh tambahan mobil mendadak, mereka langsung siapkan dalam 2 jam.',
    location: 'Bandung',
  },
  {
    name: 'Andi Wijaya',
    role: 'Direktur',
    company: 'CV. Mitra Sejahtera',
    initials: 'AW',
    rating: 5,
    text: 'Untuk kebutuhan corporate fleet management, GoRent adalah pilihan terbaik. Sistem invoicing jelas, customer service responsif, dan armada selalu available.',
    location: 'Surabaya',
  },
  {
    name: 'Lisa Permata',
    role: 'Travel Blogger',
    company: 'Personal',
    initials: 'LP',
    rating: 5,
    text: 'Saya sering rental mobil untuk trip ke luar kota. GoRent selalu jadi pilihan utama karena proses booking yang gampang via WhatsApp, driver yang familiar dengan rute wisata, dan harga yang fair.',
    location: 'Yogyakarta',
  },
  {
    name: 'Rudi Hermawan',
    role: 'Project Manager',
    company: 'PT. Konstruksi Prima',
    initials: 'RH',
    rating: 5,
    text: 'Project kami sering butuh mobil untuk survey site di berbagai kota. GoRent coverage-nya luas dan service konsisten di setiap kota. One vendor, multiple cities — sangat memudahkan.',
    location: 'Medan',
  },
];

interface TestimonialsProps {
  data?: TestimonialData[];
}

export default function Testimonials({ data }: TestimonialsProps) {
  const testimonials = data && data.length > 0 ? data : defaultTestimonials;
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    onSelect();
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  // Auto-play
  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section id="testimonials" className="py-20 sm:py-28">
      <Container>
        <div className="mb-14 text-center">
          <span className="mb-4 inline-block rounded-full bg-gold/10 px-4 py-1.5 text-sm font-semibold text-gold-700">
            Testimoni
          </span>
          <h2 className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl">
            Testimoni{' '}
            <span className="bg-gradient-to-r from-gold-600 via-gold to-yellow-500 bg-clip-text text-transparent">
              Pelanggan
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Dengar dari pelanggan yang puas dengan layanan kami
          </p>
        </div>

        {/* Carousel */}
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex">
            {testimonials.map((item) => (
              <div
                key={item.name}
                className="min-w-0 flex-[0_0_100%] px-3 md:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
              >
                <div className="flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5">
                  {/* Quote icon */}
                  <Quote className="mb-4 h-8 w-8 text-gold/20" />

                  {/* Stars */}
                  <div className="mb-4 flex gap-1">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                    ))}
                  </div>

                  {/* Text */}
                  <p className="mb-6 flex-1 text-sm leading-relaxed text-slate-600">
                    &ldquo;{item.text}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gold to-yellow-500 text-sm font-bold text-navy-900">
                      {item.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-navy-900">{item.name}</p>
                      <p className="truncate text-xs text-slate-500">
                        {item.role} — {item.company}
                      </p>
                      <div className="mt-0.5 flex items-center gap-1 text-xs text-slate-400">
                        <MapPin className="h-3 w-3" />
                        {item.location}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              aria-label={`Go to testimonial ${index + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === selectedIndex
                  ? 'w-8 bg-gold'
                  : 'w-2.5 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
