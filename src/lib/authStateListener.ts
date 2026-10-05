import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

import { auth, db } from '@/lib/firebase';
import { useAuthStore } from '@/stores/useAuthStore';

export function initAuthListener() {
  return onAuthStateChanged(auth, async (firebaseUser) => {
    const { setSession, clearSession, setLoading } = useAuthStore.getState();

    if (firebaseUser) {
      setLoading(true);

      try {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));

        if (userDoc.exists()) {
          const userData = userDoc.data();
          const token = await firebaseUser.getIdToken();
          setSession(userData as any, token);
        } else {
          clearSession();
        }
      } catch (error) {
        console.error('Firebase auth listener error:', error);
        clearSession();
      } finally {
        setLoading(false);
      }
    } else {
      clearSession();
    }
  });
}
