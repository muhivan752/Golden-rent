import { Star, Quote } from 'lucide-react';
import Container from '@/components/shared/Container';

const testimonials = [
  {
    name: 'Ahmad R.',
    role: 'Corporate Client — Jakarta',
    text: 'Golden Rent jadi partner fleet management kantor kami. Armada selalu siap, driver profesional, dan koordinasinya sangat responsif.',
    rating: 5,
  },
  {
    name: 'Dewi S.',
    role: 'Event Organizer — Medan',
    text: 'Sudah beberapa kali pakai Golden Rent untuk event. Mobilnya terawat, booking gampang lewat WhatsApp, dan harga bersaing.',
    rating: 5,
  },
  {
    name: 'Budi P.',
    role: 'Travel Agent — Bali',
    text: 'Kami rekomendasikan Golden Rent ke klien kami. Layanan konsisten di beberapa kota, jadi tidak perlu cari vendor berbeda di tiap lokasi.',
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-slate-50 py-20 sm:py-28">
      <Container>
        <div className="mb-14 text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl">
            Dipercaya Oleh{' '}
            <span className="bg-gradient-to-r from-gold-600 via-gold to-yellow-500 bg-clip-text text-transparent">
              Klien Kami
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Apa kata mereka yang telah menggunakan layanan Golden Rent
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="group relative rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5"
            >
              {/* Quote icon */}
              <Quote className="mb-4 h-8 w-8 text-gold/20" />

              {/* Stars */}
              <div className="mb-4 flex gap-1">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>

              {/* Text */}
              <p className="mb-6 text-sm leading-relaxed text-slate-600">
                &ldquo;{item.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gold to-yellow-500 text-sm font-bold text-navy-900">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-navy-900">{item.name}</p>
                  <p className="text-xs text-slate-500">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
