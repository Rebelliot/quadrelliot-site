"use client";
import React, { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
ENQUIRY_SERVICE_OPTIONS,
isEnquiryServiceKey,
PREFERRED_CONTACT_OPTIONS,
type EnquiryServiceKey,
type PreferredContactMethod,
} from "@/lib/enquiry";

declare global {
interface Window {
gtag?: (
command: "event",
eventName: "conversion",
parameters: { send_to: string }
) => void;
}
}

type Route = "home" | "services" | "prices" | "compliance" | "contact";
const EMAIL = "quadrelliot@gmail.com";
const PHONE_DISPLAY = "07732 272022";
const PHONE_LINK = "+447732272022";
const WHATSAPP_LINK = "https://wa.me/447732272022";
const Container = ({ children }: { children: React.ReactNode }) => (
  <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>
);
const SERVICES = {
inspection: {
title: "Commercial Roof Inspection",
short: "Roofs, gutters, facades and visible defects.",
desc: "Drone roof inspection for commercial buildings, with clear visual evidence and an inspection report produced quickly after the flight.",
bullets: [
"Commercial roofs, gutters, facades and hard-to-access areas",
"High-resolution still images captured safely from ground level",
"Marked-up findings showing visible defects, concern areas and locations",
"Inspection report ready within an hour of the flight taking place",
],
},
asset: {
title: "Asset Inspection",
short: "External assets, sites and structures.",
desc: "Aerial inspection for property, industrial and infrastructure assets where safe access, speed and evidence matter.",
bullets: [
"External asset condition capture",
"Overview images plus close visual details",
"Structured image delivery with clear references",
"Useful evidence for maintenance teams, contractors and client records",
],
},
progress: {
title: "Construction Progress",
short: "Repeatable progress records.",
desc: "Consistent aerial progress capture for construction and property teams who need a clean record of work over time.",
bullets: [
"Scheduled site progress imagery",
"Repeatable angles for comparison",
"Clean delivery for project teams and stakeholders",
"Optional short report after each visit",
],
},
} as const;
type ServiceKey = keyof typeof SERVICES;
function FieldLabel({ children, htmlFor }: { children: React.ReactNode; htmlFor: string }) {
return <label htmlFor={htmlFor} className="text-sm font-medium text-slate-700">{children}</label>;
}
function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
return (
<input
{...props}
className={[
"h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-slate-950",
"placeholder:text-slate-400 outline-none",
"focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20",
].join(" ")}
/>
);
}
function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
return (
<textarea
{...props}
className={[
"min-h-[130px] w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950",
"placeholder:text-slate-400 outline-none",
"focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20",
].join(" ")}
/>
);
}
function SelectNative(
props: React.SelectHTMLAttributes<HTMLSelectElement> & {
options: { value: string; label: string }[];
}
) {
const { options, ...rest } = props;
return (
<select
{...rest}
className={[
"h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-slate-950",
"outline-none",
"focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20",
].join(" ")}
>
{options.map((option) => ( <option key={option.value} value={option.value}>
{option.label} </option>
))} </select>
);
}
type ButtonVariant = "primary" | "secondary" | "dark";

