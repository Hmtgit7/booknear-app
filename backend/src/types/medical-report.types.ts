import type { ReportType } from './enums';

export interface IMedicalReport {
  id: string;
  patientId: string;
  appointmentId?: string;
  type: ReportType;
  title: string;
  fileUrl: string;
  fileKey: string;
  fileSize?: number;
  mimeType?: string;
  uploadedAt: string;
  updatedAt: string;
}
