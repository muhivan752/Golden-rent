import Hero from '@/components/marketing/Hero';
import Services from '@/components/marketing/Services';
import HowItWorks from '@/components/marketing/HowItWorks';
import Fleet from '@/components/marketing/Fleet';
import WhyUs from '@/components/marketing/WhyUs';
import Stats from '@/components/marketing/Stats';
import About from '@/components/marketing/About';
import Testimonials from '@/components/marketing/Testimonials';
import Coverage from '@/components/marketing/Coverage';
import ComingSoon from '@/components/marketing/ComingSoon';
import FAQ from '@/components/marketing/FAQ';
import CTA from '@/components/marketing/CTA';
import { siteConfig } from '@/config/site';
import { getFleet, getTestimonials, getFAQs } from '@/lib/supabase/queries';
import type { FleetItem } from '@/lib/types';

export default async function HomePage() {
  // Fetch data from Supabase (returns null if not configured — uses defaults)
  const [dbFleet, dbTestimonials, dbFaqs] = await Promise.all([
    getFleet(),
    getTestimonials(),
    getFAQs(),
  ]);

  // Map Supabase fleet data to FleetItem format
  const fleetData: FleetItem[] | undefined = dbFleet?.map((item) => ({
    id: item.id,
    name: item.name,
    category: item.category,
    fuel: item.fuel,
    price: item.price,
    year: item.year,
    seats: item.seats,
    transmission: item.transmission,
    image: item.image_url ?? undefined,
  }));

  // Map testimonials
  const testimonialData = dbTestimonials?.map((item) => ({
    name: item.name,
    role: item.role,
    company: item.company,
    initials: item.initials,
    rating: item.rating,
    text: item.text,
    location: item.location,
  }));

  // Map FAQs
  const faqData = dbFaqs?.map((item) => ({
    question: item.question,
    answer: item.answer,
  }));

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
            telephone: siteConfig.contacts.admin1.phone,
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
      <HowItWorks />
      <Fleet data={fleetData} />
      <WhyUs />
      <Stats />
      <About />
      <Testimonials data={testimonialData} />
      <Coverage />
      <ComingSoon />
      <FAQ data={faqData} />
      <CTA />
    </>
  );
}
