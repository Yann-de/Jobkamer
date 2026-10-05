import { create } from 'zustand';

import { Job } from '@/types';
import { MOCK_JOBS } from '@/features/jobs/jobsMocks';

interface JobsState {
  jobs: Job[];
  isLoading: boolean;
  error: string | null;
  setJobs: (jobs: Job[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useJobsStore = create<JobsState>((set) => ({
  jobs: MOCK_JOBS,
  isLoading: false,
  error: null,
  setJobs: (jobs) => set({ jobs }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));
