import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';
import Container from './Container';
import Logo from './Logo';
import { siteConfig } from '@/config/site';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">
      <Container>
        <div className="grid gap-10 py-16 md:grid-cols-3">
          {/* Info Perusahaan */}
          <div>
            <div className="mb-4">
              <Logo className="h-8 text-white" />
              <p className="mt-2 text-sm text-slate-400">PT. Solusi Rental Indonesia</p>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Platform rental kendaraan on-demand se-Indonesia. Menyediakan layanan rental
              untuk kebutuhan personal dan corporate.
            </p>
          </div>

          {/* Navigasi */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Navigasi</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#services" className="transition-colors hover:text-gold">
                  Layanan
                </a>
              </li>
              <li>
                <a href="#fleet" className="transition-colors hover:text-gold">
                  Armada
                </a>
              </li>
              <li>
                <a href="#about" className="transition-colors hover:text-gold">
                  Tentang Kami
                </a>
              </li>
              <li>
                <a href="#testimonials" className="transition-colors hover:text-gold">
                  Testimonial
                </a>
              </li>
              <li>
                <a href="#coverage" className="transition-colors hover:text-gold">
                  Jangkauan
                </a>
              </li>
              <li>
                <a href="#faq" className="transition-colors hover:text-gold">
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-gold"
                >
                  Kontak
                </a>
              </li>
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Hubungi Kami</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold" />
                <span>{siteConfig.contacts.address}</span>
              </li>
              <li>
                <a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-colors hover:text-gold"
                >
                  <MessageCircle className="h-4 w-4 text-gold" />
                  {siteConfig.contacts.whatsappDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.contacts.phone}`}
                  className="flex items-center gap-2 transition-colors hover:text-gold"
                >
                  <Phone className="h-4 w-4 text-gold" />
                  {siteConfig.contacts.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contacts.email}`}
                  className="flex items-center gap-2 transition-colors hover:text-gold"
                >
                  <Mail className="h-4 w-4 text-gold" />
                  <span className="break-all">{siteConfig.contacts.email}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 py-6 text-center text-sm text-slate-500">
          &copy; {currentYear} Sewain &mdash; PT. Solusi Rental Indonesia. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
