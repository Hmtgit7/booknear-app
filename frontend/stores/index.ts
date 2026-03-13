// Shared Zustand stores – import in any frontend app:
//   import { useAuthStore, useUIStore } from '@docnear/store';

export { useAuthStore } from './auth.store';
export { useAppointmentStore } from './appointment.store';
export { useUIStore } from './ui.store';
export type { Toast } from './ui.store';
