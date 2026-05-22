import { ValidationError } from "yup";
import { badRequest } from "../utils/errors.js";

export function parseYupError(error: ValidationError) {
  const fieldErrors: Record<string, string> = {};

  if (error.inner.length > 0) {
    for (const inner of error.inner) {
      if (inner.path && !fieldErrors[inner.path]) {
        fieldErrors[inner.path] = inner.message;
      }
    }
  } else if (error.path) {
    fieldErrors[error.path] = error.message;
  }

  const message =
    error.inner[0]?.message ?? error.message ?? "Please check the form and try again.";

  return { message, fieldErrors };
}

export async function validateBody<T extends Record<string, unknown>>(
  schema: { validate: (values: unknown, options?: object) => Promise<T> },
  body: unknown
): Promise<T> {
  try {
    return await schema.validate(body, { abortEarly: false, stripUnknown: true });
  } catch (error) {
    if (error instanceof ValidationError) {
      const parsed = parseYupError(error);
      throw badRequest(parsed.message, parsed.fieldErrors);
    }
    throw badRequest("Invalid request body.");
  }
}
