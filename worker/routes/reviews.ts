import { Hono } from 'hono';
import type { Env } from '../types/env.js';

const CACHE_TTL_SECONDS = 3600;

interface MappedReview {
  id: string;
  name: string;
  initials: string;
  rating: number;
  text: string;
  date: string;
  photoUrl?: string;
}

interface ReviewsResponse {
  reviews: MappedReview[];
  aggregateRating: number;
  totalReviews: number;
}

const DUTCH_MONTHS = ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'];

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function formatDate(unixSeconds: number): string {
  const d = new Date(unixSeconds * 1000);
  return `${DUTCH_MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

async function fetchFromGoogle(env: Env): Promise<ReviewsResponse> {
  const params = new URLSearchParams({
    place_id: env.GOOGLE_PLACE_ID,
    fields: 'rating,user_ratings_total,reviews',
    key: env.GOOGLE_PLACES_API_KEY,
    language: 'nl',
    reviews_sort: 'newest',
  });
  const res = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?${params}`);
  const data = await res.json() as { status: string; error_message?: string; result: { rating?: number; user_ratings_total?: number; reviews?: Array<{ author_name: string; rating: number; text: string; time: number; profile_photo_url?: string }> } };

  if (data.status !== 'OK') {
    throw new Error(`Google Places API fout: ${data.status} — ${data.error_message ?? ''}`);
  }

  const result = data.result;
  const reviews: MappedReview[] = (result.reviews ?? []).map((r, i) => ({
    id: `g${i + 1}`,
    name: r.author_name,
    initials: getInitials(r.author_name),
    rating: r.rating,
    text: r.text,
    date: formatDate(r.time),
    photoUrl: r.profile_photo_url,
  }));

  return {
    reviews,
    aggregateRating: result.rating ?? 0,
    totalReviews: result.user_ratings_total ?? 0,
  };
}

export const reviewsRoutes = new Hono<{ Bindings: Env }>();

reviewsRoutes.get('/', async (c) => {
  const cacheKey = new Request('https://cache.internal/reviews');
  const cache = caches.default;

  const cached = await cache.match(cacheKey);
  if (cached) {
    const data = await cached.json() as ReviewsResponse;
    return c.json(data);
  }

  const data = await fetchFromGoogle(c.env);
  await cache.put(
    cacheKey,
    new Response(JSON.stringify(data), {
      headers: { 'Cache-Control': `max-age=${CACHE_TTL_SECONDS}` },
    })
  );
  return c.json(data);
});
