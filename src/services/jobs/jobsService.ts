import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  orderBy,
  doc,
  updateDoc,
  getDoc,
} from 'firebase/firestore';

import { db } from '@/lib/firebase';
import { Job } from '@/types';

export const jobsService = {
  getOpenJobs: async (): Promise<Job[]> => {
    const q = query(
      collection(db, 'jobs'),
      where('isOpen', '==', true),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((docSnapshot) => ({ id: docSnapshot.id, ...docSnapshot.data() } as Job));
  },

  getRecruiterJobs: async (recruiterId: string): Promise<Job[]> => {
    const q = query(
      collection(db, 'jobs'),
      where('recruiterId', '==', recruiterId),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((docSnapshot) => ({ id: docSnapshot.id, ...docSnapshot.data() } as Job));
  },

  createJob: async (job: Omit<Job, 'id'>): Promise<string> => {
    const ref = await addDoc(collection(db, 'jobs'), job);
    return ref.id;
  },

  getJobById: async (id: string): Promise<Job | null> => {
    const docRef = doc(db, 'jobs', id);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) return null;
    return { id: snapshot.id, ...snapshot.data() } as Job;
  },

  closeJob: async (id: string): Promise<void> => {
    await updateDoc(doc(db, 'jobs', id), { isOpen: false });
  },
};
