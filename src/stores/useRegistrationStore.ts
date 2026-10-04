import { create } from 'zustand';
import { RegisterInput } from '@/features/auth/types';

interface RegistrationState {
  data: Partial<RegisterInput>;
  setRegistrationData: (data: Partial<RegisterInput>) => void;
  resetRegistration: () => void;
}

export const useRegistrationStore = create<RegistrationState>((set) => ({
  data: {},
  setRegistrationData: (data) =>
    set((state) => ({ data: { ...state.data, ...data } })),
  resetRegistration: () => set({ data: {} }),
}));
