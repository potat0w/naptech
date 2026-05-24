"use client";

import EnquirePrivacyNotice from "@/components/EnquirePrivacyNotice";
import FormFieldError from "@/components/FormFieldError";
import FormSplitLayout from "@/components/FormSplitLayout";
import {
  formErrorClass,
  formInputClass,
  formRequiredClass,
  formTextareaClass,
  headingFont,
} from "@/lib/auth/form-styles";
import { images } from "@/lib/images";
import { btnPrimary, btnSecondary } from "@/lib/layout";
import { formValuesFromForm, inputErrorClass, validateWithSchema } from "@/lib/validation/helpers";
import { submitInquiry } from "@/lib/api/inquiries";
import { ApiError } from "@/lib/api/client";
import { enquireSchema } from "@/lib/validation/schemas";
import Link from "next/link";
import { useState, type FormEvent } from "react";

type EnquireContentProps = {
  titleId?: string;
  onClose?: () => void;
};

const enquireLabelClass = "mb-1.5 block text-sm font-medium text-body";

export default function EnquireContent({ titleId, onClose }: EnquireContentProps) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [pending, setPending] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});
    setPending(true);

    const validation = await validateWithSchema(
      enquireSchema,
      formValuesFromForm(e.currentTarget)
    );

    if (!validation.success) {
      setError(validation.message);
      setFieldErrors(validation.fieldErrors);
      setPending(false);
      return;
    }

    try {
      await submitInquiry({
        fullName: validation.values.fullName,
        phone: validation.values.phone,
        email: validation.values.email,
        message: validation.values.message,
        privacyConsent: true,
        marketingConsent: false,
      });
      setPending(false);
      setSubmitted(true);
    } catch (err) {
      setPending(false);
      if (err instanceof ApiError) {
        setError(err.message);
        if (err.fieldErrors) setFieldErrors(err.fieldErrors);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  const form = (
    <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
      {error ? (
        <p className={formErrorClass} role="alert">
          {error}
        </p>
      ) : null}
      {submitted ? (
        <div className="py-4 text-center sm:text-left">
          <div
            className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand/10 text-brand sm:mx-0"
            aria-hidden
          >
            <svg
              className="h-7 w-7"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>
          <p
            className="mt-6 text-3xl font-normal text-neutral-900"
            style={headingFont}
          >
            Thank you
          </p>
          <p className="mt-4 text-sm leading-relaxed text-body">
            We&apos;ve received your enquiry. A member of our team will be in
            touch shortly.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {onClose ? (
              <button
                type="button"
                onClick={onClose}
                className={`w-full sm:w-fit ${btnPrimary}`}
              >
                Close
              </button>
            ) : (
              <Link href="/" className={`w-full sm:w-fit ${btnPrimary}`}>
                Back to home
              </Link>
            )}
            <Link href="/book" className={`w-full sm:w-fit ${btnSecondary}`}>
              Book a caregiver
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="pb-3">
            <p
              className="text-xl font-normal text-neutral-900 sm:text-2xl"
              style={headingFont}
            >
              Your enquiry
            </p>
            <p className="mt-1 text-sm text-muted">
              Tell us how we can help — fields marked * are required.
            </p>
          </div>

          <label className="block">
            <span className={enquireLabelClass}>
              Full name <span className={formRequiredClass}>*</span>
            </span>
            <input
              type="text"
              name="fullName"
              autoComplete="name"
              aria-invalid={Boolean(fieldErrors.fullName)}
              className={inputErrorClass(Boolean(fieldErrors.fullName), formInputClass)}
            />
            <FormFieldError message={fieldErrors.fullName} />
          </label>

          <label className="block">
            <span className={enquireLabelClass}>
              Phone number <span className={formRequiredClass}>*</span>
            </span>
            <input
              type="tel"
              name="phone"
              autoComplete="tel"
              aria-invalid={Boolean(fieldErrors.phone)}
              className={inputErrorClass(Boolean(fieldErrors.phone), formInputClass)}
            />
            <FormFieldError message={fieldErrors.phone} />
          </label>

          <label className="block">
            <span className={enquireLabelClass}>
              Email address <span className={formRequiredClass}>*</span>
            </span>
            <input
              type="email"
              name="email"
              autoComplete="email"
              aria-invalid={Boolean(fieldErrors.email)}
              className={inputErrorClass(Boolean(fieldErrors.email), formInputClass)}
            />
            <FormFieldError message={fieldErrors.email} />
          </label>

          <label className="block">
            <span className={enquireLabelClass}>Message</span>
            <textarea
              name="message"
              rows={2}
              aria-invalid={Boolean(fieldErrors.message)}
              className={inputErrorClass(Boolean(fieldErrors.message), formTextareaClass)}
            />
            <FormFieldError message={fieldErrors.message} />
          </label>

          <EnquirePrivacyNotice />

          <div className="pt-1">
            <button
              type="submit"
              disabled={pending}
              className={`w-full sm:w-auto sm:min-w-[12rem] ${btnPrimary} disabled:cursor-not-allowed disabled:opacity-60`}
            >
              {pending ? "Sending…" : "Send enquiry"}
            </button>
          </div>
        </>
      )}
    </form>
  );

  return (
    <FormSplitLayout
      imageSrc={images.handsCare}
      imageAlt="Care professional holding hands with a client"
      imageTextPosition="center"
      formPanelClassName="pt-4 pb-6 sm:pt-5 sm:pb-8 lg:pt-6 lg:pb-10"
      titleId={titleId}
      eyebrow="Get in touch"
      title="Start a care enquiry"
      subtitle="Complete the form below and our team will be in touch shortly."
      aside={
        <>
          <p className="text-sm leading-relaxed text-white/90">
            Want to apply for a job?{" "}
            <Link
              href="/recruitment/apply"
              className="font-medium text-white underline underline-offset-4 transition-colors hover:text-white/80"
            >
              Contact recruitment
            </Link>
            . Recruitment enquiries via this form will not receive a response.
          </p>
        </>
      }
    >
      {form}
    </FormSplitLayout>
  );
}
