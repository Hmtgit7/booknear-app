export enum UserRole {
  PATIENT = 'patient',
  DOCTOR = 'doctor',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin',
}

export enum KycStatus {
  PENDING = 'pending',
  UNDER_REVIEW = 'under_review',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export enum AppointmentStatus {
  SCHEDULED = 'scheduled',
  CONFIRMED = 'confirmed',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  NO_SHOW = 'no_show',
}

export enum AppointmentType {
  ONLINE = 'online',
  OFFLINE = 'offline',
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

export enum PaymentMode {
  ONLINE = 'online',
  AT_CLINIC = 'at_clinic',
}

export enum SubscriptionPlan {
  FREE = 'free',
  BASIC = 'basic',
  FEATURED = 'featured',
}

export enum FeedPostType {
  CASE_STUDY = 'case_study',
  MEDICAL_NEWS = 'medical_news',
  HEALTH_TIP = 'health_tip',
  QUESTION = 'question',
  ANNOUNCEMENT = 'announcement',
}

export enum NotificationType {
  APPOINTMENT_BOOKED = 'appointment_booked',
  APPOINTMENT_CANCELLED = 'appointment_cancelled',
  APPOINTMENT_REMINDER = 'appointment_reminder',
  KYC_APPROVED = 'kyc_approved',
  KYC_REJECTED = 'kyc_rejected',
  NEW_REVIEW = 'new_review',
  PRESCRIPTION_READY = 'prescription_ready',
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
  PREFER_NOT_TO_SAY = 'prefer_not_to_say',
}

export enum ReportType {
  LAB_REPORT = 'lab_report',
  IMAGING = 'imaging',
  PRESCRIPTION = 'prescription',
  DISCHARGE_SUMMARY = 'discharge_summary',
  OTHER = 'other',
}
