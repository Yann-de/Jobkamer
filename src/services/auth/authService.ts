import { AuthSession, LoginCredentials, RegisterInput } from '@/features/auth/types';

// Mock — sera remplacé par Firebase Auth
export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthSession> => {
    await new Promise((r) => setTimeout(r, 800)); // simuler latence
    return {
      user: {
        id: 'mock-001',
        firstName: 'Yann',
        lastName: 'D.',
        email: credentials.email,
        accountType: 'candidate',
      },
      token: 'mock-token-xyz',
      expiresAt: new Date(Date.now() + 86400000).toISOString(),
    };
  },
  register: async (input: RegisterInput): Promise<AuthSession> => {
    await new Promise((r) => setTimeout(r, 1000));
    return {
      user: {
        id: 'mock-002',
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        accountType: input.accountType,
      },
      token: 'mock-token-xyz',
      expiresAt: new Date(Date.now() + 86400000).toISOString(),
    };
  },
  logout: async (): Promise<void> => {
    await new Promise((r) => setTimeout(r, 300));
  },
  resetPassword: async (_email: string): Promise<void> => {
    await new Promise((r) => setTimeout(r, 600));
  },
};
