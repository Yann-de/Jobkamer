import { Post } from '@/types';

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
