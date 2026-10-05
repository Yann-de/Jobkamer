import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

import { auth, db } from '@/lib/firebase';
import { AuthSession, LoginCredentials, RegisterInput } from '@/features/auth/types';
import { User } from '@/types';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthSession> => {
    const result = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
    const userDoc = await getDoc(doc(db, 'users', result.user.uid));
    const userData = userDoc.data() as User;

    return {
      user: userData,
      token: await result.user.getIdToken(),
      expiresAt: new Date(Date.now() + 3600000).toISOString(),
    };
  },

  register: async (input: RegisterInput): Promise<AuthSession> => {
    const result = await createUserWithEmailAndPassword(auth, input.email, input.password);

    await updateProfile(result.user, {
      displayName: `${input.firstName} ${input.lastName}`,
    });

    const user: User = {
      id: result.user.uid,
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      accountType: input.accountType,
      phone: input.phone,
      city: input.city,
      createdAt: new Date().toISOString(),
    };

    await setDoc(doc(db, 'users', result.user.uid), user);

    return {
      user,
      token: await result.user.getIdToken(),
      expiresAt: new Date(Date.now() + 3600000).toISOString(),
    };
  },

  logout: async (): Promise<void> => {
    await signOut(auth);
  },

  resetPassword: async (email: string): Promise<void> => {
    await sendPasswordResetEmail(auth, email);
  },
};
