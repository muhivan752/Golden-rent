import type { DbFleetItem, DbTestimonial, DbFAQ } from './types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Check if Supabase is configured
 */
function isConfigured(): boolean {
  return !!(
    supabaseUrl &&
    supabaseKey &&
    !supabaseUrl.includes('YOUR_PROJECT')
  );
}

/**
 * Generic fetch from Supabase REST API (no client needed for server reads)
 */
async function fetchTable<T>(
  table: string,
  query: string = 'select=*&order=sort_order.asc',
): Promise<T[] | null> {
  if (!isConfigured()) return null;

  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/${table}?${query}`, {
      headers: {
        apikey: supabaseKey!,
        Authorization: `Bearer ${supabaseKey}`,
      },
      next: { revalidate: 60 }, // ISR: revalidate every 60 seconds
    });

    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function getFleet(): Promise<DbFleetItem[] | null> {
  return fetchTable<DbFleetItem>('fleet', 'select=*&is_available=eq.true&order=sort_order.asc');
}

export async function getTestimonials(): Promise<DbTestimonial[] | null> {
  return fetchTable<DbTestimonial>(
    'testimonials',
    'select=*&is_visible=eq.true&order=sort_order.asc',
  );
}

export async function getFAQs(): Promise<DbFAQ[] | null> {
  return fetchTable<DbFAQ>('faqs', 'select=*&is_visible=eq.true&order=sort_order.asc');
}
