import { collection, addDoc, getDocs, query, where, orderBy } from 'firebase/firestore';

import { db } from '@/lib/firebase';
import { JobApplicationInput } from '@/features/jobs/types';

export interface Application {
  id: string;
  jobId: string;
  candidateId: string;
  fullName: string;
  email: string;
  phone: string;
  coverLetter?: string;
  status:
    | 'received'
    | 'reviewing'
    | 'shortlisted'
    | 'interview'
    | 'accepted'
    | 'rejected'
    | 'withdrawn';
  createdAt: string;
}

export const applicationsService = {
  apply: async (
    input: JobApplicationInput & { candidateId: string }
  ): Promise<string> => {
    const application = {
      ...input,
      status: 'received',
      createdAt: new Date().toISOString(),
    };
    const ref = await addDoc(collection(db, 'applications'), application);
    return ref.id;
  },

  getCandidateApplications: async (candidateId: string): Promise<Application[]> => {
    const q = query(
      collection(db, 'applications'),
      where('candidateId', '==', candidateId),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((docSnapshot) => ({ id: docSnapshot.id, ...docSnapshot.data() } as Application));
  },

  getJobApplications: async (jobId: string): Promise<Application[]> => {
    const q = query(
      collection(db, 'applications'),
      where('jobId', '==', jobId),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((docSnapshot) => ({ id: docSnapshot.id, ...docSnapshot.data() } as Application));
  },
};
