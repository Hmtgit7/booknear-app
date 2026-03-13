import type { INotification } from './notification.types';

export interface SlotUpdateEvent {
  doctorId: string;
  date: string;
  slot: string;
  isBooked: boolean;
}

export interface NotificationEvent {
  userId: string;
  notification: INotification;
}
