export type Locale = 'fr' | 'en';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  headline?: string;
  email: string;
  avatarUrl?: string;
  location?: string;
  city?: string;
  accountType?: 'candidate' | 'recruiter';
  createdAt?: string;
}

export interface Job {
  id: string;
  title: string;
  companyName: string;
  companyLogoUrl?: string;
  location: string;
  city: string;
  contractType: 'CDI' | 'CDD' | 'Stage' | 'Freelance' | 'Alternance';
  workplaceType: 'on-site' | 'hybrid' | 'remote';
  salaryMin?: number;
  salaryMax?: number;
  currency?: string;
  description: string;
  createdAt: string;
  isOpen: boolean;
}

export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  authorHeadline?: string;
  authorAvatarUrl?: string;
  content: string;
  mediaUrls?: string[];
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  createdAt: string;
}
