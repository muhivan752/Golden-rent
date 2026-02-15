import Hero from '@/components/marketing/Hero';
import Services from '@/components/marketing/Services';
import Fleet from '@/components/marketing/Fleet';
import WhyUs from '@/components/marketing/WhyUs';
import Coverage from '@/components/marketing/Coverage';
import ComingSoon from '@/components/marketing/ComingSoon';
import CTA from '@/components/marketing/CTA';
import { siteConfig } from '@/config/site';

export default function HomePage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: siteConfig.name,
            description: siteConfig.description,
            url: siteConfig.url,
            telephone: siteConfig.contacts.whatsapp,
            email: siteConfig.contacts.email,
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Jl. Selamat No. 8B',
              addressLocality: 'Medan',
              addressRegion: 'Sumatera Utara',
              postalCode: '20228',
              addressCountry: 'ID',
            },
            areaServed: {
              '@type': 'Country',
              name: 'Indonesia',
            },
            priceRange: 'Rp 600.000 - Rp 2.000.000',
          }),
        }}
      />

      <Hero />
      <Services />
      <Fleet />
      <WhyUs />
      <Coverage />
      <ComingSoon />
      <CTA />
    </>
  );
}
