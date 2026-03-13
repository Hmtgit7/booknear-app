import { UserRole } from './enums';

// ─── Permission Actions ───────────────────────────────────────────────────────
export enum Permission {
  // ── Appointments ──────────────────────────────────────────────────────────
  CREATE_APPOINTMENT = 'appointment:create',
  READ_APPOINTMENT = 'appointment:read',
  UPDATE_APPOINTMENT = 'appointment:update',
  CANCEL_APPOINTMENT = 'appointment:cancel',
  READ_ANY_APPOINTMENT = 'appointment:read:any',

  // ── Doctors ───────────────────────────────────────────────────────────────
  CREATE_DOCTOR_PROFILE = 'doctor:create',
  READ_DOCTOR_PROFILE = 'doctor:read',
  UPDATE_DOCTOR_PROFILE = 'doctor:update:self',
  UPDATE_ANY_DOCTOR = 'doctor:update:any',
  DELETE_DOCTOR = 'doctor:delete',

  // ── Patients ──────────────────────────────────────────────────────────────
  READ_PATIENT_PROFILE = 'patient:read:self',
  UPDATE_PATIENT_PROFILE = 'patient:update:self',
  READ_ANY_PATIENT = 'patient:read:any',

  // ── Medical Reports ───────────────────────────────────────────────────────
  UPLOAD_REPORT = 'report:create',
  READ_OWN_REPORTS = 'report:read:self',
  READ_PATIENT_REPORTS = 'report:read:patient', // doctor can read assigned patient's reports
  DELETE_OWN_REPORT = 'report:delete:self',

  // ── Prescriptions ─────────────────────────────────────────────────────────
  CREATE_PRESCRIPTION = 'prescription:create',
  READ_OWN_PRESCRIPTIONS = 'prescription:read:self',
  READ_ANY_PRESCRIPTION = 'prescription:read:any',

  // ── KYC ───────────────────────────────────────────────────────────────────
  SUBMIT_KYC = 'kyc:submit',
  REVIEW_KYC = 'kyc:review',
  APPROVE_KYC = 'kyc:approve',
  REJECT_KYC = 'kyc:reject',

  // ── Feed ──────────────────────────────────────────────────────────────────
  CREATE_POST = 'feed:create',
  READ_FEED = 'feed:read',
  UPDATE_OWN_POST = 'feed:update:self',
  DELETE_OWN_POST = 'feed:delete:self',
  MODERATE_FEED = 'feed:moderate',

  // ── Reviews ───────────────────────────────────────────────────────────────
  CREATE_REVIEW = 'review:create',
  READ_REVIEWS = 'review:read',
  DELETE_ANY_REVIEW = 'review:delete:any',

  // ── Admin ─────────────────────────────────────────────────────────────────
  READ_DASHBOARD_STATS = 'admin:dashboard',
  MANAGE_USERS = 'admin:users:manage',
  MANAGE_DOCTORS = 'admin:doctors:manage',
  MANAGE_CITIES = 'admin:cities:manage',
  VIEW_AUDIT_LOG = 'admin:audit:read',
}

// ─── Role → Permission Map ────────────────────────────────────────────────────
// Defines what each role is allowed to do by default.
// Fine-grained overrides can be added per route with @Permissions().
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [UserRole.PATIENT]: [
    Permission.CREATE_APPOINTMENT,
    Permission.READ_APPOINTMENT,
    Permission.CANCEL_APPOINTMENT,
    Permission.READ_PATIENT_PROFILE,
    Permission.UPDATE_PATIENT_PROFILE,
    Permission.UPLOAD_REPORT,
    Permission.READ_OWN_REPORTS,
    Permission.DELETE_OWN_REPORT,
    Permission.READ_OWN_PRESCRIPTIONS,
    Permission.READ_FEED,
    Permission.READ_REVIEWS,
    Permission.CREATE_REVIEW,
  ],

  [UserRole.DOCTOR]: [
    Permission.READ_DOCTOR_PROFILE,
    Permission.UPDATE_DOCTOR_PROFILE,
    Permission.READ_ANY_APPOINTMENT,
    Permission.UPDATE_APPOINTMENT,
    Permission.READ_ANY_PATIENT,
    Permission.READ_PATIENT_REPORTS,
    Permission.CREATE_PRESCRIPTION,
    Permission.READ_ANY_PRESCRIPTION,
    Permission.SUBMIT_KYC,
    Permission.CREATE_POST,
    Permission.READ_FEED,
    Permission.UPDATE_OWN_POST,
    Permission.DELETE_OWN_POST,
    Permission.READ_REVIEWS,
  ],

  [UserRole.ADMIN]: [
    Permission.READ_DASHBOARD_STATS,
    Permission.MANAGE_USERS,
    Permission.MANAGE_DOCTORS,
    Permission.MANAGE_CITIES,
    Permission.REVIEW_KYC,
    Permission.APPROVE_KYC,
    Permission.REJECT_KYC,
    Permission.READ_ANY_APPOINTMENT,
    Permission.READ_ANY_PATIENT,
    Permission.READ_ANY_PRESCRIPTION,
    Permission.DELETE_ANY_REVIEW,
    Permission.MODERATE_FEED,
    Permission.UPDATE_ANY_DOCTOR,
    Permission.DELETE_DOCTOR,
  ],

  [UserRole.SUPER_ADMIN]: Object.values(Permission), // all permissions
};
