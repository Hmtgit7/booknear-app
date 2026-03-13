export interface IReview {
  id: string;
  doctorProfileId: string;
  patientId: string;
  rating: number;
  comment?: string;
  isVerified: boolean;
  isHidden: boolean;
  createdAt: string;
  updatedAt: string;
  patientName?: string;
  patientAvatar?: string;
}
