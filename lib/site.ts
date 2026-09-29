export type ButtonVariant = "primary" | "secondary" | "dark";

export const EMAIL = "quadrelliot@gmail.com";
export const PHONE_DISPLAY = "07732 272022";
export const PHONE_LINK = "+447732272022";
export const WHATSAPP_LINK = "https://wa.me/447732272022";

export function buttonClasses(variant: ButtonVariant = "primary") {
  const base =
    "inline-flex h-11 items-center justify-center rounded-xl px-5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-orange-500/30 disabled:cursor-not-allowed disabled:opacity-60";

  if (variant === "primary") return `${base} bg-orange-500 text-slate-950 hover:bg-orange-400`;
  if (variant === "dark") return `${base} bg-slate-950 text-white hover:bg-slate-800`;
  return `${base} border border-slate-300 bg-white text-slate-950 hover:bg-slate-50`;
}
