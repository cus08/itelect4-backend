// src/test/schemas.test.ts
// Pure unit tests -- no MongoDB, no network.
// These run in any environment, including GitHub Actions.
import { describe, it, expect } from "vitest";
import { aiRequestSchema, reviewSchema } from "../schemas/review.js";

// ──────────────────────────────────────────────────────────────
// aiRequestSchema (what the browser sends to POST /api/ai)
// ──────────────────────────────────────────────────────────────
describe("aiRequestSchema", () => {
  it("accepts a prompt that is long enough", () => {
    const result = aiRequestSchema.safeParse({
      prompt: "A REST API built with Express, JWT auth, and MongoDB.",
    });
    expect(result.success).toBe(true);
  });

  it("rejects a prompt that is too short", () => {
    const result = aiRequestSchema.safeParse({ prompt: "too short" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Describe your project in at least 20 characters.",
      );
    }
  });

  it("rejects a prompt that is too long", () => {
    const result = aiRequestSchema.safeParse({ prompt: "x".repeat(2001) });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Keep the description under 2000 characters.",
      );
    }
  });

  it("trims whitespace before checking length", () => {
    const result = aiRequestSchema.safeParse({ prompt: "   short   " });
    expect(result.success).toBe(false);
  });

  it("rejects a missing prompt field", () => {
    const result = aiRequestSchema.safeParse({});
    expect(result.success).toBe(false);
  });
});

// ──────────────────────────────────────────────────────────────
// reviewSchema (what Gemini must return)
// ──────────────────────────────────────────────────────────────
describe("reviewSchema", () => {
  const validReview = {
    summary: "The student built a REST API with Express and MongoDB.",
    strengths: ["Clean route separation", "JWT authentication"],
    improvements: ["Add input validation", "Write unit tests"],
    readiness: "almost",
  };

  it("accepts a well-formed Gemini reply", () => {
    const result = reviewSchema.safeParse(validReview);
    expect(result.success).toBe(true);
  });

  it("rejects an invalid readiness value", () => {
    const result = reviewSchema.safeParse({
      ...validReview,
      readiness: "maybe",
    });
    expect(result.success).toBe(false);
  });

  it("rejects an empty strengths array", () => {
    const result = reviewSchema.safeParse({ ...validReview, strengths: [] });
    expect(result.success).toBe(false);
  });

  it("rejects more than 3 improvements", () => {
    const result = reviewSchema.safeParse({
      ...validReview,
      improvements: ["a", "b", "c", "d"],
    });
    expect(result.success).toBe(false);
  });

  it("rejects a missing summary field", () => {
    const { summary: _s, ...rest } = validReview;
    const result = reviewSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });
});
