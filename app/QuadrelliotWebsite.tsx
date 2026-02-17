"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";

type Route = "home" | "services" | "compliance" | "contact";

const Container = ({ children }: { children: React.ReactNode }) => (
  <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>
);

const SERVICES = {
  inspection: {
    title: "Roof & Asset Inspection",
    desc: "High-resolution aerial inspection with structured reporting.",
    bullets: [
      "Detailed stills of roofs, façades and assets",
      "Annotated defect identification",
      "Client-ready PDF report",
      "Thermal capability launching soon",
    ],
  },
  documentation: {
    title: "Site Documentation",
    desc: "Visual progress records for construction and property projects.",
    bullets: [
      "Scheduled progress capture",
      "Consistent vantage points",
      "Secure digital delivery",
      "Clear file labelling for project teams",
    ],
  },
  cinematography: {
    title: "Aerial Cinematography",
    desc: "Professional aerial capture for corporate and branded content.",
    bullets: [
      "Stabilised 4K aerial video",
      "High-resolution still imagery",
      "Pre-flight planning and location checks",
      "Clear usage licensing",
    ],
  },
} as const;

type ServiceKey = keyof typeof SERVICES;

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <div className="text-sm text-zinc-400">{children}</div>;
}

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={[
        "h-11 w-full rounded-xl border border-white/15 bg-black/20 px-4 text-zinc-100",
        "placeholder:text-zinc-500 outline-none",
        "focus:border-white/30 focus:ring-2 focus:ring-white/10",
      ].join(" ")}
    />
  );
}

function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={[
        "min-h-[120px] w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-zinc-100",
        "placeholder:text-zinc-500 outline-none",
        "focus:border-white/30 focus:ring-2 focus:ring-white/10",
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
        "h-11 w-full rounded-xl border border-white/15 bg-black/20 px-4 text-zinc-100",
        "outline-none",
        "focus:border-white/30 focus:ring-2 focus:ring-white/10",
      ].join(" ")}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value} className="bg-black">
          {o.label}
        </option>
      ))}
    </select>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl border border-white/12 bg-black/30">{children}</div>;
}

function CardHeader({ title, desc }: { title: string; desc?: string }) {
  return (
    <div className="border-b border-white/10 p-6">
      <div className="text-lg font-semibold text-zinc-100">{title}</div>
      {desc ? <div className="mt-1 text-sm text-zinc-400">{desc}</div> : null}
    </div>
  );
}

function CardBody({ children }: { children: React.ReactNode }) {
  return <div className="p-6">{children}</div>;
}

