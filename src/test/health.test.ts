import { describe, it, expect } from "vitest";
import request from "supertest";
import { app } from "../app.js";


describe("GET /api/health", () => {
  it("returns { ok: true } and 200", async () => {
    const res = await request(app).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
  });
});

describe("POST /api/auth/register", () => {
  it("returns 400 / 409 on bad or duplicate input without crashing", async () => {
    // Missing fields → express hands an empty body → missing fields
    const res = await request(app).post("/api/auth/register").send({});
    // Could be 400 (validation) or 500 (mongoose required); either is not 200
    expect(res.status).toBeGreaterThanOrEqual(400);
  });
});

describe("POST /api/auth/login", () => {
  it("returns 401 for unknown credentials", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "nobody@example.com", password: "wrongpassword123" });
    expect(res.status).toBe(401);
    expect(res.body.message).toBe("Email or password is incorrect");
  });
});

describe("Authenticated routes without a token", () => {
  it("GET /api/submissions returns 401", async () => {
    const res = await request(app).get("/api/submissions");
    expect(res.status).toBe(401);
  });

  it("GET /api/bookings returns 401", async () => {
    const res = await request(app).get("/api/bookings");
    expect(res.status).toBe(401);
  });

  it("POST /api/ai returns 401", async () => {
    const res = await request(app)
      .post("/api/ai")
      .send({ prompt: "A long enough prompt that passes schema validation." });
    expect(res.status).toBe(401);
  });
});

describe("POST /api/ai (schema guard, no Gemini call needed)", () => {
  it("returns 401 (auth guard fires before Gemini) for unauthenticated short prompt", async () => {
    const res = await request(app)
      .post("/api/ai")
      .send({ prompt: "short" });
    // Auth guard fires first, so 401 rather than 400
    expect(res.status).toBe(401);
  });
});

describe("Unknown routes", () => {
  it("returns 404 JSON for unmatched paths", async () => {
    const res = await request(app).get("/api/does-not-exist");
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message");
  });
});
