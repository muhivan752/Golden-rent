import { MessageCircle, ChevronDown } from 'lucide-react';
import Container from '@/components/shared/Container';
import Button from '@/components/shared/Button';
import { siteConfig } from '@/config/site';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy to-navy-800 text-white">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Gradient Orbs */}
      <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gold/5 blur-3xl" />

      <Container className="relative z-10 pb-24 pt-20 sm:pb-32 sm:pt-28 lg:pb-40 lg:pt-36">
        <div className="mx-auto max-w-3xl text-center">
          {/* Logo Badge */}
          <div className="mb-8 inline-flex items-center justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-gold to-yellow-500 shadow-xl shadow-gold/20">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-10 w-10 text-navy-900"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18 10l-2.7-3.6A1 1 0 0 0 14.5 6H6.7a1 1 0 0 0-.8.4L3.2 10 1.5 10.1C.7 10.3 0 11.1 0 12v4c0 .6.4 1 1 1h2" />
                <circle cx="7" cy="17" r="2" />
                <circle cx="17" cy="17" r="2" />
              </svg>
            </div>
          </div>

          {/* Heading */}
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-gold via-yellow-400 to-gold bg-clip-text text-transparent">
              Golden Rent
            </span>
          </h1>

          <h2 className="mb-6 text-xl font-medium text-slate-300 sm:text-2xl">
            Partner Mobilitas Terpercaya Se-Indonesia
          </h2>

          <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
            Dari daily rental hingga corporate fleet management, kami siap mendukung
            setiap perjalanan Anda dengan armada modern dan layanan profesional.
          </p>

          {/* CTAs */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              href={siteConfig.whatsappUrl}
              variant="primary"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="h-5 w-5" />
              Chat WhatsApp
            </Button>
            <Button href="#fleet" variant="secondary" size="lg">
              <ChevronDown className="h-5 w-5" />
              Lihat Armada
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-gold" />
              <span>20+ Kota</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-gold" />
              <span>PT Terdaftar</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-gold" />
              <span>Layanan 24/7</span>
            </div>
          </div>
        </div>
      </Container>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 40L48 36C96 32 192 24 288 28C384 32 480 48 576 52C672 56 768 48 864 40C960 32 1056 24 1152 28C1248 32 1344 48 1392 56L1440 64V80H1392C1344 80 1248 80 1152 80C1056 80 960 80 864 80C768 80 672 80 576 80C480 80 384 80 288 80C192 80 96 80 48 80H0V40Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
