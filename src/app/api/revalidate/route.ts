import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

type StrapiWebhookPayload = {
  event?: string;
  createdAt?: string;
  model?: string;
  entry?: {
    id?: number;
    slug?: string;
    [key: string]: unknown;
  };
};

type ManualRevalidateRequest = {
  type?: 'all';
  slug?: string;
};

type RevalidateRequestBody = StrapiWebhookPayload | ManualRevalidateRequest;

export async function POST(request: NextRequest) {
  try {
    const token =
      request.headers.get('x-revalidate-token') ??
      request.headers.get('authorization')?.replace(/^Bearer\s+/i, '') ??
      request.nextUrl.searchParams.get('secret');
    const secretToken = process.env.REVALIDATE_SECRET_TOKEN;

    if (!secretToken) {
      return NextResponse.json({ message: 'Server configuration error: revalidation token not set' }, { status: 500 });
    }

    if (!token || token !== secretToken) {
      return NextResponse.json({ message: 'Unauthorized: Invalid or missing token' }, { status: 401 });
    }

    let body: RevalidateRequestBody = {};
    try {
      body = (await request.json()) as RevalidateRequestBody;
    } catch {
      body = {};
    }
    const model = 'model' in body ? body.model : null;
    const slug = ('entry' in body && body.entry?.slug) || ('slug' in body && body.slug) || undefined;
    const normalizedModel = model?.toLowerCase() ?? '';

    const tagsToRevalidate = new Set<string>();
    if (normalizedModel.includes('xipat-job') || normalizedModel.includes('jobs')) {
      tagsToRevalidate.add('strapi:xipat-jobs');
    }
    if (normalizedModel.includes('xipat-partner') || normalizedModel.includes('partners')) {
      tagsToRevalidate.add('strapi:xipat-partners');
    }
    if (normalizedModel.includes('xipat-library-image') || normalizedModel.includes('library-images')) {
      tagsToRevalidate.add('strapi:xipat-library-images');
    }
    if (normalizedModel.includes('xipat-blog') || normalizedModel.includes('blogs')) {
      tagsToRevalidate.add('strapi:xipat-blogs');
    }

    if ('type' in body && body.type === 'all') {
      tagsToRevalidate.add('strapi:xipat-jobs');
      tagsToRevalidate.add('strapi:xipat-partners');
      tagsToRevalidate.add('strapi:xipat-library-images');
      tagsToRevalidate.add('strapi:xipat-blogs');
    }

    for (const tag of tagsToRevalidate) {
      revalidateTag(tag, 'max');
    }

    const pathsToRevalidate = new Set<string>([
      '/',
      '/news',
      '/careers',
      '/about',
      '/culture',
      '/ecosystem',
      '/en',
      '/en/news',
      '/en/careers',
      '/en/about',
      '/en/culture',
      '/en/ecosystem',
    ]);

    if (slug) {
      pathsToRevalidate.add(`/careers/${slug}`);
      pathsToRevalidate.add(`/en/careers/${slug}`);
      pathsToRevalidate.add(`/news/${slug}`);
      pathsToRevalidate.add(`/en/news/${slug}`);
    }

    for (const path of pathsToRevalidate) {
      revalidatePath(path, 'page');
    }

    return NextResponse.json(
      {
        message: 'Revalidation successful',
        collection: model || 'manual',
        slug: slug || null,
        tagsRevalidated: Array.from(tagsToRevalidate),
        pathsRevalidated: Array.from(pathsToRevalidate),
        timestamp: new Date().toISOString(),
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Revalidation failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}
