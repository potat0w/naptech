export const formInputClass =
  "w-full rounded-2xl border border-surface-card bg-white px-4 py-2.5 text-sm text-neutral-900 shadow-[0_1px_2px_rgba(63,45,98,0.05)] outline-none transition-[border-color,box-shadow] placeholder:text-neutral-400 focus:border-brand focus:ring-2 focus:ring-brand/12";

export const formSelectClass = `${formInputClass} appearance-none bg-[length:1rem] bg-[right_1.25rem_center] bg-no-repeat pr-12 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%23988a9e%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')]`;

export const formTextareaClass =
  "w-full resize-y rounded-2xl border border-surface-card bg-white px-4 py-2.5 text-sm text-neutral-900 shadow-[0_1px_2px_rgba(63,45,98,0.05)] outline-none transition-[border-color,box-shadow] placeholder:text-neutral-400 focus:border-brand focus:ring-2 focus:ring-brand/12";

export const formLabelClass = "mb-0.5 block text-sm font-medium text-body";

export const formRequiredClass = "text-brand";

export const formCardClass =
  "rounded-3xl border border-white/80 bg-white/95 p-6 shadow-[0_16px_56px_-24px_rgba(63,45,98,0.22)] backdrop-blur sm:p-9";

export const formCheckboxClass =
  "mt-0.5 h-4 w-4 shrink-0 rounded border-surface-card-hover text-brand focus:ring-brand/20";

export const formSectionTitleClass =
  "text-2xl font-normal text-neutral-900 sm:text-[1.65rem]";

export const formSectionSubtitleClass = "mt-1 text-sm text-muted";

export const formErrorClass =
  "rounded-2xl border border-red-100 bg-red-50/90 px-4 py-3 text-sm text-red-700";

export const authInputClass = formInputClass;

export const authLabelClass = "mb-2 block text-sm font-medium text-body";

export const headingFont = {
  fontFamily: "var(--font-playfair), ui-serif, serif",
} as const;
