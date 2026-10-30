import { Schema, model } from "mongoose";
import type { SessionDoc } from "../types/index";

const sessionSchema = new Schema<SessionDoc>({
  tutorId: {
    type: Number,
    required: [true, "tutorId is required"],
    min: [1, "tutorId must be positive"],
  },
  courseCode: {
    type: String,
    required: [true, "courseCode is required"],
    uppercase: true,
    trim: true,
  },
  topic: {
    type: String,
    required: [true, "topic is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "description is required"],
    trim: true,
  },
  schedule: {
    type: String,
    required: [true, "schedule is required"],
    trim: true,
  },
  maxTutees: {
    type: Number,
    required: true,
    min: [1, "maxTutees must be at least 1"],
  },
});

sessionSchema.set("toJSON", {
  transform(_doc, ret: Record<string, unknown>) {
    ret.id = String(ret._id);
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const Session = model<SessionDoc>("Session", sessionSchema);
