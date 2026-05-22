export const containerClass =
  "mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16";

export const sectionPy = "py-14 sm:py-16 lg:py-20";

export const headingSerif =
  "font-normal leading-tight text-neutral-900 [font-family:var(--font-playfair),ui-serif,serif]";

export const headingFont = {
  fontFamily: "var(--font-playfair), ui-serif, serif",
} as const;

export const sectionTitle = `${headingSerif} text-4xl sm:text-5xl lg:text-[3.25rem]`;

export const cardTitle = `${headingSerif} text-2xl sm:text-3xl`;

export const sectionBgWhite = "bg-white";

export const sectionBgSurface = "bg-surface";

export const sectionBgSurfaceAlt = "bg-surface-alt";

export const sectionBgBrand = "bg-brand text-white";

export const sectionBgBrandDeep = "bg-brand-deeper text-white";

export const btnPrimary =
  "inline-flex min-h-12 items-center justify-center rounded-full bg-brand px-7 py-3 text-sm font-semibold text-white shadow-[0_8px_28px_-8px_rgba(100,69,150,0.4)] transition-all duration-200 hover:bg-brand-dark hover:shadow-[0_10px_32px_-8px_rgba(100,69,150,0.5)]";

export const btnPrimaryLg =
  "group inline-flex min-h-[3.25rem] w-fit items-center gap-3 rounded-full bg-brand py-3.5 pl-7 pr-4 text-sm font-semibold text-white shadow-[0_8px_32px_-10px_rgba(100,69,150,0.55)] transition-all duration-200 hover:bg-brand-dark hover:shadow-[0_12px_36px_-10px_rgba(100,69,150,0.65)] hover:-translate-y-0.5 active:translate-y-0";

export const btnSecondary =
  "inline-flex min-h-12 items-center justify-center rounded-full border border-brand px-7 py-3 text-sm font-semibold text-brand transition-colors duration-200 hover:bg-brand/5";

export const btnPrimaryInverse =
  "inline-flex min-h-12 items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-brand transition-colors duration-200 hover:bg-white/90";

export const btnIcon =
  "flex h-12 w-12 items-center justify-center rounded-full transition-colors duration-200";

export const carouselBtnPrev = `${btnIcon} bg-surface-card text-neutral-700 hover:bg-surface-card-hover`;

export const carouselBtnNext = `${btnIcon} bg-brand text-white hover:bg-brand-dark`;

export const cardBase =
  "rounded-2xl bg-surface-card p-7 transition-colors duration-300 sm:p-8";

export const accentText = "text-brand";

export const accentItalic = "font-medium italic text-brand";

export const bodyText = "text-base leading-relaxed text-body sm:text-lg";

export const labelEyebrow =
  "text-xs font-semibold uppercase tracking-[0.2em] text-brand";
