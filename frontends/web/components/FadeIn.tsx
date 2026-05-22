"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  when?: "visible" | "mount";
};

export default function FadeIn({
  children,
  className = "",
  delay = 0,
  when = "visible",
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (when === "mount") {
      const id = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(id);
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -32px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [when]);

  return (
    <div
      ref={ref}
      className={[
        "transition-[opacity,transform] duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:translate-none motion-reduce:opacity-100 motion-reduce:transition-none",
        shown ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
        className,
      ].join(" ")}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
