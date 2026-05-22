"use client";

import FormFieldError from "@/components/FormFieldError";
import { formErrorClass } from "@/lib/auth/form-styles";
import { btnPrimary, btnSecondary } from "@/lib/layout";
import { formValuesFromForm, inputErrorClass, validateWithSchema } from "@/lib/validation/helpers";
import { submitRecruitmentApplication } from "@/lib/api/recruitment";
import { ApiError } from "@/lib/api/client";
import { recruitmentFieldsSchema } from "@/lib/validation/schemas";
import Link from "next/link";
import { useState, type FormEvent } from "react";

const serif = { fontFamily: "var(--font-playfair), ui-serif, serif" } as const;

const inputClass =
  "w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition-[border-color,box-shadow] placeholder:text-neutral-400 focus:border-[#3B2A8F] focus:ring-2 focus:ring-[#3B2A8F]/15";

const labelClass = "mb-1.5 block text-sm font-medium text-neutral-800";

type Position = "part-time" | "full-time" | "live-in";

type Experience = "new" | "some" | "experienced";

export default function RecruitmentApplyForm() {
  const [position, setPosition] = useState<Position>("part-time");
  const [experience, setExperience] = useState<Experience>("new");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [pending, setPending] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});
    setPending(true);

    const validation = await validateWithSchema(recruitmentFieldsSchema, {
      ...formValuesFromForm(e.currentTarget),
      position,
      experience,
    });

    if (!validation.success) {
      setError(validation.message);
      setFieldErrors(validation.fieldErrors);
      setPending(false);
      return;
    }

    try {
      await submitRecruitmentApplication({
        firstName: validation.values.firstName,
        lastName: validation.values.lastName,
        email: validation.values.email,
        telephone: validation.values.telephone,
        position: validation.values.position,
        experience: validation.values.experience,
        cvDriveUrl: validation.values.cvDriveUrl,
        availability: validation.values.availability,
        message: validation.values.message,
        rightToWork:
          validation.values.rightToWork === true ||
          validation.values.rightToWork === "yes" ||
          validation.values.rightToWork === "on",
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

  return (
    <div className="bg-[#faf8f4]">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_1.15fr] lg:gap-16 lg:px-8 lg:py-16">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#3B2A8F]">
            Join our team
          </p>
          <h1
            className="mt-3 text-4xl font-normal leading-tight text-neutral-900 sm:text-5xl"
            style={serif}
          >
            Apply to become a Care Professional
          </h1>
          <p className="mt-6 text-base leading-relaxed text-neutral-600">
            Tell us a little about yourself and the role you&apos;re interested
            in. Our recruitment team will be in touch to discuss next steps,
            training, and how you could make a difference in clients&apos; homes.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-neutral-600">
            <li className="flex gap-3">
              <span
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#3B2A8F]"
                aria-hidden
              />
              Minimum one-hour visits with matched clients
            </li>
            <li className="flex gap-3">
              <span
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#3B2A8F]"
                aria-hidden
              />
              Industry-leading training — experience welcome but not required
            </li>
            <li className="flex gap-3">
              <span
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#3B2A8F]"
                aria-hidden
              />
              Part-time, full-time, and live-in opportunities
            </li>
          </ul>
          <p className="mt-6 text-sm text-neutral-600">
            Looking for home care for yourself or a loved one?{" "}
            <Link
              href="/enquire"
              className="font-medium text-[#3B2A8F] underline underline-offset-4 hover:text-[#2d1f6d]"
            >
              Enquire about care
            </Link>
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-sm sm:p-8">
          {submitted ? (
            <div className="py-8 sm:py-12">
              <p className="text-3xl font-normal text-neutral-900" style={serif}>
                Application received
              </p>
              <p className="mt-4 text-sm leading-relaxed text-neutral-600">
                Thank you for your interest in joining Naptec. Our recruitment
                team will review your details and contact you shortly.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/recruitment"
                  className={btnPrimary}
                >
                  Back to careers
                </Link>
                <Link
                  href="/"
                  className={btnSecondary}
                >
                  Home
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {error ? (
                <p className={formErrorClass} role="alert">
                  {error}
                </p>
              ) : null}

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className={labelClass}>First name *</span>
                  <input
                    type="text"
                    name="firstName"
                    autoComplete="given-name"
                    aria-invalid={Boolean(fieldErrors.firstName)}
                    className={inputErrorClass(Boolean(fieldErrors.firstName), inputClass)}
                  />
                  <FormFieldError message={fieldErrors.firstName} />
                </label>
                <label className="block">
                  <span className={labelClass}>Last name *</span>
                  <input
                    type="text"
                    name="lastName"
                    autoComplete="family-name"
                    aria-invalid={Boolean(fieldErrors.lastName)}
                    className={inputErrorClass(Boolean(fieldErrors.lastName), inputClass)}
                  />
                  <FormFieldError message={fieldErrors.lastName} />
                </label>
              </div>

              <label className="block">
                <span className={labelClass}>Email *</span>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  aria-invalid={Boolean(fieldErrors.email)}
                  className={inputErrorClass(Boolean(fieldErrors.email), inputClass)}
                />
                <FormFieldError message={fieldErrors.email} />
              </label>

              <label className="block">
                <span className={labelClass}>Mobile number *</span>
                <input
                  type="tel"
                  name="telephone"
                  autoComplete="tel"
                  aria-invalid={Boolean(fieldErrors.telephone)}
                  className={inputErrorClass(Boolean(fieldErrors.telephone), inputClass)}
                />
                <FormFieldError message={fieldErrors.telephone} />
              </label>

              <fieldset>
                <legend className={labelClass}>Position you&apos;re interested in *</legend>
                <FormFieldError message={fieldErrors.position} />
                <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                  {(
                    [
                      { value: "part-time" as const, label: "Part-time" },
                      { value: "full-time" as const, label: "Full-time" },
                      { value: "live-in" as const, label: "Live-in" },
                    ] as const
                  ).map((option) => (
                    <label
                      key={option.value}
                      className={`flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2.5 text-sm transition-colors ${
                        position === option.value
                          ? "border-[#3B2A8F] bg-[#3B2A8F]/5 text-[#3B2A8F]"
                          : "border-neutral-200 text-neutral-700 hover:border-neutral-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="position"
                        value={option.value}
                        checked={position === option.value}
                        onChange={() => setPosition(option.value)}
                        className="sr-only"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className={labelClass}>Care experience *</legend>
                <FormFieldError message={fieldErrors.experience} />
                <div className="mt-2 space-y-2">
                  {(
                    [
                      {
                        value: "new" as const,
                        label: "New to care — keen to learn",
                      },
                      {
                        value: "some" as const,
                        label: "Some experience (personal or voluntary)",
                      },
                      {
                        value: "experienced" as const,
                        label: "Experienced care professional",
                      },
                    ] as const
                  ).map((option) => (
                    <label
                      key={option.value}
                      className={`flex cursor-pointer items-start gap-3 rounded-lg border px-4 py-3 text-sm transition-colors ${
                        experience === option.value
                          ? "border-[#3B2A8F] bg-[#3B2A8F]/5"
                          : "border-neutral-200 hover:border-neutral-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="experience"
                        value={option.value}
                        checked={experience === option.value}
                        onChange={() => setExperience(option.value)}
                        className="mt-0.5 h-4 w-4 shrink-0 accent-[#3B2A8F]"
                      />
                      <span className="text-neutral-800">{option.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <label className="block">
                <span className={labelClass}>CV (Google Drive link) *</span>
                <input
                  type="url"
                  name="cvDriveUrl"
                  placeholder="https://drive.google.com/file/d/..."
                  autoComplete="url"
                  aria-invalid={Boolean(fieldErrors.cvDriveUrl)}
                  className={inputErrorClass(Boolean(fieldErrors.cvDriveUrl), inputClass)}
                />
                <p className="mt-1.5 text-xs text-neutral-500">
                  Upload your CV to Google Drive and paste a share link with view access.
                </p>
                <FormFieldError message={fieldErrors.cvDriveUrl} />
              </label>

              <label className="block">
                <span className={labelClass}>When are you available to work?</span>
                <textarea
                  name="availability"
                  rows={3}
                  placeholder="e.g. weekdays, evenings, weekends"
                  aria-invalid={Boolean(fieldErrors.availability)}
                  className={inputErrorClass(Boolean(fieldErrors.availability), `${inputClass} resize-y`)}
                />
                <FormFieldError message={fieldErrors.availability} />
              </label>

              <label className="block">
                <span className={labelClass}>Why would you like to join Naptec?</span>
                <textarea
                  name="message"
                  rows={4}
                  aria-invalid={Boolean(fieldErrors.message)}
                  className={inputErrorClass(Boolean(fieldErrors.message), `${inputClass} resize-y`)}
                />
                <FormFieldError message={fieldErrors.message} />
              </label>

              <label
                className={`flex cursor-pointer items-start gap-3 rounded-lg border px-4 py-3 ${
                  fieldErrors.rightToWork
                    ? "border-red-300 bg-red-50/50"
                    : "border-neutral-100 bg-neutral-50/80"
                }`}
              >
                <input
                  type="checkbox"
                  name="rightToWork"
                  className="mt-0.5 h-4 w-4 shrink-0 accent-[#3B2A8F]"
                />
                <span className="text-sm leading-relaxed text-neutral-700">
                  I confirm I have the right to work in the UK and agree to Naptec
                  processing my details for recruitment purposes. *
                </span>
              </label>
              <FormFieldError message={fieldErrors.rightToWork} />

              <button
                type="submit"
                disabled={pending}
                className={`w-full sm:w-auto ${btnPrimary} disabled:cursor-not-allowed disabled:opacity-60`}
              >
                {pending ? "Submitting…" : "Submit application"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
