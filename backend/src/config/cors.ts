import type { CorsOptions } from "cors";
import { env } from "./env.js";

const allowAnyOrigin: CorsOptions = {
  origin: (origin, callback) => {
    callback(null, origin ?? true);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

export function corsOptions(): CorsOptions {
  if (env.corsAllowAll) {
    return allowAnyOrigin;
  }

  if (env.corsOrigins.length === 0) {
    return allowAnyOrigin;
  }

  if (env.corsOrigins.length === 1) {
    return {
      origin: env.corsOrigins[0],
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    };
  }

  return {
    origin: env.corsOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  };
}