function buttonClasses(variant: ButtonVariant = "primary") {
const base =
"inline-flex h-11 items-center justify-center rounded-xl px-5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-orange-500/30 disabled:cursor-not-allowed disabled:opacity-60";
if (variant === "primary") {
return base + " bg-orange-500 text-slate-950 hover:bg-orange-400";
}
if (variant === "dark") {
return base + " bg-slate-950 text-white hover:bg-slate-800";
}
return base + " border border-slate-300 bg-white text-slate-950 hover:bg-slate-50";
}
function Button({
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
return ( <button type={type} onClick={onClick} disabled={disabled} className={buttonClasses(variant)}>
{children} </button>
);
}
function LinkButton({
children,
href,
variant = "secondary",
target,
}: {
children: React.ReactNode;
href: string;
variant?: ButtonVariant;
target?: "_blank";
}) {
return (
<a
href={href}
target={target}
rel={target === "_blank" ? "noopener noreferrer" : undefined}
className={buttonClasses(variant)}
>
{children} </a>
);
}
function Card({
children,
className = "",
}: {
children: React.ReactNode;
className?: string;
}) {
return (
<div className={["rounded-2xl border border-slate-200 bg-white shadow-sm", className].join(" ")}>
{children} </div>
);
}
function CardHeader({ title, desc }: { title: string; desc?: string }) {
return ( <div className="border-b border-slate-200 p-6"> <div className="text-lg font-semibold text-slate-950">{title}</div>
{desc ? <div className="mt-1 text-sm text-slate-600">{desc}</div> : null} </div>
);
}
function CardBody({ children }: { children: React.ReactNode }) {
return <div className="p-6">{children}</div>;
}
function DarkPanel({
children,
className = "",
}: {
children: React.ReactNode;
className?: string;
}) {
return (
<div className={["rounded-2xl border border-white/10 bg-slate-950 text-white shadow-sm", className].join(" ")}>
{children} </div>
);
}
function Header({ setRoute }: { setRoute: React.Dispatch<React.SetStateAction<Route>> }) {
const navBtn = (route: Route, label: string, variant: ButtonVariant = "secondary") => (
<Button variant={variant} onClick={() => setRoute(route)}>
{label} </Button>
);
return ( <div className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur"> <Container> <div className="flex items-center justify-between py-4">
<Link
href="/"
className="group flex items-center gap-3 text-left"
aria-label="Go to home"
> <Image
           src="/brand/quadrelliot-q.png"
           alt="Quadrelliot"
           width={38}
           height={38}
           className="h-9 w-9 transition group-hover:scale-[1.03]"
           priority
         /> <div className="leading-tight"> <div className="text-lg font-bold tracking-wide text-slate-950">Quadrelliot</div> <div className="hidden text-xs text-slate-500 sm:block">Instant drone inspection reports</div> </div> </Link>
      <nav className="hidden items-center gap-2 lg:flex">
        {navBtn("services", "Services")}
        {navBtn("compliance", "Compliance")}
        <a
          href={"tel:" + PHONE_LINK}
          className="inline-flex h-11 items-center whitespace-nowrap px-2 text-sm font-semibold text-slate-700 transition hover:text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500/30"
        >
          {PHONE_DISPLAY}
        </a>
        <LinkButton href={WHATSAPP_LINK} target="_blank" variant="secondary">
          Text / WhatsApp
        </LinkButton>
        <LinkButton href="/prices" variant="primary">Prices</LinkButton>
        <LinkButton href="/contact" variant="primary">Request Inspection</LinkButton>
      </nav>
      <div className="flex items-center gap-2 lg:hidden">
        <Link href="/contact" className={buttonClasses("primary")}>Enquire</Link>
        <details className="group relative">
          <summary className={`${buttonClasses("secondary")} cursor-pointer list-none [&::-webkit-details-marker]:hidden`}>
            Menu
          </summary>
          <nav className="absolute right-0 top-13 z-50 grid w-[min(20rem,calc(100vw-2rem))] gap-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl">
            <button onClick={() => setRoute("services")} className="rounded-xl px-4 py-3 text-left text-sm font-semibold hover:bg-slate-50">Services</button>
            <button onClick={() => setRoute("compliance")} className="rounded-xl px-4 py-3 text-left text-sm font-semibold hover:bg-slate-50">Compliance</button>
            <a href={"tel:" + PHONE_LINK} className="rounded-xl px-4 py-3 text-sm font-semibold hover:bg-slate-50">{PHONE_DISPLAY}</a>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="rounded-xl px-4 py-3 text-sm font-semibold hover:bg-slate-50">Text / WhatsApp</a>
            <Link href="/prices" className={`${buttonClasses("primary")} w-full`}>Prices</Link>
            <Link href="/contact" className={`${buttonClasses("primary")} w-full`}>Request Inspection</Link>
          </nav>
        </details>
      </div>
    </div>
  </Container>
</div>
);
}
export default function QuadrelliotWebsite({
initialRoute = "home",
initialService = "",
}: {
initialRoute?: Route;
initialService?: string;
}) {
const [route, setRoute] = useState<Route>(initialRoute);
const [service, setService] = useState<ServiceKey>("inspection");
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");
const [postcode, setPostcode] = useState("");
const [serviceWanted, setServiceWanted] = useState<EnquiryServiceKey | "">(
isEnquiryServiceKey(initialService) ? initialService : ""
);
const [preferredContact, setPreferredContact] = useState<PreferredContactMethod | "">("");
const [scope, setScope] = useState("");
const [submissionState, setSubmissionState] = useState<"idle" | "submitting" | "success" | "error">("idle");
const [submissionError, setSubmissionError] = useState("");
const submissionInProgress = useRef(false);
const serviceKeys = useMemo(() => Object.keys(SERVICES) as ServiceKey[], []);
const current = useMemo(() => SERVICES[service], [service]);
async function submitEnquiry(event: React.FormEvent<HTMLFormElement>) {
event.preventDefault();
if (submissionInProgress.current) return;

submissionInProgress.current = true;
setSubmissionState("submitting");
setSubmissionError("");

try {
const response = await fetch("/api/contact", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({
name,
email,
phone,
postcode,
service: serviceWanted,
preferredContact,
scope,
}),
});
const result = (await response.json().catch(() => null)) as
| { success?: boolean; error?: string }
| null;

if (!response.ok || !result?.success) {
throw new Error(result?.error || "Your enquiry could not be sent. Please try again.");
}

setSubmissionState("success");

try {
if (typeof window.gtag === "function") {
window.gtag("event", "conversion", {
send_to: "AW-18243911087/RRriCO-KnugcEK_7r_tD",
});
}
} catch {
// Tracking must never change the successful form outcome.
}
} catch (error) {
setSubmissionState("error");
setSubmissionError(
error instanceof Error ? error.message : "Your enquiry could not be sent. Please try again."
);
} finally {
submissionInProgress.current = false;
}
}
return ( <div className="min-h-screen bg-[#f6f3ee] text-slate-950"> <Header setRoute={setRoute} />
  {route === "home" && (
    <main>
      <section className="relative overflow-hidden border-b border-slate-200 bg-[#f6f3ee]">
        <div className="absolute -right-32 top-8 h-[420px] w-[420px] rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute -left-24 bottom-0 h-[360px] w-[360px] rounded-full bg-slate-900/5 blur-3xl" />
        <Container>
          <div className="relative grid gap-10 py-10 md:grid-cols-[1.05fr_0.95fr] md:items-center md:py-14 lg:py-16">
            <div>
              <div className="inline-flex rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-sm font-semibold text-slate-900">
                Instant on-site drone inspection reports
              </div>
              <h1 className="mt-6 max-w-3xl text-5xl font-bold leading-[0.98] tracking-tight text-slate-950 sm:text-6xl">
                Commercial &amp; residential drone inspections with near-instant reports.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700">
                Quadrelliot provides roof and asset inspections with clear aerial imagery, marked-up findings and a
                report delivered within an hour of the flight.
              </p>
              <div className="mt-4 text-base font-semibold text-slate-700">
                Call or text{" "}
                <a href={"tel:" + PHONE_LINK} className="whitespace-nowrap text-slate-950 underline decoration-orange-500 underline-offset-4 hover:text-orange-600">
                  {PHONE_DISPLAY}
                </a>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button onClick={() => setRoute("contact")}>Request Inspection</Button>
                <LinkButton href="/prices" variant="primary">
                  View Prices
                </LinkButton>
                <LinkButton href={WHATSAPP_LINK} target="_blank" variant="secondary">
                  Text / WhatsApp
                </LinkButton>
              </div>
              <div className="mt-7 flex flex-wrap gap-x-4 gap-y-1 text-sm font-medium text-slate-600">
                {["Residential & commercial roofs", "Marked-up findings", "Report within an hour"].map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <div className="mt-3 text-sm leading-6 text-slate-500">
                UK residential and commercial work considered · CAA-compliant operations ·{" "}
                <span className="whitespace-nowrap">Insured · RAMS available</span>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <Image
                src="/images/hero-drone-inspection.jpg"
                alt="Quadrelliot drone operator carrying out a commercial drone inspection"
                width={2400}
                height={1600}
                sizes="(min-width: 1280px) 520px, (min-width: 768px) 46vw, calc(100vw - 2rem)"
                className="h-auto w-full"
                priority
              />
            </div>
          </div>
        </Container>
      </section>
      <section id="what-you-get" className="bg-white">
        <Container>
          <div className="py-14">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight">What you get</h2>
              <p className="mt-3 text-slate-600">
                A practical inspection package: aerial evidence, marked-up findings and a report your team can actually use.
              </p>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {[
                {
                  title: "Aerial inspection",
                  desc: "High-resolution roof, facade or asset imagery captured safely from ground level.",
                  image: "/images/drone-inspection-closeup.JPG",
                  alt: "Close-up of a Quadrelliot inspection drone and camera",
                  imageClass: "object-cover object-[58%_50%]",
                },
                {
                  title: "Documented findings",
                  desc: "Clear image markups showing visible defects, locations, areas of concern and useful visual references.",
                  image: "/images/report-example-page.jpg",
                  alt: "Quadrelliot inspection report showing a documented roof defect",
                  imageClass: "object-cover object-[center_62%]",
                },
                {
                  title: "Fast report",
                  desc: "A clean visual report written after the inspection, ready to send to your team or contractor nearly immediately.",
                  image: "/images/report-example-page.jpg",
                  alt: "Quadrelliot aerial roof inspection report page",
                  imageClass: "object-cover object-top",
                },
              ].map((item) => (
                <Card key={item.title} className="overflow-hidden">
                  <div className="relative aspect-[4/3] overflow-hidden border-b border-slate-200 bg-slate-100">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="(min-width: 1280px) 352px, (min-width: 768px) calc((100vw - 5rem) / 3), calc(100vw - 2rem)"
                      className={item.imageClass}
                    />
                  </div>
                  <CardBody>
                    <div className="text-lg font-bold text-slate-950">{item.title}</div>
                    <div className="mt-2 text-sm leading-6 text-slate-600">{item.desc}</div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </section>
      <section className="border-y border-slate-200 bg-[#f6f3ee]">
        <Container>
          <div className="grid gap-6 py-10 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <div className="text-sm font-semibold text-orange-600">Clear costs before you enquire</div>
              <h2 className="mt-2 text-3xl font-bold tracking-tight">Straightforward inspection prices</h2>
              <p className="mt-3 max-w-2xl leading-7 text-slate-600">
                Targeted roof checks start from £69. Full residential roof inspections with a report delivered within
                an hour are £149.
              </p>
            </div>
            <LinkButton href="/prices" variant="dark">See all prices</LinkButton>
          </div>
        </Container>
      </section>
      <section className="border-b border-slate-200 bg-white">
        <Container>
          <div className="py-10">
            <DarkPanel className="p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <Image
                  src="/brand/quadrelliot-q.png"
                  alt=""
                  width={50}
                  height={50}
                  className="rounded-xl bg-white p-1.5"
                />
                <div>
                  <div className="text-xs text-orange-300">Core offer</div>
                  <div className="text-lg font-bold">Flight, evidence, report - without the delay.</div>
                </div>
              </div>
              <div className="mt-5 grid gap-2 md:grid-cols-3">
                {[
                  {
                    title: "1. Inspect safely",
                    desc: "Roofs, facades, gutters and external assets captured without unnecessary roof access or scaffolding.",
                  },
                  {
                    title: "2. Mark the evidence",
                    desc: "Clear images organised around what your team needs to see: locations, defects and visible concern areas.",
                  },
                  {
                    title: "3. Write the report",
                    desc: "A clean visual report written after the inspection, ready to send to your team or contractor nearly immediately.",
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <div className="text-sm font-semibold text-white">{item.title}</div>
                    <div className="mt-1 text-xs leading-5 text-slate-300">{item.desc}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-xl border border-orange-500/30 bg-orange-500/10 p-3 text-xs leading-5 text-orange-100">
                Need to move quickly? Text or WhatsApp{" "}
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-orange-300"
                >
                  {PHONE_DISPLAY}
                </a>
                .
              </div>
            </DarkPanel>
          </div>
        </Container>
      </section>
      <section className="border-y border-slate-200 bg-[#f6f3ee]">
        <Container>
          <div className="grid gap-8 py-14 md:grid-cols-[0.9fr_1.1fr] md:items-start">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Professional inspections for homes, commercial property and assets</h2>
              <p className="mt-3 text-slate-600">
                From a specific concern on a residential roof to property, facilities, construction and infrastructure
                work, the focus stays on speed, clarity and useful visual evidence.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button onClick={() => setRoute("contact")}>Request Inspection</Button>
                <Button variant="secondary" onClick={() => setRoute("services")}>
                  View Services
                </Button>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Homeowners",
                "Facilities management",
                "Commercial property",
                "Roofing contractors",
                "Construction teams",
                "Housing and public sector",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-slate-200 bg-white px-5 py-4 text-sm font-semibold shadow-sm"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
      <section className="bg-slate-950 text-white">
        <Container>
          <div className="grid gap-8 py-14 md:grid-cols-3">
            <div className="md:col-span-1">
              <div className="text-sm font-semibold text-orange-300">Why it works</div>
              <h2 className="mt-2 text-3xl font-bold tracking-tight">You get usable evidence faster.</h2>
            </div>
            <div className="grid gap-4 md:col-span-2 sm:grid-cols-3">
              {[
                {
                  title: "Less access hassle",
                  desc: "Useful visual evidence without scaffolding or roof access for initial inspection.",
                },
                {
                  title: "Clearer communication",
                  desc: "Marked-up images are easier to send to contractors, clients and decision makers.",
                },
                {
                  title: "Faster decisions",
                  desc: "The report is built into the service, not treated as an afterthought.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-xl border border-white/10 bg-white/5 p-5">
                  <div className="font-semibold">{item.title}</div>
                  <div className="mt-2 text-sm leading-6 text-slate-300">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </main>
  )}
  {route === "services" && (
    <main>
      <Container>
        <div className="py-16">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">Services</h1>
              <p className="mt-2 max-w-2xl text-slate-600">
                Commercial drone services centred on fast reporting, clear visual evidence and practical delivery.
              </p>
            </div>
            <Button onClick={() => setRoute("contact")}>Request Inspection</Button>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-[320px_1fr]">
            <Card>
              <CardHeader title="Select service" />
              <CardBody>
                <div className="space-y-2">
                  {serviceKeys.map((key) => {
                    const active = service === key;
                    return (
                      <button
                        key={key}
                        onClick={() => setService(key)}
                        className={[
                          "w-full rounded-xl border px-4 py-3 text-left transition",
                          active
                            ? "border-orange-500 bg-orange-500 text-slate-950"
                            : "border-slate-200 bg-white hover:bg-slate-50",
                        ].join(" ")}
                      >
                        <div className="text-sm font-bold">{SERVICES[key].title}</div>
                        <div className={active ? "text-xs text-slate-900" : "text-xs text-slate-500"}>
                          {SERVICES[key].short}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardHeader title={current.title} desc={current.desc} />
              <CardBody>
                <ul className="space-y-3 text-sm text-slate-700">
                  {current.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3">
                      <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-orange-500" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button
                    onClick={() => {
                      setServiceWanted("commercial-housing-public-sector");
                      setRoute("contact");
                    }}
                  >
                    Request this service
                  </Button>
                  <LinkButton href={WHATSAPP_LINK} target="_blank" variant="secondary">
                    Text / WhatsApp
                  </LinkButton>
                  <Button variant="secondary" onClick={() => setRoute("home")}>
                    Back to Home
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </Container>
    </main>
  )}
  {route === "prices" && (
    <main>
      <section className="border-b border-slate-200 bg-[#f6f3ee]">
        <Container>
          <div className="py-14 sm:py-16">
            <div className="max-w-3xl">
              <div className="text-sm font-semibold text-orange-600">Clear, practical pricing</div>
              <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">Drone inspection prices</h1>
              <p className="mt-4 text-lg leading-8 text-slate-700">
                Straightforward pricing for residential roof inspections, targeted checks and aerial imagery.
                Commercial and larger projects are quoted individually.
              </p>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                Whether you are comparing a roof inspection cost or a drone roof survey cost, choose the service that
                best matches the area you need checked. If you are unsure, send an enquiry and Quadrelliot can help.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              <Card className="flex h-full flex-col border-orange-500/50">
                <CardBody>
                  <div className="text-sm font-semibold text-orange-600">Targeted inspection</div>
                  <h2 className="mt-2 text-2xl font-bold">Roof Spot Check</h2>
                  <div className="mt-3 text-4xl font-bold tracking-tight">£69</div>
                  <p className="mt-4 text-sm leading-6 text-slate-600">One specific concern or area only.</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {["Slipped tile", "Flashing", "Chimney", "Gutter", "Storm damage", "Solar-panel concern"].map((item) => (
                      <span key={item} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">{item}</span>
                    ))}
                  </div>
                  <Link href="/contact?service=roof-spot-check" className={`${buttonClasses("primary")} mt-6 w-full sm:w-auto`}>Request Spot Check</Link>
                </CardBody>
              </Card>

              <DarkPanel className="flex h-full flex-col">
                <div className="p-6">
                  <div className="text-sm font-semibold text-orange-300">Full residential inspection</div>
                  <h2 className="mt-2 text-2xl font-bold">Residential Roof Inspection</h2>
                  <div className="mt-3 text-4xl font-bold tracking-tight">£149</div>
                  <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-300">
                    {["Full drone roof inspection", "High-resolution imagery", "Visible defects identified", "Inspection report delivered within one hour of the flight"].map((item) => (
                      <li key={item} className="flex gap-3"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-orange-400" />{item}</li>
                    ))}
                  </ul>
                  <Link href="/contact?service=residential-roof-inspection" className={`${buttonClasses("primary")} mt-6 w-full sm:w-auto`}>Request Roof Inspection</Link>
                </div>
              </DarkPanel>

              <Card className="flex h-full flex-col">
                <CardBody>
                  <div className="text-sm font-semibold text-orange-600">Larger properties</div>
                  <h2 className="mt-2 text-2xl font-bold">Large / Complex Residential</h2>
                  <div className="mt-3 text-3xl font-bold tracking-tight">from £195</div>
                  <p className="mt-4 text-sm leading-6 text-slate-600">
                    For larger properties or inspections requiring substantially more flight or inspection time.
                  </p>
                  <Link href="/contact?service=large-complex-residential" className={`${buttonClasses("primary")} mt-6 w-full sm:w-auto`}>Request Quote</Link>
                </CardBody>
              </Card>

              <Card className="flex h-full flex-col">
                <CardBody>
                  <div className="text-sm font-semibold text-orange-600">Scoped to the project</div>
                  <h2 className="mt-2 text-2xl font-bold">Commercial / Housing / Public Sector</h2>
                  <div className="mt-3 text-3xl font-bold tracking-tight">Quote</div>
                  <p className="mt-4 text-sm leading-6 text-slate-600">
                    Commercial drone inspection work is individually priced based on the property, access and scope.
                  </p>
                  <Link href="/contact?service=commercial-housing-public-sector" className={`${buttonClasses("primary")} mt-6 w-full sm:w-auto`}>Request Commercial Quote</Link>
                </CardBody>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container>
          <div className="py-14">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight">Additional services</h2>
              <p className="mt-3 text-slate-600">Focused options for follow-up checks, imagery and specific visible concerns.</p>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {[
                { title: "Post-Repair Check", price: "£69", service: "post-repair-check", desc: "A targeted drone inspection after roofing or repair work has been completed." },
                { title: "Aerial Property Photos", price: "£79", service: "aerial-property-photos", desc: "High-resolution aerial property imagery. No inspection report or defect assessment." },
                { title: "Gutter & Chimney Check", price: "£79", service: "gutter-chimney-check", desc: "Focused visual check of gutters, chimney stack, pots, flashing and obvious visible defects." },
                { title: "Solar Panel Visual Check", price: "£79", service: "solar-panel-visual-check", desc: "Aerial visual inspection for obvious panel damage, debris, displacement and visible external issues. This is not an electrical or performance test." },
                { title: "Storm Damage Check", price: "£89", service: "storm-damage-check", desc: "Targeted inspection for displaced tiles, ridge or flashing damage, gutter damage, debris and other obvious visible issues after severe weather." },
                { title: "Repair Before & After Pack", price: "£99", service: "repair-before-after-pack", desc: "Aerial imagery before repair work and again after completion for comparison and documentation." },
              ].map((item) => (
                <Card key={item.title} className="flex h-full flex-col">
                  <CardBody>
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-lg font-bold">{item.title}</h3>
                      <div className="shrink-0 text-xl font-bold">{item.price}</div>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{item.desc}</p>
                    <Link href={`/contact?service=${item.service}`} className={`${buttonClasses("secondary")} mt-5 w-full`}>Enquire about this service</Link>
                  </CardBody>
                </Card>
              ))}
            </div>

            <div className="mt-10 rounded-2xl border border-slate-300 bg-[#f6f3ee] p-6 sm:p-8">
              <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
                <div>
                  <div className="inline-flex rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-700">Existing customers only</div>
                  <h2 className="mt-3 text-2xl font-bold">Existing Customer Return Check — £49</h2>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                    Only available where Quadrelliot has already inspected the property and is returning to recheck a specific issue.
                  </p>
                </div>
                <Link href="/contact?service=existing-customer-return-check" className={buttonClasses("dark")}>Request Return Check</Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-slate-200 bg-[#f6f3ee]">
        <Container>
          <div className="py-14">
            <h2 className="text-3xl font-bold tracking-tight">Prices FAQ</h2>
            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {[
                { q: "What does the £69 Roof Spot Check cover?", a: "It covers one clearly defined concern or area, such as a slipped tile, chimney, flashing or gutter. It is not a full roof inspection." },
                { q: "What is included in the £149 Residential Roof Inspection?", a: "A full drone roof inspection, high-resolution imagery, identification of visible defects and an inspection report delivered within one hour of the flight." },
                { q: "How quickly do I receive the report?", a: "Where a report is included, it is delivered within one hour of the flight taking place." },
                { q: "Do you inspect commercial properties?", a: "Yes. Commercial, housing and public-sector inspections are quoted individually based on scope." },
                { q: "Do I need to be at the property?", a: "Access and site requirements are confirmed before the flight. Share any access constraints or known hazards in your enquiry so the inspection can be planned properly." },
              ].map((item) => (
                <div key={item.q} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="font-bold text-slate-950">{item.q}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.a}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact?service=not-sure" className={buttonClasses("primary")}>Not sure? Ask for help</Link>
              <LinkButton href={WHATSAPP_LINK} target="_blank" variant="secondary">Text / WhatsApp</LinkButton>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )}
  {route === "compliance" && (
    <main>
      <Container>
        <div className="py-16">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight">Compliance</h1>
            <p className="mt-3 text-slate-600">
              Fast reporting does not mean casual operation. Site checks, risk assessment and operating limits are
              handled properly before the drone goes up.
            </p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <Card>
              <CardHeader title="Drone operations" desc="Planned and controlled." />
              <CardBody>
                <div className="space-y-3 text-sm text-slate-700">
                  <div>CAA-compliant operating approach</div>
                  <div>Pre-flight airspace and site checks</div>
                  <div>Operating boundaries set for each job</div>
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardHeader title="Insurance & RAMS" desc="Available where required." />
              <CardBody>
                <div className="space-y-3 text-sm text-slate-700">
                  <div>Public liability insurance</div>
                  <div>Risk assessment per site</div>
                  <div>Method statement for commercial work</div>
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardHeader title="Data delivery" desc="Clean and usable." />
              <CardBody>
                <div className="space-y-3 text-sm text-slate-700">
                  <div>Structured file delivery</div>
                  <div>Clear image references</div>
                  <div>Client confidentiality respected</div>
                </div>
              </CardBody>
            </Card>
          </div>
          <div className="mt-8">
            <DarkPanel className="p-6">
              <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
                <div>
                  <div className="text-xl font-bold">Need a commercial roof or asset inspection?</div>
                  <div className="mt-1 text-sm text-slate-300">
                    Send the site location, what needs checking and how quickly you need the report.
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button onClick={() => setRoute("contact")}>Request Inspection</Button>
                  <LinkButton href={WHATSAPP_LINK} target="_blank" variant="secondary">
                    Text / WhatsApp
                  </LinkButton>
                </div>
              </div>
            </DarkPanel>
          </div>
        </div>
      </Container>
    </main>
  )}
  {route === "contact" && (
    <main>
      <Container>
        <div className="grid gap-10 py-16 md:grid-cols-[1.05fr_0.95fr]">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Request an inspection</h1>
            <p className="mt-3 max-w-xl text-slate-600">
              Send the basics. I will reply with next steps, availability and a clear quote.
            </p>
            <form onSubmit={submitEnquiry} className="mt-8 space-y-4">
              <div className="space-y-2">
                <FieldLabel htmlFor="service">What are you interested in?</FieldLabel>
                <SelectNative
                  id="service"
                  value={serviceWanted}
                  onChange={(event) => setServiceWanted(event.target.value as EnquiryServiceKey | "")}
                  options={[{ value: "", label: "Choose a service" }, ...ENQUIRY_SERVICE_OPTIONS]}
                  required
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <FieldLabel htmlFor="name">Name</FieldLabel>
                  <TextInput
                    id="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Full name"
                    autoComplete="name"
                    maxLength={200}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <FieldLabel htmlFor="email">Email address</FieldLabel>
                  <TextInput
                    id="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="name@example.com"
                    type="email"
                    autoComplete="email"
                    maxLength={254}
                    required
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <FieldLabel htmlFor="phone">Phone number</FieldLabel>
                  <TextInput
                    id="phone"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="Your phone number"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    maxLength={100}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <FieldLabel htmlFor="postcode">Property postcode / address</FieldLabel>
                  <TextInput
                    id="postcode"
                    value={postcode}
                    onChange={(event) => setPostcode(event.target.value)}
                    placeholder="Address or postcode"
                    autoComplete="street-address"
                    maxLength={500}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <FieldLabel htmlFor="preferred-contact">Preferred contact method</FieldLabel>
                <SelectNative
                  id="preferred-contact"
                  value={preferredContact}
                  onChange={(event) => setPreferredContact(event.target.value as PreferredContactMethod | "")}
                  options={[{ value: "", label: "Choose how you would like a reply" }, ...PREFERRED_CONTACT_OPTIONS]}
                  required
                />
              </div>
              <div className="space-y-2">
                <FieldLabel htmlFor="scope">Details / what needs checking</FieldLabel>
                <TextArea
                  id="scope"
                  value={scope}
                  onChange={(event) => setScope(event.target.value)}
                  placeholder="Tell me what you would like checked, including any known issues, access constraints or hazards."
                  maxLength={5000}
                  required
                />
              </div>
              <div className="flex flex-wrap gap-3">
                <Button type="submit" disabled={submissionState === "submitting"}>
                  {submissionState === "submitting" ? "Sending…" : "Request an inspection"}
                </Button>
                <LinkButton href={WHATSAPP_LINK} target="_blank" variant="secondary">
                  Text / WhatsApp instead
                </LinkButton>
              </div>
              {submissionState === "success" ? (
                <div role="status" className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
                  Thanks — your enquiry has been sent. I’ll get back to you as soon as possible.
                </div>
              ) : null}
              {submissionState === "error" ? (
                <div role="alert" className="rounded-xl border border-orange-500/30 bg-orange-500/10 p-4 text-sm text-slate-800">
                  {submissionError}
                </div>
              ) : null}
            </form>
          </div>
          <div className="space-y-5">
            <DarkPanel className="p-6">
              <div className="flex items-start gap-4">
                <Image
                  src="/brand/quadrelliot-q.png"
                  alt="Quadrelliot"
                  width={56}
                  height={56}
                  className="rounded-xl bg-white p-2"
                />
                <div>
                  <div className="text-sm text-orange-300">Direct contact</div>
                  <div className="mt-2 space-y-2 text-sm">
                    <a href={"mailto:" + EMAIL} className="block font-semibold text-white hover:text-orange-300">
                      {EMAIL}
                    </a>
                    <a href={"tel:" + PHONE_LINK} className="block font-semibold text-white hover:text-orange-300">
                      Call: {PHONE_DISPLAY}
                    </a>
                    <a href={"sms:" + PHONE_LINK} className="block font-semibold text-white hover:text-orange-300">
                      Text: {PHONE_DISPLAY}
                    </a>
                    <a
                      href={WHATSAPP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block font-semibold text-white hover:text-orange-300"
                    >
                      WhatsApp: {PHONE_DISPLAY}
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-6 border-t border-white/10 pt-5 text-sm leading-6 text-slate-300">
                Residential and commercial drone inspections, fast reporting and clear visual deliverables. Reports
                are built into the inspection workflow, with delivery ready within an hour of the flight taking place.
              </div>
            </DarkPanel>
            <Card>
              <CardHeader title="To quote faster, include:" />
              <CardBody>
                <ul className="space-y-3 text-sm text-slate-700">
                  {[
                    "Site address or postcode",
                    "What needs inspecting",
                    "Access constraints or known hazards",
                    "When you need the report",
                    "Whether you need images only or a marked-up report",
                  ].map((item) => (
                    <li key={item} className="flex gap-3">
                      <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-orange-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          </div>
        </div>
      </Container>
    </main>
  )}
  <footer className="border-t border-slate-200 bg-white">
    <Container>
      <div className="flex flex-col gap-5 py-8 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-sm font-semibold text-slate-950">
            © {new Date().getFullYear()} Quadrelliot
          </div>
          <div className="mt-1 text-sm text-slate-500">
            Instant drone inspection reports · United Kingdom
          </div>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
            <a href={"mailto:" + EMAIL} className="hover:text-orange-600">
              {EMAIL}
            </a>
            <a href={"tel:" + PHONE_LINK} className="hover:text-orange-600">
              {PHONE_DISPLAY}
            </a>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-orange-600">
              WhatsApp
            </a>
          </div>
        </div>
        <Image
          src="/brand/quadrelliot-wordmark.png"
          alt="Quadrelliot"
          width={280}
          height={90}
          className="h-auto w-[220px]"
        />
      </div>
    </Container>
  </footer>
</div>
);
}
