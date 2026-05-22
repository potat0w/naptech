import { ValidationError } from "yup";

export function formValuesFromForm(form: HTMLFormElement): Record<string, unknown> {
  const data = new FormData(form);
  const values: Record<string, unknown> = {};

  for (const [key, value] of data.entries()) {
    if (value instanceof File) {
      if (value.size > 0) {
        values[key] = value;
      }
      continue;
    }
    values[key] = value;
  }

  return values;
}

export function formCheckboxValues(
  form: HTMLFormElement,
  names: readonly string[]
): Record<string, boolean> {
  const data = new FormData(form);
  const values: Record<string, boolean> = {};
  for (const name of names) {
    const raw = data.get(name);
    values[name] = raw === "yes" || raw === "on" || raw === "true";
  }
  return values;
}

export function parseYupError(error: ValidationError): {
  message: string;
  fieldErrors: Record<string, string>;
} {
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

export async function validateWithSchema<T extends Record<string, unknown>>(
  schema: { validate: (values: unknown, options?: object) => Promise<T> },
  values: Record<string, unknown>
): Promise<
  | { success: true; values: T }
  | { success: false; message: string; fieldErrors: Record<string, string> }
> {
  try {
    const validated = await schema.validate(values, {
      abortEarly: false,
      stripUnknown: true,
    });
    return { success: true, values: validated };
  } catch (error) {
    if (error instanceof ValidationError) {
      const parsed = parseYupError(error);
      return { success: false, ...parsed };
    }
    return {
      success: false,
      message: "Something went wrong. Please try again.",
      fieldErrors: {},
    };
  }
}

export function inputErrorClass(hasError: boolean, baseClass: string) {
  return hasError
    ? `${baseClass} border-red-300 focus:border-red-500 focus:ring-red-500/15`
    : baseClass;
}
