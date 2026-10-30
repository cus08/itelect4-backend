import { defineConfig, loadEnv } from "vitest/config";
import { config } from "dotenv";

export default defineConfig(({ mode }) => {
  // Load .env from the backend root for all tests
  config();

  return {
    test: {
      environment: "node",
      // Pass through all real env vars (already loaded by dotenv above)
      // plus a safe fallback JWT_SECRET in case .env doesn't define one
      env: {
        JWT_SECRET:
          process.env.JWT_SECRET ?? "test-secret-key-for-vitest-only",
      },
    },
  };
});
