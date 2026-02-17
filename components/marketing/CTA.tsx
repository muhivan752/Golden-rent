import { MessageCircle, Phone } from 'lucide-react';
import Container from '@/components/shared/Container';
import Button from '@/components/shared/Button';
import { siteConfig } from '@/config/site';

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-gold-600 via-gold to-yellow-500 py-20 sm:py-28">
      {/* Decorative */}
      <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />

      <Container className="relative z-10 text-center">
        <h2 className="mb-4 text-3xl font-bold text-navy-900 sm:text-4xl">
          Siap Memulai Perjalanan Anda?
        </h2>
        <p className="mx-auto mb-10 max-w-xl text-lg text-navy-700">
          Hubungi kami sekarang untuk mendapatkan penawaran terbaik dan konsultasi gratis
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            href={siteConfig.whatsappUrl}
            variant="dark"
            size="lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="h-5 w-5" />
            Chat WhatsApp
          </Button>
          <Button
            href={`tel:${siteConfig.contacts.admin1.phone}`}
            variant="white"
            size="lg"
          >
            <Phone className="h-5 w-5" />
            Telepon Sekarang
          </Button>
        </div>
      </Container>
    </section>
  );
}
