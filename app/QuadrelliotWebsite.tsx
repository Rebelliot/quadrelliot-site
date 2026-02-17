"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, ChevronRight, Shield, FileText, Camera, Building2, Phone, Scale } from "lucide-react";

const Container = ({ children }) => (
  <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>
);

export default function QuadrelliotWebsite() {
  const [route, setRoute] = useState("home");
  const [service, setService] = useState("inspection");

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
};


  const current = SERVICES[service];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b">
        <Container>
          <div className="flex items-center justify-between py-4">
            <div>
              <div className="text-xl font-semibold">Quadrelliot</div>
              <div className="text-sm text-muted-foreground">Precision Drone Operations · UK</div>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" onClick={() => setRoute("services")}>Services</Button>
              <Button variant="secondary" onClick={() => setRoute("compliance")}>Compliance</Button>
              <Button onClick={() => setRoute("contact")}>Request Proposal</Button>
            </div>
          </div>
        </Container>
      </div>

      {/* Home */}
      {route === "home" && (
        <Container>
          <div className="grid gap-12 py-16 md:grid-cols-2">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-4xl font-semibold leading-tight">
                Enterprise-standard drone operations.
              </h1>
              <p className="mt-4 text-muted-foreground">
                Inspection-led aerial services with disciplined planning, structured reporting and regulatory compliance.
              </p>
              <div className="mt-6 flex gap-3">
                <Button onClick={() => setRoute("services")}>
                  View Services <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="secondary" onClick={() => setRoute("contact")}>
                  Submit Requirements
                </Button>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <Badge variant="outline">Licensed</Badge>
                <Badge variant="outline">Insured</Badge>
                <Badge variant="outline">Method Statement Included</Badge>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Core Capability</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <Building2 className="mt-0.5 h-4 w-4" /> Structured Asset Inspection
                  </div>
                  <div className="flex items-start gap-2">
                    <Camera className="mt-0.5 h-4 w-4" /> Professional Aerial Capture
                  </div>
                  <div className="flex items-start gap-2">
                    <FileText className="mt-0.5 h-4 w-4" /> Audit-Friendly Reporting
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </Container>
      )}

      {/* Services */}
      {route === "services" && (
        <Container>
          <div className="py-16">
            <h2 className="text-3xl font-semibold">Services</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-[300px_1fr]">
              <Card>
                <CardHeader><CardTitle>Select Service</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                  {Object.keys(SERVICES).map((key) => (
                    <button
                      key={key}
                      onClick={() => setService(key)}
                      className={`w-full rounded-xl border p-3 text-left transition ${
                        service === key ? "bg-foreground text-background" : "hover:bg-foreground/5"
                      }`}
                    >
                      {SERVICES[key].title}
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
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {current.bullets.map((b) => (
                      <li key={b} className="flex gap-2">
                        <Check className="mt-0.5 h-4 w-4" /> {b}
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

      {/* Compliance Page */}
      {route === "compliance" && (
        <Container>
          <div className="py-16">
            <h2 className="text-3xl font-semibold">Compliance & Governance</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Shield className="h-4 w-4" /> Regulatory</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <div>UK Civil Aviation Authority compliant operations</div>
                  <div>Operational risk assessment conducted per project</div>
                  <div>Pre-flight airspace and site checks</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Scale className="h-4 w-4" /> Insurance</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <div>Public Liability Insurance</div>
                  <div>Documentation available upon request</div>
                  <div>Method statement and RAMS provided</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><FileText className="h-4 w-4" /> Data Handling</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <div>Secure file delivery</div>
                  <div>Structured file naming</div>
                  <div>Client confidentiality respected</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      )}

      {/* Structured Proposal Form */}
      {route === "contact" && (
        <Container>
          <div className="py-16 grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-semibold">Submit Project Requirements</h2>
              <p className="mt-2 text-muted-foreground">
                Provide structured scope details for formal quotation.
              </p>
              <div className="mt-6 space-y-4">
                <Input placeholder="Company Name" />
                <Input placeholder="Contact Name" />
                <Input placeholder="Email Address" />
                <Input placeholder="Project Location / Postcode" />
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select Service" /></SelectTrigger>
                  <SelectContent>
                    {Object.keys(SERVICES).map((key) => (
                      <SelectItem key={key} value={key}>{SERVICES[key].title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Estimated Project Duration" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="halfday">Half Day</SelectItem>
                    <SelectItem value="fullday">Full Day</SelectItem>
                    <SelectItem value="multi">Multi-Day</SelectItem>
                  </SelectContent>
                </Select>
                <Textarea placeholder="Scope of work, deliverables required, deadline, site constraints" />
                <Button className="w-full">Submit Formal Enquiry</Button>
              </div>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Direct Contact</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-3">
                <div className="flex items-start gap-2"><Phone className="mt-0.5 h-4 w-4" /> quadrelliot@gmail.com</div>
                <div className="flex items-start gap-2"><Shield className="mt-0.5 h-4 w-4" /> Fully compliant UK drone operations</div>
              </CardContent>
            </Card>
          </div>
        </Container>
      )}

      {/* Footer */}
      <div className="border-t">
        <Container>
          <div className="py-6 text-sm text-muted-foreground">
            © {new Date().getFullYear()} Quadrelliot · Precision Drone Operations · United Kingdom
          </div>
        </Container>
      </div>
    </div>
  );
}
