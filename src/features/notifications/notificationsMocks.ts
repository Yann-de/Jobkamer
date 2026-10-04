import { AppNotification } from './types';

const now = Date.now();

const minutesAgo = (minutes: number) =>
  new Date(now - minutes * 60 * 1000).toISOString();

const hoursAgo = (hours: number) =>
  new Date(now - hours * 60 * 60 * 1000).toISOString();

const daysAgo = (days: number) =>
  new Date(now - days * 24 * 60 * 60 * 1000).toISOString();

export const MOCK_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    type: 'application_received',
    title: 'Nouvelle candidature',
    body: 'Paul M. a postulé pour Développeur Full-Stack Junior',
    createdAt: minutesAgo(15),
    targetRoute: '/(tabs)/jobs/job-1',
  },
  {
    id: 'notif-2',
    type: 'new_message',
    title: 'Nouveau message',
    body: 'Sophie M. vous a envoyé un message',
    createdAt: minutesAgo(45),
    targetRoute: '/(tabs)/messages/conv-1',
  },
  {
    id: 'notif-3',
    type: 'application_updated',
    title: 'Candidature présélectionnée',
    body: 'Tech Cameroon a présélectionné votre profil',
    createdAt: hoursAgo(3),
    readAt: hoursAgo(2),
    targetRoute: '/(tabs)/jobs/job-1',
  },
  {
    id: 'notif-4',
    type: 'job_match',
    title: 'Offre pour vous',
    body: 'Data Analyst chez Digital Solutions correspond à votre profil',
    createdAt: hoursAgo(8),
    readAt: hoursAgo(6),
    targetRoute: '/(tabs)/jobs/job-2',
  },
  {
    id: 'notif-5',
    type: 'system',
    title: 'Bienvenue sur JobKamer',
    body: 'Complétez votre profil pour augmenter votre visibilité',
    createdAt: daysAgo(1),
    readAt: daysAgo(1),
  },
];
