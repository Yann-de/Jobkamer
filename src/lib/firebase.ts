import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDPh6V0H6jNSGLAHBLAewvNSTnE9x9OHuk',
  authDomain: 'jobkamer-dev.firebaseapp.com',
  projectId: 'jobkamer-dev',
  storageBucket: 'jobkamer-dev.firebasestorage.app',
  messagingSenderId: '331786771892',
  appId: '1:331786771892:web:a6b7b4fa04a7bbd055a6e1',
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
