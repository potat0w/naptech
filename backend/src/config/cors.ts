import type { CorsOptions } from "cors";
import { env } from "./env.js";

export function corsOptions(): CorsOptions {
  return {
    origin(origin, callback) {
      if (env.corsAllowAll) {
        callback(null, origin ?? true);
        return;
      }

      if (!origin) {
        callback(null, true);
        return;
      }

      if (env.corsOrigins.includes(origin)) {
        callback(null, origin);
        return;
      }

      callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 204,
  };
}
