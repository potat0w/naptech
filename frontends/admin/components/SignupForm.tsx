"use client";

import { useAuth } from "@/components/AuthProvider";
import AuthSubmitButton from "@/components/AuthSubmitButton";
import FormFieldError from "@/components/FormFieldError";
import {
  authInputClass,
  authLabelClass,
  formErrorClass,
  formSectionSubtitleClass,
  formSectionTitleClass,
  headingFont,
} from "@/lib/auth/form-styles";
import { formValuesFromForm, inputErrorClass, validateWithSchema } from "@/lib/validation/helpers";
import { signupSchema } from "@/lib/validation/schemas";
import { dashboardPathForRole } from "@/lib/portal/role";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";

export default function SignupForm() {
  const { signup, ready } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [pending, setPending] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});
    setPending(true);

    const validation = await validateWithSchema(
      signupSchema,
      formValuesFromForm(e.currentTarget)
    );

    if (!validation.success) {
      setError(validation.message);
      setFieldErrors(validation.fieldErrors);
      setPending(false);
      return;
    }

    const result = await signup({
      firstName: validation.values.firstName,
      lastName: validation.values.lastName,
      email: validation.values.email,
      phone: validation.values.phone,
      password: validation.values.password,
      confirmPassword: validation.values.confirmPassword,
    });

    setPending(false);
    if (!result.ok) {
      setError(result.error);
      if (result.fieldErrors) setFieldErrors(result.fieldErrors);
      return;
    }

    const destination =
      callbackUrl &&
      !callbackUrl.startsWith("/admin") &&
      !callbackUrl.startsWith("/caregiver")
        ? callbackUrl
        : dashboardPathForRole(result.role);
    router.push(destination);
  };

  return (
    <>
      <div className="pb-2">
        <p className={formSectionTitleClass} style={headingFont}>
          Your details
        </p>
        <p className={formSectionSubtitleClass}>
          We&apos;ll use this to set up your booking.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
        {error ? (
          <p className={formErrorClass} role="alert">
            {error}
          </p>
        ) : null}

        <div className="space-y-5">
          <div className="grid gap-2 sm:grid-cols-2">
            <label className="block">
              <span className={authLabelClass}>First name *</span>
              <input
                type="text"
                name="firstName"
                autoComplete="given-name"
                aria-invalid={Boolean(fieldErrors.firstName)}
                className={inputErrorClass(Boolean(fieldErrors.firstName), authInputClass)}
              />
              <FormFieldError message={fieldErrors.firstName} />
            </label>
            <label className="block">
              <span className={authLabelClass}>Last name *</span>
              <input
                type="text"
                name="lastName"
                autoComplete="family-name"
                aria-invalid={Boolean(fieldErrors.lastName)}
                className={inputErrorClass(Boolean(fieldErrors.lastName), authInputClass)}
              />
              <FormFieldError message={fieldErrors.lastName} />
            </label>
          </div>

          <label className="block">
            <span className={authLabelClass}>Email *</span>
            <input
              type="email"
              name="email"
              autoComplete="email"
              aria-invalid={Boolean(fieldErrors.email)}
              className={inputErrorClass(Boolean(fieldErrors.email), authInputClass)}
            />
            <FormFieldError message={fieldErrors.email} />
          </label>

          <label className="block">
            <span className={authLabelClass}>Phone *</span>
            <input
              type="tel"
              name="phone"
              autoComplete="tel"
              aria-invalid={Boolean(fieldErrors.phone)}
              className={inputErrorClass(Boolean(fieldErrors.phone), authInputClass)}
            />
            <FormFieldError message={fieldErrors.phone} />
          </label>

          <label className="block">
            <span className={authLabelClass}>Password *</span>
            <input
              type="password"
              name="password"
              autoComplete="new-password"
              aria-invalid={Boolean(fieldErrors.password)}
              className={inputErrorClass(Boolean(fieldErrors.password), authInputClass)}
            />
            <FormFieldError message={fieldErrors.password} />
          </label>
          <label className="block">
            <span className={authLabelClass}>Confirm password *</span>
            <input
              type="password"
              name="confirmPassword"
              autoComplete="new-password"
              aria-invalid={Boolean(fieldErrors.confirmPassword)}
              className={inputErrorClass(
                Boolean(fieldErrors.confirmPassword),
                authInputClass
              )}
            />
            <FormFieldError message={fieldErrors.confirmPassword} />
          </label>
        </div>

        <AuthSubmitButton pending={pending} disabled={!ready}>
          {pending ? "Creating account…" : "Create account"}
        </AuthSubmitButton>
      </form>
    </>
  );
}
