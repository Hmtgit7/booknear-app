import type { KycStatus } from './enums';

export interface IKycSubmission {
  id: string;
  doctorProfileId: string;
  status: KycStatus;
  reviewedBy?: string;
  reviewedAt?: string;
  rejectionReason?: string;
  adminNotes?: string;
  submittedAt: string;
  updatedAt: string;
}
