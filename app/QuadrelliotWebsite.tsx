"use client";

import React, { useMemo, useState } from "react";

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

type Route = "home" | "services" | "compliance" | "contact";
type ServiceKey = keyof typeof SERVICES;

const DURATIONS = [
  { value: "halfday", label: "Half Day" },
  { value: "fullday", label: "Full Day" },
  { value: "multi", label: "Multi-Day" },
] as const;

function cx(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <div className="text-sm font-medium text-zinc-200">{children}</div>;
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cx(
        "h-11 w-full rounded-xl border border-white/15 bg-black/40 px-4 text-sm text-white placeholder:text-white/40",
        "outline-none focus:border-white/30 focus:ring-2 focus:ring-white/10",
        props.className
      )}
    />
  );
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cx(
        "min-h-[120px] w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/40",
        "outline-none focus:border-white/30 focus:ring-2 focus:ring-white/10",
        props.className
      )}
    />
  );
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cx(
        "h-11 w-full appearance-none rounded-xl border border-white/15 bg-black/40 px-4 text-sm text-white",
        "outline-none focus:border-white/30 focus:ring-2 focus:ring-white/10",
        props.className
      )}
    />
  );
}

function Button({
  children,
  variant = "primary",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
}) {
  return (
    <button
      {...props}
      className={cx(
        "inline-flex h-11 items-center justify-center rounded-xl px-4 text-sm font-medium transition",
        variant === "primary"
          ? "bg-white text-black hover:bg-white/90"
          : "border border-white/15 bg-transparent text-white hover:bg-white/5",
        props.disabled && "cursor-not-allowed opacity-60",
        props.className
      )}
    >
      {children}
    </button>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/12 bg-black/35 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
      {children}
    </div>
  );
}

function CardHeader({ children }: { children: React.ReactNode }) {
  return <div className="border-b border-white/10 px-6 py-5">{children}</div>;
}

function CardTitle({ children }: { children: React.ReactNode }) {
  return <div className="text-base font-semibold text-white">{children}</div>;
}

function CardDescription({ children }: { children: React.ReactNode }) {
  return <div className="mt-1 text-sm text-white/60">{children}</div>;
}

function CardContent({ children }: { children: React.ReactNode }) {
  return <div className="px-6 py-5">{children}</div>;
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80">
      {children}
    </div>
  );
}

