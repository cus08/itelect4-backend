import type { Types } from "mongoose";

export const UserRole = {
  TUTOR: "tutor",
  TUTEE: "tutee",
  ADMIN: "admin",
} as const;
export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  subjectSpecialization?: string[];
  bio?: string;
}

export const BookingStatus = {
  REQUESTED: "requested",
  CONFIRMED: "confirmed",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
} as const;
export type BookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus];

export interface Booking {
  id: number;
  sessionId: string;
  tuteeId: number;
  tutorId: number;
  status: BookingStatus;
  requestedAt: string;
  notes?: string;
}

export type UserDoc = Omit<User, "id"> & {
  password: string;
};

export type BookingDoc = Omit<Booking, "id" | "tuteeId"> & {
  tuteeId: Types.ObjectId;
};

export type NewBookingBody = Pick<Booking, "sessionId" | "tutorId" | "notes">;
