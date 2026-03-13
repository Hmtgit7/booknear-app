import { AppointmentStatus, IAppointment } from '@/types';
import { create } from 'zustand';

interface AppointmentState {
  appointments: IAppointment[];
  todayAppointments: IAppointment[];
  selectedAppointment: IAppointment | null;
  isLoading: boolean;

  // Actions
  setAppointments: (appointments: IAppointment[]) => void;
  setTodayAppointments: (appointments: IAppointment[]) => void;
  addAppointment: (appointment: IAppointment) => void;
  updateAppointmentStatus: (id: string, status: AppointmentStatus) => void;
  removeAppointment: (id: string) => void;
  setSelectedAppointment: (appointment: IAppointment | null) => void;
  setLoading: (loading: boolean) => void;
  reset: () => void;
}

export const useAppointmentStore = create<AppointmentState>((set) => ({
  appointments: [],
  todayAppointments: [],
  selectedAppointment: null,
  isLoading: false,

  setAppointments: (appointments) => set({ appointments }),

  setTodayAppointments: (todayAppointments) => set({ todayAppointments }),

  addAppointment: (appointment) =>
    set((state) => ({ appointments: [appointment, ...state.appointments] })),

  updateAppointmentStatus: (id, status) =>
    set((state) => ({
      appointments: state.appointments.map((a) => (a.id === id ? { ...a, status } : a)),
      todayAppointments: state.todayAppointments.map((a) => (a.id === id ? { ...a, status } : a)),
    })),

  removeAppointment: (id) =>
    set((state) => ({
      appointments: state.appointments.filter((a) => a.id !== id),
      todayAppointments: state.todayAppointments.filter((a) => a.id !== id),
    })),

  setSelectedAppointment: (selectedAppointment) => set({ selectedAppointment }),

  setLoading: (isLoading) => set({ isLoading }),

  reset: () => set({ appointments: [], todayAppointments: [], selectedAppointment: null }),
}));
