"use client";

import Image from "next/image";
import Link from "next/link";
import {
  buttonClasses,
  EMAIL,
  PHONE_DISPLAY,
  PHONE_LINK,
  type ButtonVariant,
  WHATSAPP_LINK,
} from "@/lib/site";

export { buttonClasses, EMAIL, PHONE_DISPLAY, PHONE_LINK, WHATSAPP_LINK } from "@/lib/site";

export type SiteRoute = "home" | "services" | "prices" | "compliance" | "contact";
export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`.trim()}>
      {children}
    </div>
  );
}

export function SiteButton({
  children,
  variant = "primary",
  onClick,
  type = "button",
  disabled = false,
}: {
  children: React.ReactNode;
  variant?: ButtonVariant;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={buttonClasses(variant)}>
      {children}
    </button>
  );
}

export function LinkButton({
  children,
  href,
  variant = "secondary",
  target,
  download,
  className = "",
}: {
  children: React.ReactNode;
  href: string;
  variant?: ButtonVariant;
  target?: "_blank";
  download?: boolean | string;
  className?: string;
}) {
  return (
    <a
      href={href}
      target={target}
      download={download}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      className={`${buttonClasses(variant)} ${className}`.trim()}
    >
      {children}
    </a>
  );
}

function RouteItem({
  route,
  label,
  onRoute,
}: {
  route: "services" | "compliance";
  label: string;
  onRoute?: (route: SiteRoute) => void;
}) {
  const className = `${buttonClasses("secondary")} border-transparent shadow-none`;

  if (onRoute) {
    return (
      <button type="button" className={className} onClick={() => onRoute(route)}>
        {label}
      </button>
    );
  }

  return (
    <Link href={`/?view=${route}`} className={className}>
      {label}
    </Link>
  );
}

export function SiteHeader({ onRoute }: { onRoute?: (route: SiteRoute) => void }) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <Container>
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="group flex items-center gap-3 text-left" aria-label="Go to home">
            <Image
              src="/brand/quadrelliot-q.png"
              alt="Quadrelliot"
              width={38}
              height={38}
              className="h-9 w-9 transition group-hover:scale-[1.03]"
              priority
            />
            <div className="leading-tight">
              <div className="text-lg font-bold tracking-wide text-slate-950">Quadrelliot</div>
              <div className="hidden text-xs text-slate-500 sm:block">Instant drone inspection reports</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
            <RouteItem route="services" label="Services" onRoute={onRoute} />
            <Link href="/commercial" className={`${buttonClasses("secondary")} border-transparent shadow-none`}>
              Commercial
            </Link>
            <RouteItem route="compliance" label="Compliance" onRoute={onRoute} />
            <a
              href={`tel:${PHONE_LINK}`}
              className="inline-flex h-11 items-center whitespace-nowrap px-2 text-sm font-semibold text-slate-700 transition hover:text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500/30"
            >
              {PHONE_DISPLAY}
            </a>
            <LinkButton href={WHATSAPP_LINK} target="_blank">Text / WhatsApp</LinkButton>
            <LinkButton href="/prices" variant="primary">Prices</LinkButton>
            <LinkButton href="/contact" variant="primary">Request Inspection</LinkButton>
          </nav>

          <div className="flex items-center gap-2 lg:hidden">
            <Link href="/contact" className={buttonClasses("primary")}>Enquire</Link>
            <details className="group relative">
              <summary className={`${buttonClasses("secondary")} cursor-pointer list-none [&::-webkit-details-marker]:hidden`}>
                Menu
              </summary>
              <nav
                className="absolute right-0 top-13 z-50 grid w-[min(20rem,calc(100vw-2rem))] gap-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl"
                aria-label="Mobile navigation"
              >
                {onRoute ? (
                  <button type="button" onClick={() => onRoute("services")} className="rounded-xl px-4 py-3 text-left text-sm font-semibold hover:bg-slate-50">Services</button>
                ) : (
                  <Link href="/?view=services" className="rounded-xl px-4 py-3 text-sm font-semibold hover:bg-slate-50">Services</Link>
                )}
                <Link href="/commercial" className="rounded-xl px-4 py-3 text-sm font-semibold hover:bg-slate-50">Commercial</Link>
                {onRoute ? (
                  <button type="button" onClick={() => onRoute("compliance")} className="rounded-xl px-4 py-3 text-left text-sm font-semibold hover:bg-slate-50">Compliance</button>
                ) : (
                  <Link href="/?view=compliance" className="rounded-xl px-4 py-3 text-sm font-semibold hover:bg-slate-50">Compliance</Link>
                )}
                <a href={`tel:${PHONE_LINK}`} className="rounded-xl px-4 py-3 text-sm font-semibold hover:bg-slate-50">{PHONE_DISPLAY}</a>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="rounded-xl px-4 py-3 text-sm font-semibold hover:bg-slate-50">Text / WhatsApp</a>
                <Link href="/prices" className={`${buttonClasses("primary")} w-full`}>Prices</Link>
                <Link href="/contact" className={`${buttonClasses("primary")} w-full`}>Request Inspection</Link>
              </nav>
            </details>
          </div>
        </div>
      </Container>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <Container>
        <div className="flex flex-col gap-5 py-8 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm font-semibold text-slate-950">© {new Date().getFullYear()} Quadrelliot</div>
            <div className="mt-1 text-sm text-slate-500">Instant drone inspection reports · United Kingdom</div>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
              <a href={`mailto:${EMAIL}`} className="hover:text-orange-600">{EMAIL}</a>
              <a href={`tel:${PHONE_LINK}`} className="hover:text-orange-600">{PHONE_DISPLAY}</a>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-orange-600">WhatsApp</a>
            </div>
          </div>
          <Image src="/brand/quadrelliot-wordmark.png" alt="Quadrelliot" width={280} height={90} className="h-auto w-[220px]" />
        </div>
      </Container>
    </footer>
  );
}
