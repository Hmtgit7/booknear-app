export interface Medicine {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
}

export interface IPrescription {
  id: string;
  appointmentId: string;
  doctorProfileId: string;
  diagnosis?: string;
  medicines: Medicine[];
  advice?: string;
  followUpDays?: number;
  createdAt: string;
  updatedAt: string;
}
