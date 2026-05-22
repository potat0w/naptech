import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { corsOptions } from "./config/cors.js";
import { apiRouter } from "./routes/index.js";
import { errorHandler } from "./middleware/errorHandler.js";

export function createApp() {
  const app = express();

  app.use(cors(corsOptions()));
  app.options(/.*/, cors(corsOptions()));

  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: "cross-origin" },
    })
  );

  app.use(express.json({ limit: "1mb" }));
  app.use(cookieParser());

  app.use("/v1", apiRouter);

  app.use(errorHandler);

  return app;
}
