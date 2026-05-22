import { Router } from "express";
import type { AssignmentStatus } from "@prisma/client";
import * as assignmentService from "../services/assignment.service.js";
import * as caregiverService from "../services/caregiver.service.js";
import * as reportService from "../services/report.service.js";
import { authenticate, type AuthRequest } from "../middleware/authenticate.js";
import { requireRole } from "../middleware/requireRole.js";
import { validateBody } from "../validation/validate.js";
import {
  submitReportSchema,
  updateAssignmentStatusSchema,
} from "../validation/schemas.js";

export const caregiverRouter = Router();

caregiverRouter.use(authenticate, requireRole("caregiver"));

caregiverRouter.get("/dashboard", async (req: AuthRequest, res, next) => {
  try {
    const stats = await caregiverService.getCaregiverDashboard(req.user!.id);
    res.json({ stats });
  } catch (e) {
    next(e);
  }
});

caregiverRouter.get("/assignments", async (req: AuthRequest, res, next) => {
  try {
    const assignments = await assignmentService.listAssignments({
      caregiverUserId: req.user!.id,
      status: req.query.status as AssignmentStatus | undefined,
      date: typeof req.query.date === "string" ? req.query.date : undefined,
    });
    res.json({ assignments });
  } catch (e) {
    next(e);
  }
});

caregiverRouter.get("/assignments/reportable", async (req: AuthRequest, res, next) => {
  try {
    const visits = await reportService.listReportableAssignments(req.user!.id);
    res.json({ visits });
  } catch (e) {
    next(e);
  }
});

caregiverRouter.get("/assignments/:id", async (req: AuthRequest, res, next) => {
  try {
    const assignment = await assignmentService.getAssignmentForCaregiver(
      String(req.params.id),
      req.user!.id
    );
    res.json({ assignment });
  } catch (e) {
    next(e);
  }
});

caregiverRouter.patch("/assignments/:id/status", async (req: AuthRequest, res, next) => {
  try {
    const body = await validateBody(updateAssignmentStatusSchema, req.body);
    const assignment = await assignmentService.updateAssignmentStatus(
      String(req.params.id),
      req.user!.id,
      body.status as AssignmentStatus
    );
    res.json({ assignment });
  } catch (e) {
    next(e);
  }
});

caregiverRouter.get("/reports", async (req: AuthRequest, res, next) => {
  try {
    const reports = await reportService.listReports({
      caregiverUserId: req.user!.id,
      status: req.query.status as import("@prisma/client").ReportStatus | undefined,
    });
    res.json({ reports });
  } catch (e) {
    next(e);
  }
});

caregiverRouter.post("/reports", async (req: AuthRequest, res, next) => {
  try {
    const body = await validateBody(submitReportSchema, req.body);
    const report = await reportService.submitReport(req.user!.id, body);
    res.status(201).json({ report });
  } catch (e) {
    next(e);
  }
});

caregiverRouter.get("/reports/:id", async (req: AuthRequest, res, next) => {
  try {
    const report = await reportService.getReportForCaregiver(
      String(req.params.id),
      req.user!.id
    );
    res.json({ report });
  } catch (e) {
    next(e);
  }
});

caregiverRouter.patch("/me", async (req: AuthRequest, res, next) => {
  try {
    const phone = String(req.body.phone ?? "").trim();
    await caregiverService.updateCaregiverPhone(req.user!.id, phone);
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
});
