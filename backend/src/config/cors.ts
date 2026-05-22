import type { CorsOptions } from "cors";
import { env } from "./env.js";

export function corsOptions(): CorsOptions {
  if (env.corsAllowAll) {
    return {
      origin: (origin, callback) => {
        callback(null, origin ?? true);
      },
      credentials: true,
    };
  }

  if (env.corsOrigins.length === 1) {
    return { origin: env.corsOrigins[0], credentials: true };
  }

  return { origin: env.corsOrigins, credentials: true };
}
