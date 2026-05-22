"use client";

import { useRef } from "react";

const OTP_LENGTH = 6;

const digitClass =
  "h-12 w-full min-w-0 rounded-xl border border-surface-card bg-white text-center text-lg font-semibold tracking-widest text-neutral-900 shadow-[0_1px_2px_rgba(63,45,98,0.05)] outline-none transition-[border-color,box-shadow] focus:border-brand focus:ring-2 focus:ring-brand/12 sm:h-14 sm:text-xl";

type OtpInputProps = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

export default function OtpInput({ value, onChange, disabled }: OtpInputProps) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const digits = Array.from({ length: OTP_LENGTH }, (_, i) => value[i] ?? "");

  const setDigits = (next: string[]) => {
    onChange(next.join("").replace(/\D/g, "").slice(0, OTP_LENGTH));
  };

  const focusIndex = (index: number) => {
    const el = refs.current[index];
    if (el) {
      el.focus();
      el.select();
    }
  };

  const handleChange = (index: number, raw: string) => {
    const cleaned = raw.replace(/\D/g, "");
    if (!cleaned) {
      const next = [...digits];
      next[index] = "";
      setDigits(next);
      return;
    }

    if (cleaned.length > 1) {
      const pasted = cleaned.slice(0, OTP_LENGTH);
      const next = Array.from({ length: OTP_LENGTH }, (_, i) => pasted[i] ?? "");
      setDigits(next);
      focusIndex(Math.min(pasted.length, OTP_LENGTH - 1));
      return;
    }

    const next = [...digits];
    next[index] = cleaned[0] ?? "";
    setDigits(next);
    if (index < OTP_LENGTH - 1) {
      focusIndex(index + 1);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      e.preventDefault();
      const next = [...digits];
      next[index - 1] = "";
      setDigits(next);
      focusIndex(index - 1);
    }
    if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      focusIndex(index - 1);
    }
    if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      e.preventDefault();
      focusIndex(index + 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!pasted) return;
    const next = Array.from({ length: OTP_LENGTH }, (_, i) => pasted[i] ?? "");
    setDigits(next);
    focusIndex(Math.min(pasted.length, OTP_LENGTH - 1));
  };

  return (
    <div
      className="grid grid-cols-6 gap-1.5 sm:gap-2"
      role="group"
      aria-label="6-digit verification code"
      onPaste={handlePaste}
    >
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            refs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          autoComplete={index === 0 ? "one-time-code" : "off"}
          maxLength={6}
          value={digit}
          disabled={disabled}
          aria-label={`Digit ${index + 1} of 6`}
          className={digitClass}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onFocus={(e) => e.target.select()}
        />
      ))}
    </div>
  );
}
