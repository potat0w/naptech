"use client";

import OtpInput from "@/components/OtpInput";
import { formErrorClass, formInputClass, formLabelClass } from "@/lib/auth/form-styles";
import { requestPasswordResetOtp, resetPasswordWithOtp } from "@/lib/api/auth";
import { ApiError } from "@/lib/api/client";
import { btnPrimary, btnSecondary } from "@/lib/layout";
import { KeyRound } from "lucide-react";
import { useState } from "react";

type ClientPasswordResetProps = {
  email: string;
};

export default function ClientPasswordReset({ email }: ClientPasswordResetProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"request" | "reset">("request");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const handleRequestOtp = async () => {
    setPending(true);
    setError(null);
    setNotice(null);
    try {
      await requestPasswordResetOtp(email);
      setStep("reset");
      setCode("");
      setNotice("We sent a 6-digit code to your email. Enter it below with your new password.");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not send reset code.");
    } finally {
      setPending(false);
    }
  };

  const handleReset = async () => {
    setPending(true);
    setError(null);
    try {
      await resetPasswordWithOtp({ email, code, password, confirmPassword });
      setNotice("Password updated. You can continue using your account.");
      setOpen(false);
      setStep("request");
      setCode("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not reset password.");
    } finally {
      setPending(false);
    }
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => {
          setOpen(true);
          setError(null);
          setNotice(null);
        }}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-surface-card bg-surface-alt/50 px-4 py-2.5 text-sm font-medium text-body transition-colors hover:bg-surface-alt"
      >
        <KeyRound className="h-4 w-4 text-brand" />
        Reset password
      </button>
    );
  }

  return (
    <div className="mt-4 rounded-xl border border-brand/15 bg-brand/5 p-4">
      <p className="text-sm font-semibold text-neutral-900">Reset your password</p>
      <p className="mt-1 text-xs text-muted">
        We will email a 6-digit code to <span className="font-medium text-body">{email}</span>
      </p>

      {notice ? (
        <p className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-800">
          {notice}
        </p>
      ) : null}

      {error ? (
        <p className={`${formErrorClass} mt-3 text-xs`} role="alert">
          {error}
        </p>
      ) : null}

      {step === "request" ? (
        <button
          type="button"
          onClick={handleRequestOtp}
          disabled={pending || !email}
          className={`${btnPrimary} mt-4 w-full text-sm disabled:opacity-50`}
        >
          {pending ? "Sending…" : "Send code to my email"}
        </button>
      ) : (
        <div className="mt-4 space-y-3">
          <div>
            <span className={formLabelClass}>6-digit code</span>
            <div className="mt-1">
              <OtpInput value={code} onChange={setCode} disabled={pending} />
            </div>
          </div>
          <label className="block">
            <span className={formLabelClass}>New password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={formInputClass}
              minLength={8}
            />
          </label>
          <label className="block">
            <span className={formLabelClass}>Confirm password</span>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={formInputClass}
              minLength={8}
            />
          </label>
          <button
            type="button"
            onClick={handleReset}
            disabled={pending || code.length !== 6 || !password}
            className={`${btnPrimary} w-full text-sm disabled:opacity-50`}
          >
            {pending ? "Updating…" : "Set new password"}
          </button>
          <button
            type="button"
            onClick={handleRequestOtp}
            disabled={pending}
            className="text-xs font-medium text-brand hover:text-brand-dark"
          >
            Resend code
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={() => {
          setOpen(false);
          setStep("request");
          setError(null);
        }}
        className={`${btnSecondary} mt-3 w-full text-sm`}
      >
        Cancel
      </button>
    </div>
  );
}
