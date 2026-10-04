export interface Participant {
  id: string;
  name: string;
  headline?: string;
  avatarUrl?: string;
  accountType: 'candidate' | 'recruiter';
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  createdAt: string;
  readAt?: string;
}

export interface Conversation {
  id: string;
  participant: Participant;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
  messages: Message[];
}
