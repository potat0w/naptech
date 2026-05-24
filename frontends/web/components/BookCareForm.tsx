"use client";

import { useAuth } from "@/components/AuthProvider";
import FormFieldError from "@/components/FormFieldError";
import { formErrorClass, formInputClass, formLabelClass } from "@/lib/auth/form-styles";
import type { BookingRequest } from "@/lib/auth/bookings-storage";
import { createBooking } from "@/lib/api/bookings";
import { ApiError } from "@/lib/api/client";
import { btnPrimary } from "@/lib/layout";
import { formValuesFromForm, inputErrorClass, validateWithSchema } from "@/lib/validation/helpers";
import { bookCareSchema } from "@/lib/validation/schemas";
import { Check } from "lucide-react";
import { useState, type FormEvent } from "react";

type CareFor = "loved-one" | "me";

type BookCareFormProps = {
  onSuccess?: (booking: BookingRequest) => void;
  embedded?: boolean;
};

export default function BookCareForm({ onSuccess, embedded = false }: BookCareFormProps) {
  const { user, refreshUser } = useAuth();
  const [careFor, setCareFor] = useState<CareFor>("me");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [pending, setPending] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});
    setPending(true);

    const validation = await validateWithSchema(bookCareSchema, {
      ...formValuesFromForm(e.currentTarget),
      careFor,
    });

    if (!validation.success) {
      setError(validation.message);
      setFieldErrors(validation.fieldErrors);
      setPending(false);
      return;
    }

    if (!user) {
      setError("Please sign in to request a caregiver.");
      setPending(false);
      return;
    }

    try {
      const { booking } = await createBooking({
        addressLine1: validation.values.addressLine1,
        addressLine2: validation.values.addressLine2,
        city: validation.values.city,
        postcode: validation.values.postcode,
        careFor: validation.values.careFor,
        preferredDate: validation.values.preferredDate,
        careNotes: validation.values.careNotes,
      });
      await refreshUser();
      setPending(false);
      setSubmitted(true);
      onSuccess?.(booking);
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

  if (!user) return null;

  if (submitted) {
    return (
      <div className="rounded-xl border border-brand/20 bg-gradient-to-br from-brand/5 to-surface-alt px-4 py-6 text-center sm:rounded-2xl sm:px-6 sm:py-8 sm:text-left">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-white sm:h-12 sm:w-12 sm:rounded-2xl">
          <Check className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden />
        </span>
        <p
          className="mt-3 text-lg font-normal text-neutral-900 sm:mt-4 sm:text-xl"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          Booking request received
        </p>
        <p className="mt-2 text-xs leading-relaxed text-muted sm:mt-3 sm:text-sm">
          Thanks, {user.firstName}. We&apos;ll match a Care Professional for your home visit and
          contact you at {user.email}.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className={`mt-4 min-h-11 w-full text-sm sm:mt-6 sm:min-h-12 sm:w-auto ${btnPrimary}`}
        >
          Request another visit
        </button>
      </div>
    );
  }

  const formClass = embedded ? "" : "rounded-3xl border border-white/80 bg-white p-6 shadow-[0_16px_56px_-24px_rgba(63,45,98,0.18)] sm:p-8";

  return (
    <form onSubmit={handleSubmit} noValidate className={formClass}>
      {!embedded ? (
        <>
          <h2
            className="text-xl font-normal text-neutral-900"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Request a home visit
          </h2>
          <p className="mt-1 text-sm text-muted">
            Where should the caregiver visit? We&apos;ll use your saved contact details.
          </p>
        </>
      ) : null}

      {error ? (
        <p className={`${embedded ? "mt-0" : "mt-4"} ${formErrorClass}`} role="alert">
          {error}
        </p>
      ) : null}

      <div
        className={`rounded-xl border border-surface-card/80 bg-surface-alt/50 px-3 py-3 text-xs text-body sm:rounded-2xl sm:px-4 sm:py-3.5 sm:text-sm ${embedded ? "mt-0" : "mt-4 sm:mt-5"}`}
      >
        <p className="font-medium text-neutral-900">
          {user.firstName} {user.lastName}
        </p>
        <p className="mt-0.5 break-all">{user.email}</p>
        <p className="break-words">{user.phone || "Add your phone in account details"}</p>
      </div>

      <div className="mt-4 space-y-3 sm:mt-5 sm:space-y-4">
        <label className="block">
          <span className={formLabelClass}>Street address *</span>
          <input
            type="text"
            name="addressLine1"
            defaultValue={user.addressLine1}
            placeholder="e.g. 111 Winterbourne Road"
            className={inputErrorClass(Boolean(fieldErrors.addressLine1), formInputClass)}
          />
          <FormFieldError message={fieldErrors.addressLine1} />
        </label>
        <label className="block">
          <span className={formLabelClass}>Flat, building (optional)</span>
          <input
            type="text"
            name="addressLine2"
            defaultValue={user.addressLine2}
            placeholder="e.g. Flat 2"
            className={formInputClass}
          />
        </label>
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
          <label className="block">
            <span className={formLabelClass}>Town / city *</span>
            <input
              type="text"
              name="city"
              defaultValue={user.city}
              placeholder="e.g. Croydon"
              className={inputErrorClass(Boolean(fieldErrors.city), formInputClass)}
            />
            <FormFieldError message={fieldErrors.city} />
          </label>
          <label className="block">
            <span className={formLabelClass}>Postcode *</span>
            <input
              type="text"
              name="postcode"
              defaultValue={user.postcode}
              placeholder="e.g. CR7 7QY"
              className={inputErrorClass(Boolean(fieldErrors.postcode), formInputClass)}
            />
            <FormFieldError message={fieldErrors.postcode} />
          </label>
        </div>
        <label className="block">
          <span className={formLabelClass}>Preferred start date (optional)</span>
          <input type="date" name="preferredDate" className={formInputClass} />
        </label>
        <label className="block">
          <span className={formLabelClass}>Care needs (optional)</span>
          <textarea
            name="careNotes"
            rows={3}
            placeholder="e.g. morning visits, medication reminders, mobility support"
            className={`${formInputClass} resize-y`}
          />
        </label>
      </div>

      <fieldset className="mt-4 sm:mt-6">
        <legend className={`${formLabelClass} text-xs sm:text-sm`}>
          Who is the care for? *
        </legend>
        <FormFieldError message={fieldErrors.careFor} />
        <div className="mt-2 flex flex-col gap-2.5 sm:mt-3 sm:flex-row sm:flex-wrap sm:gap-6">
          {(
            [
              { value: "loved-one" as const, label: "A loved one" },
              { value: "me" as const, label: "Myself" },
            ] as const
          ).map((option) => (
            <label
              key={option.value}
              className="flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border border-surface-card/80 bg-white px-3 py-2.5 text-sm text-body sm:min-h-0 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0"
            >
              <input
                type="radio"
                name="careFor"
                value={option.value}
                checked={careFor === option.value}
                onChange={() => setCareFor(option.value)}
                className="sr-only"
              />
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                  careFor === option.value
                    ? "border-brand bg-brand"
                    : "border-surface-card-hover bg-white"
                }`}
                aria-hidden
              >
                {careFor === option.value ? (
                  <span className="h-2 w-2 rounded-full bg-white" />
                ) : null}
              </span>
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-6 flex flex-col gap-2 sm:mt-8 sm:flex-row sm:items-center sm:justify-between">
        {!user.phone ? (
          <p className="text-[11px] leading-snug text-amber-800 sm:text-xs">
            Add your phone number in your details before booking.
          </p>
        ) : (
          <span className="hidden sm:block" />
        )}
        <button
          type="submit"
          disabled={pending || !user.phone}
          className={`${btnPrimary} min-h-11 w-full text-sm sm:min-h-12 sm:w-auto sm:text-sm disabled:cursor-not-allowed disabled:opacity-60`}
        >
          {pending ? "Submitting…" : "Request caregiver"}
        </button>
      </div>
    </form>
  );
}
