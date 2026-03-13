import { UserRole, Permission } from '../enums/role.enum';

/**
 * ROLE_PERMISSIONS maps each role to the permissions it holds.
 * This is the single source of truth — referenced by JwtAuthGuard
 * and the @RequirePermissions() decorator.
 */
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [UserRole.PATIENT]: [
    Permission.SEND_OTP,
    Permission.VERIFY_OTP,
    Permission.SEARCH_DOCTORS,
    Permission.READ_ANY_DOCTOR,
    Permission.BOOK_APPOINTMENT,
    Permission.VIEW_OWN_APPOINTMENTS,
    Permission.CANCEL_APPOINTMENT,
    Permission.UPLOAD_REPORT,
    Permission.VIEW_OWN_REPORTS,
    Permission.VIEW_OWN_PRESCRIPTIONS,
    Permission.CREATE_REVIEW,
    Permission.READ_REVIEWS,
  ],

  [UserRole.DOCTOR]: [
    Permission.SEND_OTP,
    Permission.VERIFY_OTP,
    Permission.CREATE_DOCTOR_PROFILE,
    Permission.UPDATE_OWN_PROFILE,
    Permission.READ_ANY_DOCTOR,
    Permission.SEARCH_DOCTORS,
    Permission.VIEW_OWN_APPOINTMENTS,
    Permission.UPDATE_APPOINTMENT,
    Permission.ADD_OFFLINE_PATIENT,
    Permission.VIEW_SHARED_REPORTS,
    Permission.CREATE_PRESCRIPTION,
    Permission.VIEW_OWN_PRESCRIPTIONS,
    Permission.CREATE_FEED_POST,
    Permission.READ_FEED,
    Permission.LIKE_FEED_POST,
    Permission.COMMENT_FEED_POST,
    Permission.DELETE_OWN_POST,
    Permission.SUBMIT_KYC,
    Permission.READ_REVIEWS,
    Permission.UPLOAD_REPORT,
    Permission.VIEW_OWN_REPORTS,
  ],

  [UserRole.ADMIN]: [
    // Admins inherit all permissions
    ...Object.values(Permission),
  ],
};

/**
 * Helper: check if a role has a specific permission.
 */
export function roleHasPermission(role: UserRole, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}
