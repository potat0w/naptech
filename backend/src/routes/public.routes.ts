import { Router } from "express";
import { emailConfigured } from "../config/env.js";
import * as inquiryService from "../services/inquiry.service.js";
import * as recruitmentService from "../services/recruitment.service.js";
import { inquiryLimiter, recruitmentLimiter } from "../middleware/rateLimit.js";
import { validateBody } from "../validation/validate.js";
import { enquireSchema, recruitmentFieldsSchema } from "../validation/schemas.js";

export const publicRouter = Router();

publicRouter.post("/inquiries", inquiryLimiter, async (req, res, next) => {
  try {
    const body = await validateBody(enquireSchema, req.body);
    const inquiry = await inquiryService.createInquiry({
      ...body,
      privacyConsent:
        body.privacyConsent === true ||
        body.privacyConsent === "yes" ||
        body.privacyConsent === "on",
      marketingConsent:
        body.marketingConsent === true ||
        body.marketingConsent === "yes" ||
        body.marketingConsent === "on",
    });
    res.status(201).json({
      inquiry: {
        id: inquiry.id,
        subject: inquiry.subject,
        createdAt: inquiry.createdAt.toISOString(),
      },
    });
  } catch (e) {
    next(e);
  }
});

publicRouter.post("/recruitment/applications", recruitmentLimiter, async (req, res, next) => {
  try {
    const body = await validateBody(recruitmentFieldsSchema, req.body);
    const application = await recruitmentService.createRecruitmentApplication({
      ...body,
      rightToWork: body.rightToWork,
    });

    res.status(201).json({
      application: {
        id: application.id,
        status: application.status,
        createdAt: application.createdAt.toISOString(),
      },
    });
  } catch (e) {
    next(e);
  }
});

publicRouter.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    emailConfigured: emailConfigured(),
  });
});
