import type { StrapiBlog } from '@/lib/strapi/strapi';

export type NewsHeading = {
  id: string;
  title: string;
};

export function stripHtml(html: string) {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&#39;/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

export function getBlogExcerpt(blog: StrapiBlog, maxLength = 180) {
  const plainText = stripHtml(blog.content);

  if (plainText.length <= maxLength) {
    return plainText;
  }

  return `${plainText.slice(0, maxLength).trimEnd()}...`;
}

export function getReadingTimeMinutes(html: string) {
  const plainText = stripHtml(html);
  const wordCount = plainText.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / 220));
}

function slugifyHeading(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

export function extractH2Headings(html: string): { content: string; headings: NewsHeading[] } {
  const headings: NewsHeading[] = [];
  const usedIds = new Map<string, number>();

  const content = html.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/gi, (_match, attrs: string, inner: string) => {
    const title = stripHtml(inner);

    if (!title) {
      return `<h2${attrs}>${inner}</h2>`;
    }

    const baseId = slugifyHeading(title) || `section-${headings.length + 1}`;
    const duplicateCount = usedIds.get(baseId) ?? 0;
    usedIds.set(baseId, duplicateCount + 1);
    const id = duplicateCount === 0 ? baseId : `${baseId}-${duplicateCount + 1}`;

    headings.push({ id, title });
    return `<h2 id="${id}"${attrs}>${inner}</h2>`;
  });

  return { content, headings };
}
