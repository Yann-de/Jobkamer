import { Conversation } from './types';

const now = Date.now();

const minutesAgo = (minutes: number) =>
  new Date(now - minutes * 60 * 1000).toISOString();

const hoursAgo = (hours: number) =>
  new Date(now - hours * 60 * 60 * 1000).toISOString();

const daysAgo = (days: number) =>
  new Date(now - days * 24 * 60 * 60 * 1000).toISOString();

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    participant: {
      id: 'other-1',
      name: 'Sophie M.',
      headline: 'Recruteuse RH • Tech Cameroon',
      accountType: 'recruiter',
    },
    lastMessage: 'Parfait, je vous envoie le brief du poste demain matin.',
    lastMessageAt: minutesAgo(30),
    unreadCount: 2,
    messages: [
      {
        id: 'msg-1-1',
        conversationId: 'conv-1',
        senderId: 'mock-001',
        content:
          'Bonjour Sophie, je suis très intéressé par le poste de développeur Full-Stack chez Tech Cameroon.',
        createdAt: hoursAgo(5),
        readAt: hoursAgo(4),
      },
      {
        id: 'msg-1-2',
        conversationId: 'conv-1',
        senderId: 'other-1',
        content:
          'Bonjour ! Merci pour votre intérêt. Votre profil correspond bien à ce que nous recherchons.',
        createdAt: hoursAgo(4),
        readAt: hoursAgo(3),
      },
      {
        id: 'msg-1-3',
        conversationId: 'conv-1',
        senderId: 'mock-001',
        content:
          'Super ! Seriez-vous disponible pour un échange cette semaine ?',
        createdAt: hoursAgo(2),
        readAt: hoursAgo(1),
      },
      {
        id: 'msg-1-4',
        conversationId: 'conv-1',
        senderId: 'other-1',
        content: 'Parfait, je vous envoie le brief du poste demain matin.',
        createdAt: minutesAgo(30),
      },
    ],
  },
  {
    id: 'conv-2',
    participant: {
      id: 'other-2',
      name: 'Jean-Paul N.',
      headline: 'Directeur technique • AppCam',
      accountType: 'recruiter',
    },
    lastMessage: 'Merci pour les précisions, on avance bien.',
    lastMessageAt: hoursAgo(2),
    unreadCount: 0,
    messages: [
      {
        id: 'msg-2-1',
        conversationId: 'conv-2',
        senderId: 'other-2',
        content:
          'Bonjour, pouvez-vous confirmer votre disponibilité pour une mission React Native freelance ?',
        createdAt: hoursAgo(6),
        readAt: hoursAgo(5),
      },
      {
        id: 'msg-2-2',
        conversationId: 'conv-2',
        senderId: 'mock-001',
        content:
          'Oui, je suis disponible à partir de la semaine prochaine pour 3 mois.',
        createdAt: hoursAgo(4),
        readAt: hoursAgo(3),
      },
      {
        id: 'msg-2-3',
        conversationId: 'conv-2',
        senderId: 'other-2',
        content: 'Merci pour les précisions, on avance bien.',
        createdAt: hoursAgo(2),
        readAt: hoursAgo(1),
      },
    ],
  },
  {
    id: 'conv-3',
    participant: {
      id: 'other-3',
      name: 'Amina K.',
      headline: 'Développeuse Web • Douala',
      accountType: 'candidate',
    },
    lastMessage: 'Tu as vu la nouvelle offre Data Analyst chez Digital Solutions ?',
    lastMessageAt: daysAgo(1),
    unreadCount: 1,
    messages: [
      {
        id: 'msg-3-1',
        conversationId: 'conv-3',
        senderId: 'mock-001',
        content: 'Salut Amina ! Comment avance ton projet de portfolio ?',
        createdAt: daysAgo(2),
        readAt: daysAgo(1),
      },
      {
        id: 'msg-3-2',
        conversationId: 'conv-3',
        senderId: 'other-3',
        content: 'Tu as vu la nouvelle offre Data Analyst chez Digital Solutions ?',
        createdAt: daysAgo(1),
      },
    ],
  },
];

export function getConversationById(id: string): Conversation | undefined {
  return MOCK_CONVERSATIONS.find((conversation) => conversation.id === id);
}
