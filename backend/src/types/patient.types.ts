import type { Gender } from './enums';

export interface FamilyMember {
  name: string;
  relation: string;
  dateOfBirth?: string;
  gender?: Gender;
  bloodGroup?: string;
}

export interface IPatientProfile {
  id: string;
  userId: string;
  dateOfBirth?: string;
  gender?: Gender;
  bloodGroup?: string;
  allergies: string[];
  chronicConditions: string[];
  familyMembers: FamilyMember[];
  address?: string;
  city?: string;
  pincode?: string;
  createdAt: string;
  updatedAt: string;
}
