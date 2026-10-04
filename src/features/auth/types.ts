import { User } from '@/types';

export interface LoginCredentials {
  email: string;
  password?: string;
  phone?: string;
}

export interface RegisterInput {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  city?: string;
  headline?: string;
}

export interface AuthSession {
  user: User;
  token: string;
  expiresAt: string;
}