export default function QuadrelliotWebsite() {
  const [route, setRoute] = useState<Route>("home");
  const [service, setService] = useState<ServiceKey>("inspection");

  const current = useMemo(() => SERVICES[service], [service]);
  const serviceKeys = useMemo(() => Object.keys(SERVICES) as ServiceKey[], []);

  // Form state (simple + useful)
  const [company, setCompany] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(""); // customer phone (optional)
  const [location, setLocation] = useState("");
  const [serviceChoice, setServiceChoice] = useState<ServiceKey | "">("");
  const [duration, setDuration] = useState<(typeof DURATIONS)[number]["value"] | "">("");
  const [scope, setScope] = useState("");

  function openEmailDraft() {
    const chosenService =
      serviceChoice ? SERVICES[serviceChoice].title : "(not selected)";
    const chosenDuration =
      duration ? DURATIONS.find((d) => d.value === duration)?.label : "(not selected)";

    const bodyLines = [
      "New Quadrelliot enquiry",
      "",
      `Company: ${company || "-"}`,
      `Contact name: ${contactName || "-"}`,
      `Email: ${email || "-"}`,
      `Phone (optional): ${phone || "-"}`,
      `Location / Postcode: ${location || "-"}`,
      `Service: ${chosenService}`,
      `Estimated duration: ${chosenDuration || "(not selected)"}`,
      "",
      "Scope / deliverables / deadlines / constraints:",
      scope || "-",
    ];

    const subject = encodeURIComponent("Quadrelliot — Project Requirements");
    const body = encodeURIComponent(bodyLines.join("\n"));

    // opens user's email client
    window.location.href = `mailto:quadrelliot@gmail.com?subject=${subject}&body=${body}`;
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/40 backdrop-blur">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-3 py-4">
            <div className="min-w-[220px]">
              <div className="text-xl font-semibold tracking-tight">Quadrelliot</div>
              <div className="text-sm text-white/60">Precision Drone Operations · UK</div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" onClick={() => setRoute("home")}>
                Home
              </Button>
              <Button variant="secondary" onClick={() => setRoute("services")}>
                Services
              </Button>
              <Button variant="secondary" onClick={() => setRoute("compliance")}>
                Compliance
              </Button>
              <Button onClick={() => setRoute("contact")}>Request Proposal</Button>
            </div>
          </div>
        </Container>
      </div>

      {/* Home */}
      {route === "home" && (
        <Container>
          <div className="grid gap-10 py-14 md:grid-cols-2">
            <div className="animate-[fadeIn_.35s_ease-out]">
              <h1 className="text-4xl font-semibold leading-tight tracking-tight">
                Enterprise-standard drone operations.
              </h1>
              <p className="mt-4 max-w-xl text-white/65">
                Inspection-led aerial services with disciplined planning, structured reporting
                and regulatory compliance.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button onClick={() => setRoute("services")}>View Services</Button>
                <Button variant="secondary" onClick={() => setRoute("contact")}>
                  Submit Requirements
                </Button>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                <Pill>Licensed</Pill>
                <Pill>Insured</Pill>
                <Pill>Method Statement Included</Pill>
              </div>
            </div>

            <div className="animate-[fadeIn_.35s_ease-out]">
              <Card>
                <CardHeader>
                  <CardTitle>Core Capability</CardTitle>
                  <CardDescription>
                    Practical deliverables. Clean governance. No cowboy flying.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 text-sm text-white/70">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                      Structured asset inspection & defect capture
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                      Professional aerial photo/video capture
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                      Audit-friendly reporting and file delivery
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      )}

      {/* Services */}
      {route === "services" && (
        <Container>
          <div className="py-14 animate-[fadeIn_.25s_ease-out]">
            <h2 className="text-3xl font-semibold tracking-tight">Services</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-[320px_1fr]">
              <Card>
                <CardHeader>
                  <CardTitle>Select Service</CardTitle>
                  <CardDescription>Pick a lane. See exactly what you get.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {serviceKeys.map((key) => (
                    <button
                      key={key}
                      onClick={() => setService(key)}
                      className={cx(
                        "w-full rounded-xl border p-4 text-left transition",
                        "border-white/12 hover:bg-white/5",
                        service === key && "bg-white text-black hover:bg-white/95"
                      )}
                    >
                      <div className="text-sm font-semibold">
                        {SERVICES[key].title}
                      </div>
                      <div
                        className={cx(
                          "mt-1 text-xs",
                          service === key ? "text-black/70" : "text-white/60"
                        )}
                      >
                        {SERVICES[key].desc}
                      </div>
                    </button>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{current.title}</CardTitle>
                  <CardDescription>{current.desc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-white/70">
                    {current.bullets.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span className="mt-[3px] inline-block h-4 w-4 rounded-full border border-white/20 bg-white/5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <Button onClick={() => setRoute("contact")}>Submit Requirements</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      )}

      {/* Compliance */}
      {route === "compliance" && (
        <Container>
          <div className="py-14 animate-[fadeIn_.25s_ease-out]">
            <h2 className="text-3xl font-semibold tracking-tight">Compliance & Governance</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Regulatory</CardTitle>
                  <CardDescription>CAA-compliant operation as standard.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-white/70">
                  <div>Project-by-project operational risk assessment</div>
                  <div>Pre-flight airspace and site checks</div>
                  <div>Clear flight conduct and safe separation</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Insurance</CardTitle>
                  <CardDescription>Documentation available on request.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-white/70">
                  <div>Public Liability Insurance</div>
                  <div>RAMS / method statement provided</div>
                  <div>Client requirements incorporated</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Data Handling</CardTitle>
                  <CardDescription>Less chaos. More traceability.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-white/70">
                  <div>Secure delivery links</div>
                  <div>Structured file naming</div>
                  <div>Confidentiality respected</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      )}

      {/* Contact */}
      {route === "contact" && (
        <Container>
          <div className="grid gap-8 py-14 md:grid-cols-2 animate-[fadeIn_.25s_ease-out]">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">Submit Project Requirements</h2>
              <p className="mt-2 text-white/65">
                Fill this in and it generates a structured enquiry email. Phone is optional and is
                the customer’s number so you can call them back.
              </p>

              <div className="mt-8 space-y-4">
                <div className="space-y-2">
                  <FieldLabel>Company name</FieldLabel>
                  <Input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company Name" />
                </div>

                <div className="space-y-2">
                  <FieldLabel>Contact name</FieldLabel>
                  <Input value={contactName} onChange={(e) => setContactName(e.target.value)} placeholder="Contact Name" />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <FieldLabel>Email</FieldLabel>
                    <Input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email Address"
                      inputMode="email"
                    />
                  </div>

                  <div className="space-y-2">
                    <FieldLabel>Phone (optional)</FieldLabel>
                    <Input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone Number (optional)"
                      inputMode="tel"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <FieldLabel>Project location / postcode</FieldLabel>
                  <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Project Location / Postcode" />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <FieldLabel>Service</FieldLabel>
                    <div className="relative">
                      <Select
                        value={serviceChoice}
                        onChange={(e) => setServiceChoice(e.target.value as ServiceKey)}
                      >
                        <option value="" disabled>
                          Select Service
                        </option>
                        {serviceKeys.map((key) => (
                          <option key={key} value={key}>
                            {SERVICES[key].title}
                          </option>
                        ))}
                      </Select>
                      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/50">
                        ▾
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <FieldLabel>Estimated duration</FieldLabel>
                    <div className="relative">
                      <Select
                        value={duration}
                        onChange={(e) => setDuration(e.target.value as any)}
                      >
                        <option value="" disabled>
                          Select Duration
                        </option>
                        {DURATIONS.map((d) => (
                          <option key={d.value} value={d.value}>
                            {d.label}
                          </option>
                        ))}
                      </Select>
                      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/50">
                        ▾
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <FieldLabel>Scope / deliverables / deadlines / constraints</FieldLabel>
                  <Textarea
                    value={scope}
                    onChange={(e) => setScope(e.target.value)}
                    placeholder="Scope of work, deliverables required, deadline, site constraints"
                  />
                </div>

                <Button
                  className="w-full"
                  onClick={openEmailDraft}
                  disabled={!email && !phone && !contactName && !company && !location && !scope && !serviceChoice}
                  title="Opens your email client with a pre-filled enquiry"
                >
                  Generate Enquiry Email
                </Button>

                <div className="text-xs text-white/45">
                  This doesn’t submit to a server yet — it opens a pre-filled email draft to speed up quotes without building backend.
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Direct Contact</CardTitle>
                <CardDescription>For clients who just want a human.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-white/70">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  Email: <span className="text-white">quadrelliot@gmail.com</span>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  Fully compliant UK drone operations. RAMS / method statement available.
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  Typical turnaround: depends on scope; inspection reporting is usually fastest.
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      )}

      {/* Footer */}
      <div className="border-t border-white/10 bg-black/30">
        <Container>
          <div className="py-6 text-sm text-white/55">
            © {new Date().getFullYear()} Quadrelliot · Precision Drone Operations · United Kingdom
          </div>
        </Container>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
