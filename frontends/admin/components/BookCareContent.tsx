"use client";

import { useAuth } from "@/components/AuthProvider";
import BookCareForm from "@/components/BookCareForm";
import ClientPasswordReset from "@/components/ClientPasswordReset";
import { formInputClass, formLabelClass, headingFont } from "@/lib/auth/form-styles";
import { fetchBookings } from "@/lib/api/bookings";
import { btnPrimary, btnSecondary, containerClass } from "@/lib/layout";
import type { BookingRequest } from "@/lib/auth/bookings-storage";
import { ApiError } from "@/lib/api/client";
import type { MockUser } from "@/lib/auth/types";
import {
  AlertCircle,
  Calendar,
  Check,
  ChevronRight,
  ClipboardList,
  Home,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  User,
} from "lucide-react";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type ReactNode,
} from "react";

type ProfileFields = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  postcode: string;
};

function profileFromUser(user: MockUser): ProfileFields {
  return {
    firstName: (user.firstName ?? "").trim(),
    lastName: (user.lastName ?? "").trim(),
    email: (user.email ?? "").trim(),
    phone: (user.phone ?? "").trim(),
    addressLine1: (user.addressLine1 ?? "").trim(),
    addressLine2: (user.addressLine2 ?? "").trim(),
    city: (user.city ?? "").trim(),
    postcode: (user.postcode ?? "").trim(),
  };
}

function profileIsComplete(fields: ProfileFields) {
  return Boolean(
    fields.firstName &&
      fields.lastName &&
      fields.email &&
      fields.phone &&
      fields.addressLine1 &&
      fields.city &&
      fields.postcode
  );
}

function buildProfilePatch(
  current: ProfileFields,
  original: ProfileFields
): Partial<ProfileFields> {
  const patch: Partial<ProfileFields> = {};
  (Object.keys(current) as (keyof ProfileFields)[]).forEach((key) => {
    if (current[key] !== original[key]) {
      patch[key] = current[key];
    }
  });
  return patch;
}

const cardClass =
  "rounded-2xl border border-white/80 bg-white shadow-[0_12px_40px_-20px_rgba(63,45,98,0.15)] sm:rounded-3xl sm:shadow-[0_16px_56px_-24px_rgba(63,45,98,0.18)]";

const sectionTitleClass =
  "text-xl font-normal leading-snug text-neutral-900 sm:text-2xl sm:leading-tight";

const sectionIconClass = "h-5 w-5 shrink-0 text-brand sm:h-6 sm:w-6";

function formatAddress(booking: BookingRequest) {
  const line2 = booking.addressLine2 ? `, ${booking.addressLine2}` : "";
  return `${booking.addressLine1}${line2}, ${booking.city} ${booking.postcode}`;
}

function applyProfileToForm(
  snapshot: ProfileFields,
  setters: {
    setFirstName: (v: string) => void;
    setLastName: (v: string) => void;
    setEmail: (v: string) => void;
    setPhone: (v: string) => void;
    setAddressLine1: (v: string) => void;
    setAddressLine2: (v: string) => void;
    setCity: (v: string) => void;
    setPostcode: (v: string) => void;
  }
) {
  setters.setFirstName(snapshot.firstName);
  setters.setLastName(snapshot.lastName);
  setters.setEmail(snapshot.email);
  setters.setPhone(snapshot.phone);
  setters.setAddressLine1(snapshot.addressLine1);
  setters.setAddressLine2(snapshot.addressLine2);
  setters.setCity(snapshot.city);
  setters.setPostcode(snapshot.postcode);
}

function ProfileViewRow({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-surface-card/80 bg-surface-alt/50 px-3 py-3 sm:rounded-2xl sm:px-4 sm:py-3.5">
      <dt className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted sm:gap-2 sm:text-xs sm:tracking-[0.12em]">
        {icon}
        {label}
      </dt>
      <dd className="mt-1 break-words text-sm font-medium leading-snug text-neutral-900">
        {value || "—"}
      </dd>
    </div>
  );
}

