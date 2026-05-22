"use client";

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
import { loginSchema } from "@/lib/validation/schemas";
import { dashboardPathForRole, isExternalUrl } from "@/lib/portal/role";
import { useAuth } from "@/components/AuthProvider";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";

export default function LoginForm() {
  const { login, ready } = useAuth();
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
      loginSchema,
      formValuesFromForm(e.currentTarget)
    );

    if (!validation.success) {
      setError(validation.message);
      setFieldErrors(validation.fieldErrors);
      setPending(false);
      return;
    }

    const result = await login(validation.values.email, validation.values.password);

    setPending(false);
    if (!result.ok) {
      setError(result.error);
      if (result.fieldErrors) setFieldErrors(result.fieldErrors);
      return;
    }

    const destination =
      callbackUrl && callbackUrl.startsWith("/") ? callbackUrl : dashboardPathForRole(result.role);
    if (isExternalUrl(destination)) {
      window.location.href = destination;
      return;
    }
    router.push(destination);
  };

  return (
    <>
      <div className="pb-2">
        <p className={formSectionTitleClass} style={headingFont}>
          Sign in
        </p>
        <p className={formSectionSubtitleClass}>
          Welcome back — continue to your profile.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
        {error ? (
          <p className={formErrorClass} role="alert">
            {error}
          </p>
        ) : null}

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
          <span className={authLabelClass}>Password *</span>
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            aria-invalid={Boolean(fieldErrors.password)}
            className={inputErrorClass(Boolean(fieldErrors.password), authInputClass)}
          />
          <FormFieldError message={fieldErrors.password} />
        </label>

        <AuthSubmitButton pending={pending} disabled={!ready}>
          {pending ? "Signing in…" : "Sign in"}
        </AuthSubmitButton>
      </form>
    </>
  );
}
