"use client";

import React, { useMemo, useState } from "react";

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
  props: React.SelectHTMLAttributes<HTMLSelectElement> & { options: { value: string; label: string }[] }
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

export default function QuadrelliotWebsite() {
  const [route, setRoute] = useState<Route>("home");
  const [service, setService] = useState<ServiceKey>("inspection");

  // Contact form state (customer-provided)
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(""); // optional
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

    // Minimal, reliable: open user's mail client with prefilled details.
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

  return (
    <div className="min-h-screen bg-black text-zinc-100">
      {/* Header */}
      <div className="border-b border-white/10">
        <Container>
          <div className="flex items-center justify-between py-5">
            <div className="leading-tight">
              <div className="text-xl font-semibold">Quadrelliot</div>
              <div className="text-sm text-zinc-400">Precision Drone Operations · UK</div>
            </div>

            <nav className="hidden items-center gap-2 md:flex">
              <Button variant="secondary" onClick={() => setRoute("services")}>
                Services
              </Button>
              <Button variant="secondary" onClick={() => setRoute("compliance")}>
                Compliance
              </Button>
              <Button onClick={() => setRoute("contact")}>Request Proposal</Button>
            </nav>

            <div className="flex gap-2 md:hidden">
              <Button variant="secondary" onClick={() => setRoute("services")}>
                Services
              </Button>
              <Button onClick={() => setRoute("contact")}>Enquire</Button>
            </div>
          </div>
        </Container>
      </div>

      {/* Home */}
      {route === "home" && (
        <Container>
          <div className="grid gap-10 py-16 md:grid-cols-2">
            <div>
              <h1 className="text-4xl font-semibold leading-tight">
                Enterprise-standard drone operations.
              </h1>
              <p className="mt-4 max-w-xl text-zinc-400">
                Inspection-led aerial services with disciplined planning, structured reporting and regulatory compliance.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Button onClick={() => setRoute("services")}>View Services</Button>
                <Button variant="secondary" onClick={() => setRoute("contact")}>
                  Submit Requirements
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
            </div>

            <Card>
              <CardHeader title="Core Capability" desc="Built for inspection, reporting and repeatability." />
              <CardBody>
                <div className="space-y-3 text-sm text-zinc-300">
                  <div className="flex gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-white/40" />
                    <div>Structured Asset Inspection</div>
                  </div>
                  <div className="flex gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-white/40" />
                    <div>Professional Aerial Capture</div>
                  </div>
                  <div className="flex gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-white/40" />
                    <div>Audit-friendly deliverables</div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </Container>
      )}

      {/* Services */}
      {route === "services" && (
        <Container>
          <div className="py-16">
            <div className="flex items-end justify-between gap-6">
              <div>
                <h2 className="text-3xl font-semibold">Services</h2>
                <p className="mt-2 text-zinc-400">Pick a service. Get the shape of the deliverable.</p>
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

                  <div className="mt-7 flex gap-3">
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
                    placeholder="Phone number (optional)"
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
              <CardHeader title="Direct Contact" desc="If you prefer email first." />
              <CardBody>
                <div className="space-y-3 text-sm text-zinc-300">
                  <div>
                    <div className="text-zinc-400">Email</div>
                    <div className="font-medium text-zinc-100">quadrelliot@gmail.com</div>
                  </div>
                  <div className="border-t border-white/10 pt-4">
                    <div className="text-zinc-400">Notes</div>
                    <div className="mt-1">CAA-compliant operations. Risk assessment per site. Insured.</div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </Container>
      )}

      {/* Footer */}
      <div className="border-t border-white/10">
        <Container>
          <div className="py-8 text-sm text-zinc-500">
            © {new Date().getFullYear()} Quadrelliot · Precision Drone Operations · United Kingdom
          </div>
        </Container>
      </div>
    </div>
  );
}