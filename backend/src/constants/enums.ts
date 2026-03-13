// ─── User Roles ──────────────────────────────────────────────────────────────
export enum UserRole {
  PATIENT = 'patient',
  DOCTOR = 'doctor',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin',
}

// ─── KYC Status ──────────────────────────────────────────────────────────────
export enum KycStatus {
  PENDING = 'pending',
  UNDER_REVIEW = 'under_review',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

// ─── Appointment Status ───────────────────────────────────────────────────────
export enum AppointmentStatus {
  SCHEDULED = 'scheduled',
  CONFIRMED = 'confirmed',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  NO_SHOW = 'no_show',
}

// ─── Appointment Type ─────────────────────────────────────────────────────────
export enum AppointmentType {
  ONLINE = 'online',
  OFFLINE = 'offline',
}

// ─── Payment Status ───────────────────────────────────────────────────────────
export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

// ─── Payment Mode ─────────────────────────────────────────────────────────────
export enum PaymentMode {
  ONLINE = 'online',
  AT_CLINIC = 'at_clinic',
}

// ─── Doctor Subscription Plan ─────────────────────────────────────────────────
export enum SubscriptionPlan {
  FREE = 'free', // 3 slots/day
  BASIC = 'basic', // ₹499/mo unlimited
  FEATURED = 'featured', // ₹999/mo featured listing
}

// ─── Feed Post Type ───────────────────────────────────────────────────────────
export enum FeedPostType {
  CASE_STUDY = 'case_study',
  MEDICAL_NEWS = 'medical_news',
  HEALTH_TIP = 'health_tip',
  QUESTION = 'question',
  ANNOUNCEMENT = 'announcement',
}

// ─── Notification Type ────────────────────────────────────────────────────────
export enum NotificationType {
  APPOINTMENT_BOOKED = 'appointment_booked',
  APPOINTMENT_CANCELLED = 'appointment_cancelled',
  APPOINTMENT_REMINDER = 'appointment_reminder',
  KYC_APPROVED = 'kyc_approved',
  KYC_REJECTED = 'kyc_rejected',
  NEW_REVIEW = 'new_review',
  PRESCRIPTION_READY = 'prescription_ready',
}

// ─── Report Type ──────────────────────────────────────────────────────────────
export enum ReportType {
  LAB_REPORT = 'lab_report',
  IMAGING = 'imaging',
  PRESCRIPTION = 'prescription',
  DISCHARGE_SUMMARY = 'discharge_summary',
  OTHER = 'other',
}

// ─── Gender ───────────────────────────────────────────────────────────────────
export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
  PREFER_NOT_TO_SAY = 'prefer_not_to_say',
}

// ─── Blood Group ──────────────────────────────────────────────────────────────
export enum BloodGroup {
  A_POSITIVE = 'A+',
  A_NEGATIVE = 'A-',
  B_POSITIVE = 'B+',
  B_NEGATIVE = 'B-',
  O_POSITIVE = 'O+',
  O_NEGATIVE = 'O-',
  AB_POSITIVE = 'AB+',
  AB_NEGATIVE = 'AB-',
}
