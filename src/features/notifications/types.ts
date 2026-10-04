export type NotificationType =
  | 'application_received'
  | 'application_updated'
  | 'new_message'
  | 'job_match'
  | 'system';

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  createdAt: string;
  readAt?: string;
  targetRoute?: string;
}
