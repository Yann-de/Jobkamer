import { create } from 'zustand';
import { FeedPost } from '@/features/feed/types';

interface FeedState {
  posts: FeedPost[];
  addPost: (post: FeedPost) => void;
}

export const useFeedStore = create<FeedState>((set) => ({
  posts: [],
  addPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
}));
