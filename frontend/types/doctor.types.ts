import type { KycStatus, SubscriptionPlan } from './enums';
import type { GeoLocation } from './geo.types';

export interface TimeSlot {
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

export interface DaySchedule {
  day: string;
  isAvailable: boolean;
  slots: TimeSlot[];
}

export interface IDoctorProfile {
  id: string;
  userId: string;
  registrationNumber: string;
  qualifications: string[];
  specializations: string[];
  experience: number;
  languages: string[];
  bio?: string;
  clinicName?: string;
  clinicAddress?: string;
  city: string;
  state: string;
  pincode: string;
  location?: GeoLocation;
  consultationFee: number;
  schedule: DaySchedule[];
  slotDuration: number;
  kycStatus: KycStatus;
  isListed: boolean;
  subscriptionPlan: SubscriptionPlan;
  totalAppointments: number;
  totalReviews: number;
  averageRating: number;
  createdAt: string;
  updatedAt: string;
  name?: string;
  avatar?: string;
}

export interface IDoctorSearchResult extends IDoctorProfile {
  distanceKm?: number;
}
