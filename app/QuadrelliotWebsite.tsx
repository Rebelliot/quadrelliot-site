"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";

type Route = "home" | "services" | "compliance" | "contact";

const EMAIL = "quadrelliot@gmail.com";

const Container = ({ children }: { children: React.ReactNode }) => (
  <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>
);

const SERVICES = {
  inspection: {
    title: "Commercial Roof Inspection",
    short: "Roofs, gutters, façades and visible defects.",
    desc: "High-resolution drone roof inspection with clear visual evidence and a fast report your team can use immediately.",
    bullets: [
      "Commercial roofs, gutters, façades and hard-to-access areas",
      "Clear still images captured safely from ground level",
      "Marked-up findings showing visible issues and locations",
      "Instant or same-day report available depending on scope",
    ],
  },
  asset: {
    title: "Asset Inspection",
    short: "Sites, structures and external assets.",
    desc: "Aerial inspection for property, industrial and infrastructure assets where safe access, speed and evidence matter.",
    bullets: [
      "External asset condition capture",
      "Overview images plus close visual details",
      "Structured folders and clear image references",
      "Useful evidence for maintenance, contractors or client records",
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
      "Optional short summary report after each visit",
    ],
  },
} as const;

type ServiceKey = keyof typeof SERVICES;

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <div className="text-sm font-medium text-slate-700">{children}</div>;
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
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

