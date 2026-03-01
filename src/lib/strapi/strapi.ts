import type {
  GetXipatJobsResult,
  RecruitmentJobCard,
  StrapiCollectionResponse,
  StrapiJob,
  StrapiLibraryImageEntry,
  StrapiMedia,
  StrapiPagination,
  StrapiPartner,
} from '@/lib/strapi/types';

const STRAPI_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? '';
const STRAPI_TOKEN = process.env.STRAPI_TOKEN ?? '';

type GetXipatJobsOptions = {
  page?: number;
  pageSize?: number;
  query?: string;
  slug?: string;
};

export type {
  StrapiCollectionResponse,
  StrapiJob,
  StrapiLibraryImageEntry,
  StrapiMedia,
  StrapiPagination,
  StrapiPartner,
  GetXipatJobsResult,
  RecruitmentJobCard,
};

const DEFAULT_PAGE_SIZE = 10;

export function getStrapiMediaUrl(pathOrUrl: string): string {
  if (!pathOrUrl) {
    return '';
  }
  return pathOrUrl.startsWith('http') ? pathOrUrl : `${STRAPI_BASE_URL}${pathOrUrl}`;
}

export async function getXipatJobs(locale: string, options: GetXipatJobsOptions = {}): Promise<GetXipatJobsResult> {
  const localeParam = locale === 'en' ? 'en' : 'vi';
  const page = Number.isFinite(options.page) && (options.page ?? 1) > 0 ? (options.page as number) : 1;
  const pageSize =
    Number.isFinite(options.pageSize) && (options.pageSize ?? DEFAULT_PAGE_SIZE) > 0
      ? (options.pageSize as number)
      : DEFAULT_PAGE_SIZE;
  const query = options.query?.trim() ?? '';
  const slug = options.slug?.trim() ?? '';
  const params = new URLSearchParams({
    populate: '*',
    locale: localeParam,
    'pagination[page]': String(page),
    'pagination[pageSize]': String(pageSize),
  });

  if (query) {
    params.set('filters[title][$containsi]', query);
  }

  if (slug) {
    params.set('filters[slug][$eq]', slug);
  }

  try {
    const response = await fetch(`${STRAPI_BASE_URL}/api/xipat-jobs?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
      next: { revalidate: 60, tags: ['strapi:xipat-jobs'] },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch xipat jobs: ${response.status} ${response.statusText}`);
    }

    const json = (await response.json()) as StrapiCollectionResponse<StrapiJob>;
    return {
      jobs: json.data ?? [],
      pagination: json.meta?.pagination ?? {
        page,
        pageSize,
        pageCount: 1,
        total: json.data?.length ?? 0,
      },
    };
  } catch (error) {
    console.error('Error fetching xipat jobs from Strapi:', error);
    return {
      jobs: [],
      pagination: {
        page,
        pageSize,
        pageCount: 1,
        total: 0,
      },
    };
  }
}

export async function getXipatJobDetail(locale: string, slug: string): Promise<StrapiJob | null> {
  const result = await getXipatJobs(locale, {
    page: 1,
    pageSize: 1,
    slug,
  });

  return result.jobs[0] ?? null;
}

export async function getRecruitmentCards(locale: string, limit = 5): Promise<RecruitmentJobCard[]> {
  const jobsResponse = await getXipatJobs(locale, { page: 1, pageSize: limit });
  return jobsResponse.jobs.map((job) => ({
    slug: job.slug,
    title: job.title,
    salary: job.salary,
    description: job.description,
    employment: job.time,
    location: job.location,
    experience: job.experience,
  }));
}

export async function getXipatPartners(locale: string): Promise<StrapiPartner[]> {
  const localeParam = locale === 'en' ? 'en' : 'vi';
  const params = new URLSearchParams({
    populate: '*',
    locale: localeParam,
  });

  try {
    const response = await fetch(`${STRAPI_BASE_URL}/api/xipat-partners?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
      next: { revalidate: 60, tags: ['strapi:xipat-partners'] },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch xipat partners: ${response.status} ${response.statusText}`);
    }

    const json = (await response.json()) as StrapiCollectionResponse<StrapiPartner>;
    return json.data ?? [];
  } catch (error) {
    console.error('Error fetching xipat partners from Strapi:', error);
    return [];
  }
}

export async function getXipatLibraryImages(): Promise<StrapiMedia[]> {
  const params = new URLSearchParams({
    populate: '*',
  });

  try {
    const response = await fetch(`${STRAPI_BASE_URL}/api/xipat-library-images?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
      next: { revalidate: 60, tags: ['strapi:xipat-library-images'] },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch xipat library images: ${response.status} ${response.statusText}`);
    }

    const json = (await response.json()) as StrapiCollectionResponse<StrapiLibraryImageEntry>;
    const entry = json.data?.[0];
    return entry?.library_image ?? [];
  } catch (error) {
    console.error('Error fetching xipat library images from Strapi:', error);
    return [];
  }
}
