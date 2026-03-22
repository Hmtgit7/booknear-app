export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface BookingSlot {
  startAt: string;
  endAt: string;
}

export interface BookingRequest {
  customerName: string;
  customerPhone: string;
  serviceId: string;
  slot: BookingSlot;
  note?: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  category: 'parlour' | 'salon' | 'spa';
  durationMinutes: number;
  priceInr: number;
}
