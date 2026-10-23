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

export interface Course {
  code: string;
  title: string;
  units: number;
  semester: string;
}

// Course is the one Session 1 interface with no id field of its own --
// the code is its identity -- so unlike the two types above there is
// nothing here to rename and nothing to leave out. Naming all four
// fields looks like saying nothing, and it is doing one real job:
// Omit and Pick both produce a MAPPED type, and an interface is not
// one. The toJSON transform in Course.ts takes Record<string, unknown>;
// TypeScript hands it a mapped type happily and refuses an interface.
export type CourseDoc = Pick<
  Course,
  "code" | "title" | "units" | "semester"
>;

export interface Submission {
  id: string;
  studentId: string;
  courseCode: string;
  repoUrl: string;
  submittedAt: string;
  grade?: number;
}

export type SubmissionDoc = Omit<Submission, "id" | "studentId"> & {
  studentId: Types.ObjectId;
};

export type NewSubmissionBody = Pick<Submission, "courseCode" | "repoUrl">;

