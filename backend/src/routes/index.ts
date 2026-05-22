import { Router } from "express";
import { authRouter } from "./auth.routes.js";
import { publicRouter } from "./public.routes.js";
import { clientRouter } from "./client.routes.js";
import { adminRouter } from "./admin.routes.js";
import { caregiverRouter } from "./caregiver.routes.js";

export const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use(publicRouter);
apiRouter.use("/clients", clientRouter);
apiRouter.use("/admin", adminRouter);
apiRouter.use("/caregiver", caregiverRouter);
