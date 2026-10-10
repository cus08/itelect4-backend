import { Schema, model } from "mongoose";
import type { BookingDoc } from "../types/index";

const bookingSchema = new Schema<BookingDoc>({
  tuteeId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  sessionId: {
    type: String,
    required: [true, "sessionId is required"],
    trim: true,
  },
  tutorId: {
    type: Number,
    required: true,
    min: [1, "tutorId must be positive"],
  },
  status: {
    type: String,
    enum: ["requested", "confirmed", "completed", "cancelled"],
    default: "requested",
  },
  requestedAt: { type: String, default: () => new Date().toISOString() },
  notes: {
    type: String,
    maxlength: 500,
  }
});

bookingSchema.set("toJSON", {
  transform(_doc, ret: Record<string, unknown>) {
    ret.id = String(ret._id);
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const Booking = model<BookingDoc>("Booking", bookingSchema);
