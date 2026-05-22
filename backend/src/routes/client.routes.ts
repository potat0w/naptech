import { Router } from "express";
import * as bookingService from "../services/booking.service.js";
import { authenticate, type AuthRequest } from "../middleware/authenticate.js";
import { requireRole } from "../middleware/requireRole.js";
import { validateBody } from "../validation/validate.js";
import { bookCareSchema, updateProfileSchema } from "../validation/schemas.js";

export const clientRouter = Router();

clientRouter.use(authenticate, requireRole("client"));

clientRouter.get("/me/bookings", async (req: AuthRequest, res, next) => {
  try {
    const bookings = await bookingService.listBookingsForUser(req.user!.id);
    res.json({ bookings });
  } catch (e) {
    next(e);
  }
});

clientRouter.post("/me/bookings", async (req: AuthRequest, res, next) => {
  try {
    const body = await validateBody(bookCareSchema, req.body);
    const booking = await bookingService.createBooking(req.user!.id, body);
    res.status(201).json({ booking });
  } catch (e) {
    next(e);
  }
});

clientRouter.patch("/me", async (req: AuthRequest, res, next) => {
  try {
    const body = await validateBody(updateProfileSchema, req.body);
    const user = await bookingService.updateClientProfile(req.user!.id, body);
    res.json({ user });
  } catch (e) {
    next(e);
  }
});