function Button({
  children,
  variant = "primary",
  onClick,
  type = "button",
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "dark";
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const base =
    "inline-flex h-11 items-center justify-center rounded-xl px-5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-orange-500/30";
  const styles =
    variant === "primary"
      ? "bg-orange-500 text-slate-950 hover:bg-orange-400"
      : variant === "dark"
      ? "bg-slate-950 text-white hover:bg-slate-800"
      : "border border-slate-300 bg-white text-slate-950 hover:bg-slate-50";

  return (
    <button type={type} onClick={onClick} className={`${base} ${styles}`}>
      {children}
    </button>
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
    <div className={`rounded-2xl border border-slate-200 bg-white shadow-sm ${className}`}>
      {children}
    </div>
  );
}

function CardHeader({ title, desc }: { title: string; desc?: string }) {
  return (
    <div className="border-b border-slate-200 p-6">
      <div className="text-lg font-semibold text-slate-950">{title}</div>
      {desc ? <div className="mt-1 text-sm text-slate-600">{desc}</div> : null}
    </div>
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
    <div className={`rounded-2xl border border-white/10 bg-slate-950 text-white shadow-sm ${className}`}>
      {children}
    </div>
  );
}

function Header({
  setRoute,
}: {
  route: Route;
  setRoute: React.Dispatch<React.SetStateAction<Route>>;
}) {
  const navBtn = (r: Route, label: string, variant: "primary" | "secondary" | "dark" = "secondary") => (
    <Button variant={variant} onClick={() => setRoute(r)}>
      {label}
    </Button>
  );

  return (
    <div className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <Container>
        <div className="flex items-center justify-between py-4">
          <button
            onClick={() => setRoute("home")}
            className="group flex items-center gap-3 text-left"
            aria-label="Go to home"
          >
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
              <div className="text-xs text-slate-500">Instant drone inspection reports</div>
            </div>
          </button>

          <nav className="hidden items-center gap-2 md:flex">
            {navBtn("services", "Services")}
            {navBtn("compliance", "Compliance")}
            {navBtn("contact", "Request Inspection", "primary")}
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            {navBtn("services", "Services")}
            {navBtn("contact", "Enquire", "primary")}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default function QuadrelliotWebsite() {
  const [route, setRoute] = useState<Route>("home");
  const [service, setService] = useState<ServiceKey>("inspection");

  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [postcode, setPostcode] = useState("");
  const [serviceWanted, setServiceWanted] = useState<ServiceKey>("inspection");
  const [deadline, setDeadline] = useState("asap");
  const [scope, setScope] = useState("");

  const serviceKeys = useMemo(() => Object.keys(SERVICES) as ServiceKey[], []);
  const current = useMemo(() => SERVICES[service], [service]);

  const serviceOptions = useMemo(
    () =>
      serviceKeys.map((k) => ({
        value: k,
        label: SERVICES[k].title,
      })),
    [serviceKeys]
  );

  const deadlineOptions = useMemo(
    () => [
      { value: "asap", label: "As soon as possible" },
      { value: "week", label: "This week" },
      { value: "month", label: "This month" },
      { value: "planned", label: "Planned / recurring work" },
    ],
    []
  );

  function submitEnquiry(e: React.FormEvent) {
    e.preventDefault();

    const subject = encodeURIComponent("Quadrelliot — Inspection Enquiry");
    const body = encodeURIComponent(
      [
        `Company: ${company || "-"}`,
        `Name: ${name || "-"}`,
        `Email: ${email}`,
        `Phone: ${phone || "-"}`,
        `Location/Postcode: ${postcode || "-"}`,
        `Service: ${SERVICES[serviceWanted].title}`,
        `Timing: ${deadlineOptions.find((d) => d.value === deadline)?.label ?? deadline}`,
        "",
        "What needs inspecting / reporting:",
        scope,
      ].join("\n")
    );

    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  }

  function scrollToId(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="min-h-screen bg-[#f6f3ee] text-slate-950">
      <Header route={route} setRoute={setRoute} />

      {route === "home" && (
        <main>
          <section className="relative overflow-hidden border-b border-slate-200 bg-[#f6f3ee]">
            <div className="absolute -right-32 top-8 h-[420px] w-[420px] rounded-full bg-orange-500/10 blur-3xl" />
            <div className="absolute -left-24 bottom-0 h-[360px] w-[360px] rounded-full bg-slate-900/5 blur-3xl" />

            <Container>
              <div className="relative grid gap-10 py-14 md:grid-cols-[1.05fr_0.95fr] md:items-center lg:py-20">
                <div>
                  <Image
                    src="/brand/quadrelliot-wordmark.png"
                    alt="Quadrelliot"
                    width={920}
                    height={260}
                    className="h-auto w-full max-w-xl"
                    priority
                  />

                  <div className="mt-8 inline-flex rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-sm font-semibold text-slate-900">
                    Fast commercial drone inspections.
                  </div>

                  <h1 className="mt-6 max-w-3xl text-5xl font-bold leading-[0.98] tracking-tight text-slate-950 sm:text-6xl">
                    Drone Roof Inspections with Instant Reports.
                  </h1>

                  <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700">
                    Clear aerial images, marked-up findings and fast report turnaround for commercial property,
                    facilities and construction teams.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <Button onClick={() => setRoute("contact")}>Request Inspection</Button>
                    <Button variant="secondary" onClick={() => scrollToId("what-you-get")}>
                      See What You Get
                    </Button>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-700">
                    {["Commercial roofs", "Marked-up findings", "Same-day delivery available"].map((item) => (
                      <div key={item} className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                        {item}
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 text-sm text-slate-500">
                    Hampshire based · UK work considered · CAA-compliant operations · Insured · RAMS available
                  </div>
                </div>

                <DarkPanel className="p-7">
                  <div className="flex items-center gap-4">
                    <Image
                      src="/brand/quadrelliot-q.png"
                      alt=""
                      width={74}
                      height={74}
                      className="rounded-2xl bg-white p-2"
                    />
                    <div>
                      <div className="text-sm text-orange-300">Core offer</div>
                      <div className="text-2xl font-bold">Clear inspection evidence, delivered fast.</div>
                    </div>
                  </div>

                  <div className="mt-8 space-y-4">
                    {[
                      {
                        title: "1. Safe aerial inspection",
                        desc: "Roofs, façades, gutters and external assets captured without unnecessary access equipment.",
                      },
                      {
                        title: "2. Useful visual evidence",
                        desc: "Clear images organised around the areas your team actually needs to understand.",
                      },
                      {
                        title: "3. Fast report turnaround",
                        desc: "A clean inspection report prepared quickly for owners, contractors or facilities teams.",
                      },
                    ].map((item) => (
                      <div key={item.title} className="rounded-xl border border-white/10 bg-white/5 p-4">
                        <div className="font-semibold text-white">{item.title}</div>
                        <div className="mt-1 text-sm leading-6 text-slate-300">{item.desc}</div>
                      </div>
                    ))}
                  </div>
                </DarkPanel>
              </div>
            </Container>
          </section>

          <section id="what-you-get" className="bg-white">
            <Container>
              <div className="py-14">
                <div className="max-w-2xl">
                  <h2 className="text-3xl font-bold tracking-tight">What you get</h2>
                  <p className="mt-3 text-slate-600">
                    A practical inspection package: images, marked-up findings and a report your team can send on.
                  </p>
                </div>

                <div className="mt-8 grid gap-5 md:grid-cols-3">
                  {[
                    {
                      title: "Aerial inspection",
                      desc: "High-resolution roof, façade or asset imagery captured safely from ground level.",
                    },
                    {
                      title: "Marked-up findings",
                      desc: "Clear image markups showing visible issues, areas of concern and useful visual references.",
                    },
                    {
                      title: "Fast report",
                      desc: "A clean visual report generated quickly after the inspection, ready to send to your team or contractor.",
                    },
                  ].map((item) => (
                    <Card key={item.title}>
                      <CardBody>
                        <Image
                          src="/brand/quadrelliot-q.png"
                          alt=""
                          width={38}
                          height={38}
                          className="mb-5 h-9 w-9"
                        />
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
              <div className="grid gap-8 py-14 md:grid-cols-[0.9fr_1.1fr] md:items-start">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight">Built for commercial roof and asset work</h2>
                  <p className="mt-3 text-slate-600">
                    Quadrelliot is aimed at property, facilities, construction and infrastructure work — where speed,
                    clarity and evidence matter more than glossy aerial footage.
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
                    "Facilities management",
                    "Commercial property",
                    "Roofing contractors",
                    "Construction teams",
                    "Industrial sites",
                    "Estates and maintenance",
                  ].map((item) => (
                    <div key={item} className="rounded-xl border border-slate-200 bg-white px-5 py-4 text-sm font-semibold shadow-sm">
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
                    Simple commercial drone services, centred on fast reporting and clear visual evidence.
                  </p>
                </div>
                <Button onClick={() => setRoute("contact")}>Request Inspection</Button>
              </div>

              <div className="mt-8 grid gap-6 md:grid-cols-[320px_1fr]">
                <Card>
                  <CardHeader title="Select service" />
                  <CardBody>
                    <div className="space-y-2">
                      {serviceKeys.map((k) => {
                        const active = service === k;
                        return (
                          <button
                            key={k}
                            onClick={() => setService(k)}
                            className={[
                              "w-full rounded-xl border px-4 py-3 text-left transition",
                              active
                                ? "border-orange-500 bg-orange-500 text-slate-950"
                                : "border-slate-200 bg-white hover:bg-slate-50",
                            ].join(" ")}
                          >
                            <div className="text-sm font-bold">{SERVICES[k].title}</div>
                            <div className={active ? "text-xs text-slate-900" : "text-xs text-slate-500"}>
                              {SERVICES[k].short}
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
                      {current.bullets.map((b) => (
                        <li key={b} className="flex gap-3">
                          <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-orange-500" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <Button
                        onClick={() => {
                          setServiceWanted(service);
                          setRoute("contact");
                        }}
                      >
                        Request this service
                      </Button>
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

      {route === "compliance" && (
        <main>
          <Container>
            <div className="py-16">
              <div className="max-w-2xl">
                <h1 className="text-4xl font-bold tracking-tight">Compliance</h1>
                <p className="mt-3 text-slate-600">
                  The inspection should be quick for the client, not casual behind the scenes. Site checks, risk assessment
                  and operating limits are handled properly.
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
                    <Button onClick={() => setRoute("contact")}>Request Inspection</Button>
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
                  Send the basics. I’ll reply with next steps, availability and a clear quote.
                </p>

                <form onSubmit={submitEnquiry} className="mt-8 space-y-4">
                  <div className="space-y-2">
                    <FieldLabel>Company</FieldLabel>
                    <TextInput value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company name" />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <FieldLabel>Contact name</FieldLabel>
                      <TextInput value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
                    </div>
                    <div className="space-y-2">
                      <FieldLabel>Email</FieldLabel>
                      <TextInput
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@company.com"
                        type="email"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <FieldLabel>Phone</FieldLabel>
                      <TextInput
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Optional"
                        inputMode="tel"
                      />
                    </div>
                    <div className="space-y-2">
                      <FieldLabel>Project postcode / location</FieldLabel>
                      <TextInput
                        value={postcode}
                        onChange={(e) => setPostcode(e.target.value)}
                        placeholder="e.g. SP10, RG14, SO20"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <FieldLabel>Service</FieldLabel>
                      <SelectNative
                        value={serviceWanted}
                        onChange={(e) => setServiceWanted(e.target.value as ServiceKey)}
                        options={serviceOptions}
                      />
                    </div>
                    <div className="space-y-2">
                      <FieldLabel>Timing</FieldLabel>
                      <SelectNative value={deadline} onChange={(e) => setDeadline(e.target.value)} options={deadlineOptions} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <FieldLabel>What needs inspecting?</FieldLabel>
                    <TextArea
                      value={scope}
                      onChange={(e) => setScope(e.target.value)}
                      placeholder="Example: commercial flat roof, suspected leak near skylights, need marked-up images and a quick report for contractor."
                      required
                    />
                  </div>

                  <Button type="submit">Submit Enquiry</Button>
                </form>
              </div>

              <div className="space-y-5">
                <DarkPanel className="p-6">
                  <div className="flex items-center gap-4">
                    <Image
                      src="/brand/quadrelliot-q.png"
                      alt="Quadrelliot"
                      width={56}
                      height={56}
                      className="rounded-xl bg-white p-2"
                    />
                    <div>
                      <div className="text-sm text-orange-300">Direct contact</div>
                      <div className="font-semibold">{EMAIL}</div>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-white/10 pt-5 text-sm leading-6 text-slate-300">
                    Based in Hampshire. Commercial drone inspections, fast reporting and clear visual deliverables.
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