// ─── Redis TTL ────────────────────────────────────────────────────────────────
export const REDIS_TTL = {
  OTP: 5 * 60, // 5 minutes in seconds
  SLOT_LOCK: 30, // 30 seconds (double-booking prevention)
  SESSION: 15 * 60, // 15 minutes
  DOCTOR_CACHE: 60 * 60, // 1 hour
} as const;

// ─── Redis Key Prefixes ───────────────────────────────────────────────────────
export const REDIS_KEYS = {
  OTP: (mobile: string) => `otp:${mobile}`,
  SLOT_LOCK: (doctorId: string, date: string, slot: string) =>
    `slot-lock:${doctorId}:${date}:${slot}`,
  DOCTOR_PROFILE: (doctorId: string) => `doctor:${doctorId}`,
  REFRESH_TOKEN_BLACKLIST: (token: string) => `blacklist:${token}`,
} as const;

// ─── Pagination Defaults ──────────────────────────────────────────────────────
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
} as const;

// ─── OTP ──────────────────────────────────────────────────────────────────────
export const OTP = {
  LENGTH: 6,
  MAX_ATTEMPTS: 3,
  RESEND_COOLDOWN: 60, // seconds
} as const;

// ─── Doctor Subscription Limits ───────────────────────────────────────────────
export const SUBSCRIPTION_LIMITS = {
  free: { dailySlots: 3, featured: false },
  basic: { dailySlots: Infinity, featured: false },
  featured: { dailySlots: Infinity, featured: true },
} as const;

// ─── File Upload Limits ───────────────────────────────────────────────────────
export const FILE_LIMITS = {
  REPORT_MAX_SIZE: 10 * 1024 * 1024, // 10 MB
  KYC_MAX_SIZE: 5 * 1024 * 1024, // 5 MB
  PROFILE_IMAGE_MAX_SIZE: 2 * 1024 * 1024, // 2 MB
  ALLOWED_REPORT_TYPES: ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'],
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
} as const;

// ─── Socket.io Room Names ─────────────────────────────────────────────────────
export const SOCKET_ROOMS = {
  DOCTOR_SLOTS: (doctorId: string) => `doctor-${doctorId}-slots`,
  DOCTOR_FEED: 'feed-doctors',
  USER_NOTIFICATIONS: (userId: string) => `user-${userId}-notifications`,
} as const;

// ─── Decorator Metadata Keys ──────────────────────────────────────────────────
export const IS_PUBLIC_KEY = 'isPublic';
export const ROLES_KEY = 'roles';
export const PERMISSIONS_KEY = 'permissions';
