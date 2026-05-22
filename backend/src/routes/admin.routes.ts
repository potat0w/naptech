import { Router } from "express";
import type { AssignmentStatus, InquiryStatus, ReportStatus } from "@prisma/client";
import * as adminService from "../services/admin.service.js";
import * as assignmentService from "../services/assignment.service.js";
import * as bookingService from "../services/booking.service.js";
import * as inquiryService from "../services/inquiry.service.js";
import * as reportService from "../services/report.service.js";
import { authenticate, type AuthRequest } from "../middleware/authenticate.js";
import { requireRole } from "../middleware/requireRole.js";
import { validateBody } from "../validation/validate.js";
import {
  createAssignmentSchema,
  createCaregiverSchema,
  reassignAssignmentSchema,
} from "../validation/schemas.js";

export const adminRouter = Router();

adminRouter.use(authenticate, requireRole("admin"));

adminRouter.get("/dashboard", async (_req, res, next) => {
  try {
    const stats = await adminService.getDashboardStats();
    res.json({ stats });
  } catch (e) {
    next(e);
  }
});

adminRouter.get("/activity", async (req, res, next) => {
  try {
    const limit = Number(req.query.limit ?? 20);
    const activity = await adminService.getRecentActivity(limit);
    res.json({
      activity: activity.map((a) => ({
        id: a.id,
        message: a.message,
        time: a.createdAt.toISOString(),
        type: a.type,
      })),
    });
  } catch (e) {
    next(e);
  }
});

adminRouter.get("/caregivers", async (req, res, next) => {
  try {
    const q = typeof req.query.q === "string" ? req.query.q : undefined;
    const caregivers = await adminService.listCaregivers(q);
    res.json({ caregivers });
  } catch (e) {
    next(e);
  }
});

adminRouter.post("/caregivers", async (req, res, next) => {
  try {
    const body = await validateBody(createCaregiverSchema, req.body);
    const caregiver = await adminService.createCaregiver(body);
    res.status(201).json({ caregiver });
  } catch (e) {
    next(e);
  }
});

adminRouter.patch("/caregivers/:id/status", async (req, res, next) => {
  try {
    const status = req.body.status as "active" | "inactive";
    await adminService.updateCaregiverStatus(req.params.id, status);
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
});

adminRouter.get("/assignments", async (req, res, next) => {
  try {
    const assignments = await assignmentService.listAssignments({
      caregiverUserId:
        typeof req.query.caregiverId === "string" ? req.query.caregiverId : undefined,
      status: req.query.status as AssignmentStatus | undefined,
      date: typeof req.query.date === "string" ? req.query.date : undefined,
    });
    res.json({ assignments });
  } catch (e) {
    next(e);
  }
});

adminRouter.post("/assignments", async (req: AuthRequest, res, next) => {
  try {
    const body = await validateBody(createAssignmentSchema, req.body);
    const tasks = (Array.isArray(body.tasks) ? body.tasks : []).filter(
      (t): t is string => typeof t === "string"
    );
    const assignment = await assignmentService.createAssignment(req.user!.id, {
      ...body,
      tasks,
    });
    res.status(201).json({ assignment });
  } catch (e) {
    next(e);
  }
});

adminRouter.patch("/assignments/:id/cancel", async (req: AuthRequest, res, next) => {
  try {
    const assignment = await assignmentService.cancelAssignment(
      req.user!.id,
      String(req.params.id)
    );
    res.json({ assignment });
  } catch (e) {
    next(e);
  }
});

adminRouter.post("/assignments/:id/reassign", async (req: AuthRequest, res, next) => {
  try {
    const body = await validateBody(reassignAssignmentSchema, req.body);
    const assignment = await assignmentService.reassignAssignment(
      req.user!.id,
      String(req.params.id),
      body.caregiverUserId
    );
    res.status(201).json({ assignment });
  } catch (e) {
    next(e);
  }
});

adminRouter.get("/bookings", async (req, res, next) => {
  try {
    const status = typeof req.query.status === "string" ? req.query.status : undefined;
    const bookings = await bookingService.listBookingsForAdmin(status);
    res.json({ bookings });
  } catch (e) {
    next(e);
  }
});

adminRouter.get("/bookings/:id", async (req, res, next) => {
  try {
    const booking = await bookingService.getBookingForAdmin(String(req.params.id));
    res.json({ booking });
  } catch (e) {
    next(e);
  }
});

adminRouter.post("/bookings/:id/match", async (req: AuthRequest, res, next) => {
  try {
    const body = await validateBody(createAssignmentSchema, req.body);
    const tasks = (Array.isArray(body.tasks) ? body.tasks : []).filter(
      (t): t is string => typeof t === "string"
    );
    const assignment = await assignmentService.matchBookingToAssignment(
      req.user!.id,
      String(req.params.id),
      { ...body, tasks }
    );
    res.status(201).json({ assignment });
  } catch (e) {
    next(e);
  }
});

adminRouter.get("/reports", async (req, res, next) => {
  try {
    const reports = await reportService.listReports({
      caregiverUserId:
        typeof req.query.caregiverId === "string" ? req.query.caregiverId : undefined,
      status: req.query.status as ReportStatus | undefined,
      date: typeof req.query.date === "string" ? req.query.date : undefined,
    });
    res.json({ reports });
  } catch (e) {
    next(e);
  }
});

adminRouter.get("/reports/:id", async (req, res, next) => {
  try {
    const report = await reportService.getReport(req.params.id);
    res.json({ report });
  } catch (e) {
    next(e);
  }
});

adminRouter.patch("/reports/:id/review", async (req: AuthRequest, res, next) => {
  try {
    const report = await reportService.reviewReport(String(req.params.id), req.user!.id);
    res.json({ report });
  } catch (e) {
    next(e);
  }
});

adminRouter.get("/inquiries", async (req, res, next) => {
  try {
    const inquiries = await inquiryService.listInquiries(
      req.query.status as InquiryStatus | undefined
    );
    res.json({
      inquiries: inquiries.map((inq) => ({
        id: inq.id,
        name: inq.fullName,
        email: inq.email,
        subject: inq.subject,
        message: inq.message,
        date: inq.createdAt.toISOString().slice(0, 10),
        status: inq.status,
      })),
    });
  } catch (e) {
    next(e);
  }
});

adminRouter.patch("/inquiries/:id", async (req, res, next) => {
  try {
    const inquiry = await inquiryService.updateInquiryStatus(
      req.params.id,
      req.body.status as InquiryStatus
    );
    res.json({ inquiry });
  } catch (e) {
    next(e);
  }
});