function Button({
  children,
  variant = "primary",
  onClick,
  type = "button",
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const base =
    "inline-flex h-11 items-center justify-center rounded-xl px-5 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-white/10";
  const styles =
    variant === "primary"
      ? "bg-white text-black hover:bg-zinc-200"
      : "border border-white/15 bg-transparent text-zinc-100 hover:bg-white/5";
  return (
    <button type={type} onClick={onClick} className={`${base} ${styles}`}>
      {children}
    </button>
  );
}

function Header({
  route,
  setRoute,
}: {
  route: Route;
  setRoute: React.Dispatch<React.SetStateAction<Route>>;
}) {
  const navBtn = (r: Route, label: string, variant: "primary" | "secondary" = "secondary") => (
    <Button variant={variant} onClick={() => setRoute(r)}>
      {label}
    </Button>
  );

  return (
    <div className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur">
      <Container>
        <div className="flex items-center justify-between py-5">
          <button
            onClick={() => setRoute("home")}
            className="group flex items-center gap-3 text-left"
            aria-label="Go to home"
          >
            <Image
              src="/brand/quadrelliot-q.png"
              alt="Quadrelliot"
              width={30}
              height={30}
              className="opacity-90 transition group-hover:opacity-100"
              priority
            />
            <div className="leading-tight">
              <div className="text-lg font-semibold tracking-wide">Quadrelliot</div>
              <div className="text-xs text-zinc-500">Precision Drone Operations · UK</div>
            </div>
          </button>

          <nav className="hidden items-center gap-2 md:flex">
            {navBtn("services", "Services")}
            {navBtn("compliance", "Compliance")}
            {navBtn("contact", "Request Proposal", "primary")}
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            {navBtn("services", "Services")}
            {navBtn("contact", "Enquire", "primary")}
          </div>
        </div>
      </Container>

      <div className="border-t border-white/5">
        <Container>
          <div className="flex items-center justify-between py-2 text-xs text-zinc-600">
            <div className="capitalize">{route}</div>
            <div className="hidden sm:block">quadrelliot.co.uk</div>
          </div>
        </Container>
      </div>
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
  const [duration, setDuration] = useState("halfday");
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

  const durationOptions = useMemo(
    () => [
      { value: "halfday", label: "Half Day" },
      { value: "fullday", label: "Full Day" },
      { value: "multi", label: "Multi-Day" },
    ],
    []
  );

  function submitEnquiry(e: React.FormEvent) {
    e.preventDefault();

    const subject = encodeURIComponent("Quadrelliot — Project Enquiry");
    const body = encodeURIComponent(
      [
        `Company: ${company}`,
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone (optional): ${phone || "-"}`,
        `Location/Postcode: ${postcode}`,
        `Service: ${SERVICES[serviceWanted].title}`,
        `Duration: ${durationOptions.find((d) => d.value === duration)?.label ?? duration}`,
        "",
        "Scope / deliverables / deadline / constraints:",
        scope,
      ].join("\n")
    );

    window.location.href = `mailto:quadrelliot@gmail.com?subject=${subject}&body=${body}`;
  }

  function scrollToId(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="min-h-screen bg-black text-zinc-100">
      <Header route={route} setRoute={setRoute} />

      {/* Home */}
      {route === "home" && (
        <div>
          {/* Brand hero slab */}
          <div className="relative overflow-hidden border-b border-white/10">
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-zinc-950" />
            <div className="absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />
            <div className="absolute -bottom-24 left-1/3 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />

            <Container>
              <div className="relative grid gap-10 py-16 md:grid-cols-2 md:items-center">
                <div>
                  <Image
                    src="/brand/quadrelliot-wordmark.png"
                    alt="Quadrelliot"
                    width={900}
                    height={260}
                    className="h-auto w-full max-w-xl opacity-90"
                    priority
                  />

                  <h1 className="mt-8 text-4xl font-semibold leading-tight">
                    Roof & asset inspections with audit-ready reporting.
                  </h1>
                  <p className="mt-4 max-w-xl text-zinc-400">
                    Repeatable capture, clear defect documentation, and client-ready deliverables — built for facilities,
                    construction, and property teams.
                  </p>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <Button onClick={() => setRoute("contact")}>Request Proposal</Button>
                    <Button variant="secondary" onClick={() => scrollToId("example-deliverables")}>
                      See Example Deliverables
                    </Button>
                  </div>

                  <div className="mt-8 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-200">
                      Licensed
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-200">
                      Insured
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-200">
                      RAMS Included
                    </div>
                  </div>

                  {/* trust micro-line */}
                  <div className="mt-3 text-xs text-zinc-500">
                    CAA compliant • UK coverage • 48h reporting (typical) • Secure delivery
                  </div>
                </div>

                <Card>
                  <CardHeader title="What you get" desc="A clean output your team can act on." />
                  <CardBody>
                    <div className="space-y-4 text-sm text-zinc-300">
                      {[
                        {
                          title: "Repeatable capture plan",
                          desc: "Consistent angles and coverage, built for comparison over time.",
                        },
                        {
                          title: "Defect documentation",
                          desc: "Annotated stills with location context and clear references.",
                        },
                        {
                          title: "Audit-ready delivery",
                          desc: "Structured folders, clear naming, and client-ready PDFs.",
                        },
                      ].map((item) => (
                        <div key={item.title} className="flex items-start gap-4">
                          <Image
                            src="/brand/quadrelliot-q.png"
                            alt=""
                            width={28}
                            height={28}
                            className="mt-0.5 h-7 w-7 opacity-70"
                          />
                          <div>
                            <div className="font-medium text-zinc-100">{item.title}</div>
                            <div className="text-zinc-400">{item.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              </div>
            </Container>
          </div>

          {/* HOW IT WORKS */}
          <Container>
            <div className="py-10">
              <Card>
                <CardHeader title="How it works" desc="Simple process. Clean outputs. No drama." />
                <CardBody>
                  <div className="grid gap-4 md:grid-cols-3">
                    {[
                      {
                        title: "1) Scope + permissions",
                        desc: "Confirm site, airspace checks, and access constraints. RAMS provided where required.",
                      },
                      {
                        title: "2) Capture (shot plan)",
                        desc: "Repeatable coverage of roofs, façades and assets — consistent angles for comparison.",
                      },
                      {
                        title: "3) Report delivered",
                        desc: "Defect log + annotated plates + structured folders for your team.",
                      },
                    ].map((s) => (
                      <div key={s.title} className="rounded-xl border border-white/10 bg-white/5 p-4">
                        <div className="text-sm font-semibold text-zinc-100">{s.title}</div>
                        <div className="mt-1 text-sm text-zinc-400">{s.desc}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button onClick={() => setRoute("contact")}>Request Proposal</Button>
                    <Button variant="secondary" onClick={() => setRoute("services")}>
                      View Services
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </div>
          </Container>

          {/* Secondary section */}
          <Container>
            <div className="grid gap-6 py-6 md:grid-cols-3">
              <Card>
                <CardHeader title="Inspection" desc="Evidence you can act on." />
                <CardBody>
                  <div className="text-sm text-zinc-300">
                    High-resolution stills, consistent angles, and structured reporting for property and assets.
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardHeader title="Documentation" desc="Progress without guesswork." />
                <CardBody>
                  <div className="text-sm text-zinc-300">
                    Repeatable site capture for construction and works, delivered cleanly for project teams.
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardHeader title="Cinematography" desc="Select projects (secondary offering)." />
                <CardBody>
                  <div className="text-sm text-zinc-300">
                    Branded aerial capture when it needs to look expensive. Not the core business — but available.
                  </div>
                </CardBody>
              </Card>
            </div>
          </Container>

          {/* DELIVERABLES / PROOF */}
          <div id="example-deliverables" className="border-t border-white/10">
            <Container>
              <div className="py-14">
                <div className="grid gap-6 md:grid-cols-2 md:items-start">
                  <Card>
                    <CardHeader title="Deliverables (what you receive)" desc="Structured. Shareable. Auditable." />
                    <CardBody>
                      <ul className="space-y-2 text-sm text-zinc-300">
                        {[
                          "Annotated photo plates (roof areas / assets clearly referenced)",
                          "Defect log (ID, location, severity, photo ref, suggested action)",
                          "Key overview images for quick triage",
                          "Structured folders + clear filenames",
                          "Client-ready PDF summary",
                        ].map((b) => (
                          <li key={b} className="flex gap-3">
                            <div className="mt-2 h-1.5 w-1.5 rounded-full bg-white/50" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-7 rounded-xl border border-white/10 bg-white/5 p-4">
                        <div className="text-xs text-zinc-500">Tip</div>
                        <div className="mt-1 text-sm text-zinc-300">
                          Add recurring inspections and you’ll get like-for-like comparison across months/quarters.
                        </div>
                      </div>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardHeader
                      title="Ideal clients"
                      desc="Where this saves time, money, or liability."
                    />
                    <CardBody>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {[
                          "Facilities management",
                          "Property / estates",
                          "Roofing contractors",
                          "Construction PMs",
                          "Industrial sites",
                          "Local authorities",
                        ].map((t) => (
                          <div key={t} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-200">
                            {t}
                          </div>
                        ))}
                      </div>

                      <div className="mt-7 flex flex-wrap gap-3">
                        <Button onClick={() => setRoute("contact")}>Request Proposal</Button>
                        <Button variant="secondary" onClick={() => setRoute("compliance")}>
                          Compliance details
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              </div>
            </Container>
          </div>
        </div>
      )}

      {/* Services */}
      {route === "services" && (
        <Container>
          <div className="py-16">
            <div className="flex items-end justify-between gap-6">
              <div>
                <h2 className="text-3xl font-semibold">Services</h2>
                <p className="mt-2 text-zinc-400">Pick a service. See the deliverable shape.</p>
              </div>
              <Button variant="secondary" onClick={() => setRoute("contact")}>
                Request Proposal
              </Button>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-[320px_1fr]">
              <Card>
                <CardHeader title="Select Service" />
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
                              ? "border-white/30 bg-white text-black"
                              : "border-white/10 bg-white/5 hover:bg-white/10",
                          ].join(" ")}
                        >
                          <div className="text-sm font-semibold">{SERVICES[k].title}</div>
                          <div className={active ? "text-xs text-black/70" : "text-xs text-zinc-400"}>
                            {SERVICES[k].desc}
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
                  <ul className="space-y-2 text-sm text-zinc-300">
                    {current.bullets.map((b) => (
                      <li key={b} className="flex gap-3">
                        <div className="mt-2 h-1.5 w-1.5 rounded-full bg-white/50" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <Button
                      onClick={() => {
                        setServiceWanted(service);
                        setRoute("contact");
                      }}
                    >
                      Submit Requirements
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
      )}

      {/* Compliance */}
      {route === "compliance" && (
        <Container>
          <div className="py-16">
            <h2 className="text-3xl font-semibold">Compliance & Governance</h2>
            <p className="mt-2 text-zinc-400">Boring on purpose. Keeps clients happy and lawyers sleepy.</p>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader title="Regulatory" desc="CAA-compliant operations." />
                <CardBody>
                  <div className="space-y-2 text-sm text-zinc-300">
                    <div>Project-specific risk assessment</div>
                    <div>Pre-flight airspace & site checks</div>
                    <div>Operational boundaries enforced</div>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardHeader title="Insurance" desc="Documentation on request." />
                <CardBody>
                  <div className="space-y-2 text-sm text-zinc-300">
                    <div>Public Liability Insurance</div>
                    <div>RAMS provided where required</div>
                    <div>Method statement included</div>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardHeader title="Data Handling" desc="Secure delivery, clean organisation." />
                <CardBody>
                  <div className="space-y-2 text-sm text-zinc-300">
                    <div>Secure file delivery</div>
                    <div>Structured naming & folders</div>
                    <div>Client confidentiality respected</div>
                  </div>
                </CardBody>
              </Card>
            </div>

            <div className="mt-10">
              <Card>
                <CardHeader title="Deliverables & organisation" desc="How files show up in your inbox/folder." />
                <CardBody>
                  <div className="grid gap-4 text-sm text-zinc-300 md:grid-cols-3">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <div className="font-medium text-zinc-100">Naming</div>
                      <div className="mt-1 text-zinc-400">Clear filenames by area/asset/date.</div>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <div className="font-medium text-zinc-100">Structure</div>
                      <div className="mt-1 text-zinc-400">Folders that map to your site or brief.</div>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <div className="font-medium text-zinc-100">Reports</div>
                      <div className="mt-1 text-zinc-400">PDF summaries where inspection requires it.</div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </Container>
      )}

      {/* Contact */}
      {route === "contact" && (
        <Container>
          <div className="grid gap-10 py-16 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-semibold">Submit Project Requirements</h2>
              <p className="mt-2 text-zinc-400">Send scope details. I’ll reply with a proper quote.</p>

              <form onSubmit={submitEnquiry} className="mt-6 space-y-4">
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

                <div className="space-y-2">
                  <FieldLabel>Phone (optional)</FieldLabel>
                  <TextInput
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Your phone number (optional)"
                    inputMode="tel"
                  />
                </div>

                <div className="space-y-2">
                  <FieldLabel>Project location / postcode</FieldLabel>
                  <TextInput value={postcode} onChange={(e) => setPostcode(e.target.value)} placeholder="e.g. SO20..." />
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
                    <FieldLabel>Estimated duration</FieldLabel>
                    <SelectNative value={duration} onChange={(e) => setDuration(e.target.value)} options={durationOptions} />
                  </div>
                </div>

                <div className="space-y-2">
                  <FieldLabel>Scope / deliverables / deadline / constraints</FieldLabel>
                  <TextArea
                    value={scope}
                    onChange={(e) => setScope(e.target.value)}
                    placeholder="What do you need captured, how should it be delivered, by when, and any site constraints."
                    required
                  />
                </div>

                <Button type="submit">Submit Enquiry</Button>
              </form>
            </div>

            <Card>
              <CardHeader title="Direct Contact" />
              <CardBody>
                <div className="flex items-center gap-3">
                  <Image
                    src="/brand/quadrelliot-q.png"
                    alt="Quadrelliot"
                    width={36}
                    height={36}
                    className="h-9 w-9 opacity-90"
                  />
                  <div>
                    <div className="text-xs text-zinc-500">Email</div>
                    <div className="text-sm font-medium text-zinc-100">quadrelliot@gmail.com</div>
                  </div>
                </div>

                <div className="mt-6 border-t border-white/10 pt-4">
                  <div className="text-xs text-zinc-500">Notes</div>
                  <div className="mt-1 text-sm text-zinc-300">
                    CAA-compliant operations. Risk assessment per site. Insured.
                  </div>
                </div>

                <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs text-zinc-500">Tip</div>
                  <div className="mt-1 text-sm text-zinc-300">
                    If you include site access constraints and deadlines, quotes land faster.
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </Container>
      )}

      <div className="border-t border-white/10">
        <Container>
          <div className="flex flex-col gap-4 py-8 md:flex-row md:items-center md:justify-between">
            <div className="text-sm text-zinc-500">
              © {new Date().getFullYear()} Quadrelliot · Precision Drone Operations · United Kingdom
            </div>
            <div className="opacity-70">
              <Image
                src="/brand/quadrelliot-wordmark.png"
                alt="Quadrelliot"
                width={260}
                height={84}
                className="h-auto w-[220px]"
              />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}