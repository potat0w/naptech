import { v2 as cloudinary } from "cloudinary";
import { cloudinaryConfigured, env } from "../config/env.js";
import { badRequest } from "../utils/errors.js";

if (cloudinaryConfigured()) {
  cloudinary.config({
    cloud_name: env.cloudinaryCloudName,
    api_key: env.cloudinaryApiKey,
    api_secret: env.cloudinaryApiSecret,
  });
}

const CV_MIME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

export async function uploadCv(buffer: Buffer, originalName: string, mimeType: string) {
  if (!cloudinaryConfigured()) {
    throw badRequest("File upload is not configured.");
  }

  if (!CV_MIME_TYPES.has(mimeType) && !/\.(pdf|doc|docx)$/i.test(originalName)) {
    throw badRequest("Please upload a PDF or Word document.", { cv: "Invalid file type." });
  }

  if (buffer.length > 5 * 1024 * 1024) {
    throw badRequest("CV must be 5MB or smaller.", { cv: "File too large." });
  }

  const result = await new Promise<{
    public_id: string;
    secure_url: string;
    bytes: number;
  }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "naptec/recruitment",
        resource_type: "raw",
        public_id: `cv-${Date.now()}`,
      },
      (error, uploadResult) => {
        if (error || !uploadResult) reject(error ?? new Error("Upload failed"));
        else resolve(uploadResult as { public_id: string; secure_url: string; bytes: number });
      }
    );
    stream.end(buffer);
  });

  return {
    cloudinaryPublicId: result.public_id,
    url: result.secure_url,
    mimeType,
    sizeBytes: result.bytes,
  };
}
