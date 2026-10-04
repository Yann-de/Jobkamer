import { User } from '@/types';

export interface ConnectionRequest {
  id: string;
  sender: User;
  receiverId: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: string;
}

export interface NetworkSummary {
  connectionsCount: number;
  pendingInvitationsCount: number;
}
