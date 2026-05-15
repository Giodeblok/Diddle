import { Router, Request, Response, NextFunction } from 'express';
import axios from 'axios';

const router = Router();

const wrap = (fn: (req: Request, res: Response) => Promise<void>) =>
  (req: Request, res: Response, next: NextFunction) =>
    fn(req, res).catch(next);

interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  time: number;
  relative_time_description: string;
  profile_photo_url?: string;
}

interface ReviewsCache {
  data: ReviewsResponse;
  fetchedAt: number;
}

interface ReviewsResponse {
  reviews: MappedReview[];
  aggregateRating: number;
  totalReviews: number;
}

interface MappedReview {
  id: string;
  name: string;
  initials: string;
  rating: number;
  text: string;
  date: string;
  photoUrl?: string;
}

const CACHE_TTL_MS = 60 * 60 * 1000; // 1 uur
let cache: ReviewsCache | null = null;

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const DUTCH_MONTHS = [
  'jan', 'feb', 'mrt', 'apr', 'mei', 'jun',
  'jul', 'aug', 'sep', 'okt', 'nov', 'dec',
];

function formatDate(unixSeconds: number): string {
  const d = new Date(unixSeconds * 1000);
  return `${DUTCH_MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

async function fetchFromGoogle(): Promise<ReviewsResponse> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    throw new Error('GOOGLE_PLACES_API_KEY of GOOGLE_PLACE_ID is niet ingesteld');
  }

  const { data } = await axios.get(
    'https://maps.googleapis.com/maps/api/place/details/json',
    {
      params: {
        place_id: placeId,
        fields: 'rating,user_ratings_total,reviews',
        key: apiKey,
        language: 'nl',
        reviews_sort: 'newest',
      },
    }
  );

  if (data.status !== 'OK') {
    throw new Error(`Google Places API fout: ${data.status} — ${data.error_message ?? ''}`);
  }

  const result = data.result;
  const googleReviews: GoogleReview[] = result.reviews ?? [];

  const reviews: MappedReview[] = googleReviews.map((r, i) => ({
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

router.get('/', wrap(async (_req, res) => {
  const now = Date.now();

  if (cache && now - cache.fetchedAt < CACHE_TTL_MS) {
    res.json(cache.data);
    return;
  }

  const data = await fetchFromGoogle();
  cache = { data, fetchedAt: now };
  res.json(data);
}));

export default router;
