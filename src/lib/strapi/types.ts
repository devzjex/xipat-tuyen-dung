export type StrapiPagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

export type StrapiCollectionResponse<T> = {
  data?: T[];
  meta?: {
    pagination?: StrapiPagination;
  };
};

export type StrapiMedia = {
  id: number;
  url: string;
  alternativeText: string | null;
  formats?: {
    thumbnail?: StrapiMediaFormat;
    small?: StrapiMediaFormat;
    medium?: StrapiMediaFormat;
    large?: StrapiMediaFormat;
  };
};

export type StrapiMediaFormat = {
  url: string;
  width: number;
  height: number;
};

export type StrapiJob = {
  id: number;
  documentId: string;
  title: string;
  salary: string;
  time: string;
  location: string;
  experience: string;
  description: string;
  slug: string;
  locale: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type StrapiPartner = {
  id: number;
  documentId: string;
  name_app: string;
  slug: string;
  description: string;
  locale: string;
  app_icon: StrapiMedia | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type StrapiLibraryImageEntry = {
  id: number;
  documentId: string;
  library_image: StrapiMedia[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type StrapiBlog = {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  content: string;
  published_date: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  thumbnail: StrapiMedia | null;
};

export type GetXipatJobsResult = {
  jobs: StrapiJob[];
  pagination: StrapiPagination;
};

export type GetXipatBlogsResult = {
  blogs: StrapiBlog[];
  pagination: StrapiPagination;
};

export type RecruitmentJobCard = {
  slug: string;
  title: string;
  salary: string;
  description: string;
  employment: string;
  location: string;
  experience: string;
};