export default function BookCareContent() {
  const { user, updateProfile, refreshUser } = useAuth();
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [originalProfile, setOriginalProfile] = useState<ProfileFields | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const successTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const loadBookings = useCallback(async () => {
    if (!user) return;
    try {
      const { bookings } = await fetchBookings();
      setBookings(bookings);
    } catch {
      setBookings([]);
    }
  }, [user]);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  const formSetters = useMemo(
    () => ({
      setFirstName,
      setLastName,
      setEmail,
      setPhone,
      setAddressLine1,
      setAddressLine2,
      setCity,
      setPostcode,
    }),
    []
  );

  useEffect(() => {
    if (!user) return;
    const snapshot = profileFromUser(user);
    applyProfileToForm(snapshot, formSetters);
    setOriginalProfile(snapshot);
    setIsEditing(false);
    setSaveError(null);
    setSaveSuccess(false);
  }, [user?.id, formSetters]);

  useEffect(() => {
    return () => {
      if (successTimer.current) clearTimeout(successTimer.current);
    };
  }, []);

  const currentProfile = useMemo<ProfileFields>(
    () => ({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      addressLine1: addressLine1.trim(),
      addressLine2: addressLine2.trim(),
      city: city.trim(),
      postcode: postcode.trim(),
    }),
    [firstName, lastName, email, phone, addressLine1, addressLine2, city, postcode]
  );

  const profileComplete = profileIsComplete(currentProfile);

  const handleFieldChange =
    (setter: (value: string) => void) => (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
      setSaveError(null);
    };

  const handleEnterEdit = () => {
    if (!originalProfile) return;
    applyProfileToForm(originalProfile, formSetters);
    setSaveError(null);
    setSaveSuccess(false);
    setIsEditing(true);
  };

  const handleCancel = () => {
    if (!originalProfile) return;
    applyProfileToForm(originalProfile, formSetters);
    setSaveError(null);
    setIsEditing(false);
  };

  const handleSaveChanges = async () => {
    if (!originalProfile || isSaving) return;
    const patch = buildProfilePatch(currentProfile, originalProfile);

    if (Object.keys(patch).length === 0) {
      setIsEditing(false);
      return;
    }

    if (!profileIsComplete(currentProfile)) return;

    setIsSaving(true);
    setSaveError(null);
    try {
      await updateProfile(patch);
      await refreshUser();
      setOriginalProfile(currentProfile);
      setIsEditing(false);
      setSaveSuccess(true);
      if (successTimer.current) clearTimeout(successTimer.current);
      successTimer.current = setTimeout(() => setSaveSuccess(false), 3000);
    } catch (e) {
      setSaveError(
        e instanceof ApiError ? e.message : "Something went wrong. Please try again."
      );
    } finally {
      setIsSaving(false);
    }
  };

  const viewProfile = originalProfile;
  const displayName = viewProfile
    ? `${viewProfile.firstName} ${viewProfile.lastName}`.trim() || "—"
    : "—";

  if (!user) return null;

  const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();

  return (
    <div className="min-h-screen bg-surface">
      <div className={`${containerClass} pt-4 pb-12 sm:pt-6 sm:pb-16 md:pt-8 md:pb-20`}>
        <Link
          href="/"
          className="inline-flex min-h-10 items-center gap-1.5 text-xs text-muted transition-colors hover:text-brand sm:text-sm"
        >
          <Home className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          Back to website
        </Link>

        <div className="mt-4 flex flex-col gap-4 border-b border-surface-card pb-6 sm:mt-6 sm:gap-6 sm:pb-8 md:flex-row md:items-end md:justify-between">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand sm:text-xs sm:tracking-[0.2em]">
              Client account
            </p>
            <h1
              className="mt-1.5 text-[1.65rem] font-normal leading-[1.2] text-neutral-900 sm:mt-2 sm:text-3xl md:text-4xl"
              style={headingFont}
            >
              Book a <em className="italic text-brand">caregiver</em>
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted md:text-base">
              Welcome back, {user.firstName}. Confirm your details, then request a home visit.
            </p>
          </div>
          <div className="flex w-full items-center gap-3 rounded-xl border border-surface-card bg-white px-3 py-2.5 shadow-[0_8px_24px_-12px_rgba(63,45,98,0.12)] sm:w-auto sm:rounded-2xl sm:px-4 sm:py-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand text-sm font-semibold text-white sm:h-12 sm:w-12 sm:rounded-xl sm:text-base">
              {initials}
            </span>
            <div className="min-w-0 flex-1 sm:flex-initial">
              <p className="truncate text-sm font-semibold text-neutral-900">
                {user.firstName} {user.lastName}
              </p>
              <p className="truncate text-xs text-muted">{user.email}</p>
            </div>
          </div>
        </div>

        <div className="mb-6 mt-6 flex flex-col gap-2 rounded-xl border border-surface-card bg-white px-3 py-3 shadow-sm sm:mb-8 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3 sm:rounded-2xl sm:px-4 md:px-5">
          <div className="flex items-center gap-2 text-xs font-medium text-brand sm:text-sm">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-[10px] font-semibold text-white sm:h-7 sm:w-7 sm:text-xs">
              1
            </span>
            Your details
          </div>
          <ChevronRight
            className="hidden h-4 w-4 shrink-0 text-muted sm:block"
            aria-hidden
          />
          <div className="flex items-center gap-2 text-xs font-medium text-muted sm:text-sm">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-surface-card bg-surface-alt text-[10px] font-semibold text-body sm:h-7 sm:w-7 sm:text-xs">
              2
            </span>
            Request a visit
          </div>
        </div>

        {viewProfile && !profileIsComplete(viewProfile) && !isEditing ? (
          <div className="mb-6 flex gap-2.5 rounded-xl border border-amber-200/80 bg-amber-50 px-3 py-3 sm:mb-8 sm:gap-3 sm:rounded-2xl sm:px-4 sm:py-4 md:px-5">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-700 sm:h-5 sm:w-5" aria-hidden />
            <p className="text-xs leading-relaxed text-amber-950 sm:text-sm">
              Please complete your phone and home address so we know where to send your caregiver.
              Click <span className="font-semibold">Update</span> in your details to add them.
            </p>
          </div>
        ) : null}

        <div className="grid gap-6 md:grid-cols-12 md:gap-8">
          <section className={`${cardClass} p-4 sm:p-6 md:col-span-5 md:p-8`}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand sm:text-xs sm:tracking-[0.2em]">
                  Step 1
                </p>
                <h2
                  className={`mt-1 flex items-center gap-2 ${sectionTitleClass}`}
                  style={headingFont}
                >
                  <User className={sectionIconClass} />
                  Your details
                </h2>
                <p className="mt-1 text-xs text-muted sm:text-sm">
                  {isEditing ? "Edit your information below." : "Review your saved information."}
                </p>
              </div>
              {!isEditing && viewProfile && profileIsComplete(viewProfile) ? (
                <span className="inline-flex w-fit items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-800 sm:text-xs">
                  <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  Complete
                </span>
              ) : null}
            </div>

            {isEditing ? (
              <div className="mt-4 space-y-3 sm:mt-6 sm:space-y-4">
                <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                  <label className="block">
                    <span className={`${formLabelClass} flex items-center gap-2`}>
                      <User className="h-4 w-4 text-brand" /> First name *
                    </span>
                    <input
                      type="text"
                      value={firstName}
                      onChange={handleFieldChange(setFirstName)}
                      className={`${formInputClass} mt-1`}
                    />
                  </label>
                  <label className="block">
                    <span className={formLabelClass}>Last name *</span>
                    <input
                      type="text"
                      value={lastName}
                      onChange={handleFieldChange(setLastName)}
                      className={`${formInputClass} mt-1`}
                    />
                  </label>
                </div>
                <label className="block">
                  <span className={`${formLabelClass} flex items-center gap-2`}>
                    <Mail className="h-4 w-4 text-brand" /> Email *
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={handleFieldChange(setEmail)}
                    className={`${formInputClass} mt-1`}
                  />
                </label>
                <label className="block">
                  <span className={`${formLabelClass} flex items-center gap-2`}>
                    <Phone className="h-4 w-4 text-brand" /> Phone *
                  </span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={handleFieldChange(setPhone)}
                    className={`${formInputClass} mt-1`}
                  />
                </label>
                <label className="block">
                  <span className={`${formLabelClass} flex items-center gap-2`}>
                    <Home className="h-4 w-4 text-brand" /> Street address *
                  </span>
                  <input
                    type="text"
                    value={addressLine1}
                    onChange={handleFieldChange(setAddressLine1)}
                    placeholder="14 Oak Lane"
                    className={`${formInputClass} mt-1`}
                  />
                </label>
                <label className="block">
                  <span className={formLabelClass}>Flat, building (optional)</span>
                  <input
                    type="text"
                    value={addressLine2}
                    onChange={handleFieldChange(setAddressLine2)}
                    className={`${formInputClass} mt-1`}
                  />
                </label>
                <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                  <label className="block">
                    <span className={formLabelClass}>Town / city *</span>
                    <input
                      type="text"
                      value={city}
                      onChange={handleFieldChange(setCity)}
                      className={`${formInputClass} mt-1`}
                    />
                  </label>
                  <label className="block">
                    <span className={formLabelClass}>Postcode *</span>
                    <input
                      type="text"
                      value={postcode}
                      onChange={handleFieldChange(setPostcode)}
                      maxLength={12}
                      className={`${formInputClass} mt-1`}
                    />
                  </label>
                </div>
              </div>
            ) : viewProfile ? (
              <dl className="mt-4 grid gap-2.5 sm:mt-6 sm:grid-cols-2 sm:gap-3">
                <div className="sm:col-span-2">
                  <ProfileViewRow
                    label="Name"
                    value={displayName}
                    icon={<User className="h-3.5 w-3.5 text-brand" />}
                  />
                </div>
                <div className="sm:col-span-2">
                  <ProfileViewRow
                    label="Email"
                    value={viewProfile.email}
                    icon={<Mail className="h-3.5 w-3.5 text-brand" />}
                  />
                </div>
                <ProfileViewRow
                  label="Phone"
                  value={viewProfile.phone}
                  icon={<Phone className="h-3.5 w-3.5 text-brand" />}
                />
                <ProfileViewRow label="Postcode" value={viewProfile.postcode} />
                <div className="sm:col-span-2">
                  <ProfileViewRow
                    label="Street address"
                    value={viewProfile.addressLine1}
                    icon={<Home className="h-3.5 w-3.5 text-brand" />}
                  />
                </div>
                <ProfileViewRow label="Flat, building" value={viewProfile.addressLine2} />
                <ProfileViewRow label="Town / city" value={viewProfile.city} />
              </dl>
            ) : null}

            {saveSuccess && !isEditing ? (
              <p className="mt-3 flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-800 sm:mt-4 sm:rounded-xl sm:text-sm">
                <Check className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" aria-hidden />
                Changes saved!
              </p>
            ) : null}

            {saveError && isEditing ? (
              <p className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-800 sm:mt-4 sm:rounded-xl sm:text-sm">
                {saveError}
              </p>
            ) : null}

            {isEditing ? (
              <div className="mt-4 flex flex-col gap-2.5 sm:mt-6 sm:flex-row-reverse sm:justify-end sm:gap-3">
                <button
                  type="button"
                  onClick={handleSaveChanges}
                  disabled={isSaving || !profileComplete}
                  className={`${btnPrimary} min-h-11 w-full text-sm sm:min-h-12 sm:w-auto sm:min-w-[10rem] sm:text-sm disabled:cursor-not-allowed disabled:opacity-50`}
                >
                  {isSaving ? "Saving…" : "Save changes"}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={isSaving}
                  className={`${btnSecondary} min-h-11 w-full text-sm sm:min-h-12 sm:w-auto sm:text-sm disabled:cursor-not-allowed disabled:opacity-50`}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleEnterEdit}
                className={`${btnSecondary} mt-4 min-h-11 w-full text-sm sm:mt-6 sm:min-h-12 sm:text-sm`}
              >
                Update
              </button>
            )}

            <ClientPasswordReset email={viewProfile?.email ?? user.email} />

            <p className="mt-4 border-t border-surface-card pt-4 text-xs text-muted sm:mt-6 sm:pt-5 sm:text-sm">
              Need advice first?{" "}
              <Link
                href="/enquire"
                className="font-semibold text-brand transition-colors hover:text-brand-dark"
              >
                Send an enquiry
              </Link>
            </p>
          </section>

          <div className="md:col-span-7">
            <div className={`${cardClass} overflow-hidden`}>
              <div className="border-b border-surface-card bg-surface-alt/40 px-4 py-4 sm:px-6 sm:py-5 md:px-8">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand sm:text-xs sm:tracking-[0.2em]">
                  Step 2
                </p>
                <h2
                  className={`mt-1 flex items-center gap-2 ${sectionTitleClass}`}
                  style={headingFont}
                >
                  <MapPin className={sectionIconClass} />
                  Request a home visit
                </h2>
                <p className="mt-1 text-xs text-muted sm:text-sm">
                  Tell us where care is needed and who it is for.
                </p>
              </div>
              <div className="p-4 sm:p-6 md:p-8">
                <BookCareForm
                  key={`${user.addressLine1}-${user.city}-${user.postcode}`}
                  onSuccess={loadBookings}
                  embedded
                />
              </div>
            </div>
          </div>
        </div>

        <section className={`${cardClass} mt-8 p-4 sm:mt-10 sm:p-6 md:p-8`}>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand sm:text-xs sm:tracking-[0.2em]">
                Activity
              </p>
              <h2
                className={`mt-1 flex items-center gap-2 ${sectionTitleClass}`}
                style={headingFont}
              >
                <ClipboardList className={sectionIconClass} />
                Your booking requests
              </h2>
            </div>
            {bookings.length > 0 ? (
              <span className="w-fit rounded-full bg-brand/10 px-2.5 py-0.5 text-xs font-medium text-brand sm:px-3 sm:py-1 sm:text-sm">
                {bookings.length} {bookings.length === 1 ? "request" : "requests"}
              </span>
            ) : null}
          </div>
          {bookings.length === 0 ? (
            <div className="mt-6 rounded-xl border border-dashed border-surface-card bg-surface-alt/50 px-4 py-8 text-center sm:mt-8 sm:rounded-2xl sm:px-6 sm:py-10">
              <Sparkles className="mx-auto h-7 w-7 text-brand/60 sm:h-8 sm:w-8" aria-hidden />
              <p className="mt-3 text-sm font-medium text-neutral-900 sm:mt-4">No bookings yet</p>
              <p className="mx-auto mt-1.5 max-w-sm text-xs text-muted sm:mt-2 sm:text-sm">
                Complete your details and submit a home visit request above. We will keep your
                requests here.
              </p>
            </div>
          ) : (
            <ul className="mt-4 space-y-3 sm:mt-6 sm:space-y-4">
              {bookings.map((booking) => (
                <li
                  key={booking.id}
                  className="rounded-xl border border-surface-card bg-surface-alt/30 p-4 transition-colors hover:border-brand/20 hover:bg-white sm:rounded-2xl sm:p-5"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-neutral-900 sm:text-base">
                        Care for {booking.careFor === "me" ? "myself" : "a loved one"}
                      </p>
                      <p className="mt-1.5 flex items-start gap-2 text-xs text-body sm:mt-2 sm:text-sm">
                        <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand sm:h-4 sm:w-4" />
                        {formatAddress(booking)}
                      </p>
                      {booking.careNotes ? (
                        <p className="mt-1.5 text-xs text-muted sm:mt-2 sm:text-sm">
                          {booking.careNotes}
                        </p>
                      ) : null}
                    </div>
                    <div className="flex items-center justify-between gap-3 border-t border-surface-card/80 pt-3 sm:flex-col sm:items-end sm:border-0 sm:pt-0">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold sm:px-3 sm:py-1 sm:text-xs ${
                          booking.status === "pending"
                            ? "bg-amber-100 text-amber-900"
                            : "bg-emerald-100 text-emerald-800"
                        }`}
                      >
                        {booking.status === "pending" ? "Pending match" : "Matched"}
                      </span>
                      <p className="flex items-center gap-1 text-[11px] text-muted sm:justify-end sm:text-xs">
                        <Calendar className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        {new Date(booking.createdAt).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
