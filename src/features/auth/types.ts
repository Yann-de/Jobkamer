import { User } from '@/types';

export type AccountType = 'candidate' | 'recruiter';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  city?: string;
  accountType: AccountType;
}

export interface AuthSession {
  user: User;
  token: string;
  expiresAt: string;
}

export interface ForgotPasswordInput {
  email: string;
}
