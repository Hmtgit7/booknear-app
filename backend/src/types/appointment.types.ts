import type { AppointmentStatus, AppointmentType, PaymentMode, PaymentStatus } from './enums';

export interface IAppointment {
  id: string;
  patientId: string;
  doctorProfileId: string;
  offlinePatientName?: string;
  offlinePatientMobile?: string;
  appointmentDate: string;
  slotTime: string;
  type: AppointmentType;
  status: AppointmentStatus;
  paymentMode: PaymentMode;
  paymentStatus: PaymentStatus;
  paymentId?: string;
  amount: number;
  symptoms?: string;
  notes?: string;
  followUpDate?: string;
  tokenNumber?: number;
  createdAt: string;
  updatedAt: string;
  doctorName?: string;
  doctorSpecialization?: string;
  patientName?: string;
}
