import { Post } from '@/types';

export interface FeedAuthor {
  id: string;
  name: string;
  headline: string;
  location?: string;
  isCompany?: boolean;
}

export interface JobOfferDetails {
  title: string;
  company: string;
  contractType: string;
  location: string;
  salary?: string;
}

export interface FeedPost {
  id: string;
  author: FeedAuthor;
  type: 'classic' | 'job' | 'article';
  timestamp: string;
  content: string;
  jobDetails?: JobOfferDetails;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
}

export interface FeedFilterParams {
  category?: string;
  authorId?: string;
  page?: number;
  limit?: number;
}

export interface CreatePostInput {
  content: string;
  mediaUrls?: string[];
}

export type { Post };
