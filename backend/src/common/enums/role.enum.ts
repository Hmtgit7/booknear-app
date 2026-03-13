export enum UserRole {
  PATIENT = 'patient',
  DOCTOR = 'doctor',
  ADMIN = 'admin',
}

export enum Permission {
  // ── Auth ───────────────────────────────────────────────
  SEND_OTP = 'send_otp',
  VERIFY_OTP = 'verify_otp',

  // ── Doctors ────────────────────────────────────────────
  CREATE_DOCTOR_PROFILE = 'create_doctor_profile',
  UPDATE_OWN_PROFILE = 'update_own_profile',
  READ_ANY_DOCTOR = 'read_any_doctor',
  SEARCH_DOCTORS = 'search_doctors',

  // ── Appointments ───────────────────────────────────────
  BOOK_APPOINTMENT = 'book_appointment',
  VIEW_OWN_APPOINTMENTS = 'view_own_appointments',
  VIEW_ALL_APPOINTMENTS = 'view_all_appointments', // admin
  UPDATE_APPOINTMENT = 'update_appointment',
  CANCEL_APPOINTMENT = 'cancel_appointment',
  ADD_OFFLINE_PATIENT = 'add_offline_patient',

  // ── Reports ────────────────────────────────────────────
  UPLOAD_REPORT = 'upload_report',
  VIEW_OWN_REPORTS = 'view_own_reports',
  VIEW_SHARED_REPORTS = 'view_shared_reports', // doctor

  // ── Prescriptions ──────────────────────────────────────
  CREATE_PRESCRIPTION = 'create_prescription',
  VIEW_OWN_PRESCRIPTIONS = 'view_own_prescriptions',

  // ── Feed ───────────────────────────────────────────────
  CREATE_FEED_POST = 'create_feed_post',
  READ_FEED = 'read_feed',
  LIKE_FEED_POST = 'like_feed_post',
  COMMENT_FEED_POST = 'comment_feed_post',
  DELETE_OWN_POST = 'delete_own_post',
  MODERATE_FEED = 'moderate_feed', // admin

  // ── KYC ────────────────────────────────────────────────
  SUBMIT_KYC = 'submit_kyc',
  REVIEW_KYC = 'review_kyc', // admin

  // ── Reviews ────────────────────────────────────────────
  CREATE_REVIEW = 'create_review',
  READ_REVIEWS = 'read_reviews',

  // ── Admin ──────────────────────────────────────────────
  MANAGE_USERS = 'manage_users',
  VIEW_PLATFORM_STATS = 'view_platform_stats',
  MANAGE_DOCTORS = 'manage_doctors',
}
