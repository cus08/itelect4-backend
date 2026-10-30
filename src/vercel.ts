// src/vercel.ts
// Vercel's CJS runtime picks this file up via the default export and the
// CommonJS re-exports below. app.ts only uses ESM exports so that it can
// be imported cleanly in tests.
import app from "./app.js";
export default app;
module.exports = app;
module.exports.default = app;
module.exports.app = app;
