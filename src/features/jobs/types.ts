import { Job } from '@/types';

export interface JobFilterParams {
  query?: string;
  city?: string;
  contractType?: Job['contractType'];
  workplaceType?: Job['workplaceType'];
  page?: number;
  limit?: number;
}

export interface JobApplicationInput {
  jobId: string;
  fullName: string;
  email: string;
  phone: string;
  resumeUrl?: string;
  coverLetter?: string;
}

export type { Job };
