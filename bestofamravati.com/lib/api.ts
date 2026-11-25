export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:2212';

export interface ApiCategory {
  id: string;
  name: string;
  slug: string;
  sector: string;
  icon: string;
  description?: string | null;
  featured: boolean;
  status: string;
  sortOrder: number;
  parentId?: string | null;
  subcategories?: ApiCategory[];
  businessCount?: number;
  metadata?: {
    searchKeywords?: string[];
    [key: string]: unknown;
  } | null;
}

export interface ApiReview {
  id: string;
  name: string;
  rating: number;
  timeAgo: string;
  comment: string;
  status: string;
  createdAt: string;
}

export interface ApiBusiness {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  category: string;
  categorySlug: string;
  categoryName: string;
  categoryRel?: {
    name: string;
    slug: string;
    sector: string;
    icon: string;
  } | null;
  sector: string;
  subCategory?: string | null;
  owner?: string | null;
  phone: string;
  whatsapp?: string | null;
  email?: string | null;
  website?: string | null;
  address: string;
  locality: string;
  pincode: string;
  city: string;
  state: string;
  establishedYear?: number | null;
  employeeCount?: string | null;
  pricingTier?: string | null;
  rating: number;
  reviewCount: number;
  status: string;
  featured: boolean;
  verified: boolean;
  services?: string[] | null;
  tags?: string[] | null;
  logoUrl?: string | null;
  coverImage?: string | null;
  tagline?: string | null;
  about?: string | null;
  timings?: string | null;
  directionsUrl?: string | null;
  socialLinks?: {
    instagram?: string;
    linkedin?: string;
    facebook?: string;
    youtube?: string;
    twitter?: string;
  } | null;
  products?: string[] | null;
  photos?: string[] | null;
  videos?: string[] | null;
  reviews?: ApiReview[];
  createdAt: string;
}

import { getCategoryBusinessImage } from './imagesData';

export function getBusinessImage(biz: ApiBusiness, index: number = 0): string {
  if (biz.coverImage && biz.coverImage.trim()) {
    return biz.coverImage.trim();
  }
  return getCategoryBusinessImage(biz.categorySlug, biz.slug, index);
}

export async function fetchCategories(): Promise<ApiCategory[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/categories`, {
      cache: 'no-store',
    });
    if (!res.ok) return [];
    const json = await res.json();
    if (json?.success && Array.isArray(json.data)) {
      return json.data.filter((c: ApiCategory) => c.status === 'active');
    }
    return [];
  } catch {
    return [];
  }
}

export async function fetchBusinesses(params?: {
  category?: string;
  sector?: string;
  status?: string;
  featured?: boolean;
}): Promise<ApiBusiness[]> {
  try {
    const query = new URLSearchParams();
    if (params?.category && params.category !== 'all') {
      query.set('category', params.category);
    }
    if (params?.sector) query.set('sector', params.sector);
    if (params?.status) query.set('status', params.status);
    if (params?.featured !== undefined) {
      query.set('featured', String(params.featured));
    }

    const qs = query.toString();
    const url = `${API_BASE_URL}/api/v1/businesses${qs ? `?${qs}` : ''}`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return [];
    const json = await res.json();
    if (json?.success && Array.isArray(json.data)) {
      return json.data;
    }
    return [];
  } catch {
    return [];
  }
}

export async function fetchBusinessBySlug(
  idOrSlug: string
): Promise<ApiBusiness | null> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/api/v1/businesses/${encodeURIComponent(idOrSlug)}`,
      { cache: 'no-store' }
    );
    if (!res.ok) return null;
    const json = await res.json();
    if (json?.success && json.data) {
      return json.data;
    }
    return null;
  } catch {
    return null;
  }
}
