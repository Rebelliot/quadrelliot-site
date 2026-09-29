import type { Metadata } from "next";
import Image from "next/image";
import { ArrowDownToLine, ArrowUp, Check, FileText } from "lucide-react";

import { EnquiryForm } from "@/components/enquiry-form";
import { Container, LinkButton, SiteFooter, SiteHeader } from "@/components/site-chrome";
import { buttonClasses } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Commercial Drone Inspections | Quadrelliot" },
  description:
    "Commercial drone roof and building inspections with clear aerial imagery, marked-up findings and fast reporting across Hampshire and surrounding counties.",
  alternates: {
    canonical: "https://quadrelliot.co.uk/commercial",
  },
  openGraph: {
    title: "Commercial Drone Inspections | Quadrelliot",
    description:
      "Commercial roof and building inspections with clear aerial imagery, marked-up findings and fast reporting.",
    url: "https://quadrelliot.co.uk/commercial",
    siteName: "Quadrelliot",
    type: "website",
    images: [
      {
        url: "/images/commercial/operator-drone-inspection.jpg",
        width: 1117,
        height: 827,
        alt: "Quadrelliot drone operator carrying out an on-site inspection",
      },
    ],
  },
};

const inspectionAreas = [
  "Roof coverings and flat roofs",
  "Gutters, drainage and flashing",
  "Rooflights, chimneys, stacks and flues",
  "Facades, external elevations and cladding",
  "Storm damage and visible deterioration",
  "Difficult-to-access areas and post-repair checks",
];

const deliverables = [
  "High-resolution aerial imagery",
  "Organised visual evidence",
  "Visible defects and concern areas identified",
  "Marked-up imagery where useful",
  "A concise inspection report",
  "Recommended next steps where appropriate",
];

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className={`text-xs font-bold uppercase tracking-[0.18em] ${light ? "text-orange-300" : "text-orange-600"}`}>
      {children}
    </div>
  );
}

export default function CommercialPage() {
  return (
    <div className="min-h-screen bg-[#f6f3ee] text-slate-950">
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden border-b border-slate-200 bg-[#f6f3ee]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.035)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_95%)]" />
          <Container>
            <div className="relative grid gap-8 py-9 lg:grid-cols-[0.84fr_1.16fr] lg:items-start lg:gap-10 lg:py-12 xl:gap-14">
              <div className="lg:sticky lg:top-28 lg:pt-5">
                <Eyebrow>Commercial drone inspections</Eyebrow>
                <h1 className="mt-4 max-w-3xl text-5xl font-bold leading-[0.98] tracking-tight text-slate-950 sm:text-6xl lg:text-5xl xl:text-6xl">
                  Industrial &amp; commercial drone inspections
                </h1>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700">
                  High-resolution visual inspections for commercial roofs, buildings and external assets, with clear aerial evidence, marked-up findings and fast reporting.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-3 border-y border-slate-300 py-4 text-sm font-semibold text-slate-700">
                  <span>CAA-compliant operations</span>
                  <span>Insured</span>
                  <span>RAMS available</span>
                  <span>Fast reporting</span>
                </div>

                <div className="mt-6 hidden lg:block">
                  <a href="#sample-report" className={buttonClasses("secondary")}>
                    View sample report
                  </a>
                </div>
              </div>

              <div id="enquiry" className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_22px_65px_rgba(15,23,42,0.14)] sm:p-7 lg:p-8">
                <div className="mb-5 flex flex-col gap-3 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-[0.16em] text-orange-600">Commercial enquiry</div>
                    <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">Request an inspection</h2>
                  </div>
                  <div className="inline-flex w-fit rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600">
                    Commercial inspection selected
                  </div>
                </div>
                <EnquiryForm
                  fixedService="industrial-commercial"
                  includeCompany
                  idPrefix="commercial"
                  compact
                  showWhatsApp={false}
                />
                <p className="mt-4 text-xs leading-5 text-slate-500">
                  Send the site details and what needs checking. Quadrelliot will review the scope and provide a clear quote and next steps.
                </p>
              </div>

              <div className="lg:hidden">
                <a href="#sample-report" className={`${buttonClasses("secondary")} w-full`}>
                  View sample report
                </a>
              </div>
            </div>
          </Container>
        </section>

        <section id="sample-report" className="scroll-mt-24 overflow-hidden bg-white">
          <Container>
            <div className="grid gap-10 py-14 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:gap-16 lg:py-20">
              <div>
                <Eyebrow>Sample report</Eyebrow>
                <h2 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">See exactly what you receive</h2>
                <p className="mt-5 text-lg leading-8 text-slate-700">
                  A clear visual report designed to make the findings easy to understand, share and act on.
                </p>
                <p className="mt-5 text-sm leading-6 text-slate-600">
                  This five-page example shows the reporting format, including site information, overview imagery, scope and condition, defect severity, recommended actions, detailed observations, photographs, limitations and next steps.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <LinkButton href="/reports/quadrelliot-roof-report-example.pdf" target="_blank" variant="dark">
                    <FileText className="mr-2 h-4 w-4" aria-hidden="true" /> View sample report
                  </LinkButton>
                  <LinkButton href="/reports/quadrelliot-roof-report-example.pdf" download="Quadrelliot_Roof-Report_EXAMPLE.pdf">
                    <ArrowDownToLine className="mr-2 h-4 w-4" aria-hidden="true" /> Download sample report
                  </LinkButton>
                </div>
                <p className="mt-4 text-xs leading-5 text-slate-500">
                  Example reporting format only. The property shown is not presented as a commercial client or case study.
                </p>
              </div>

              <div className="relative mx-auto w-full max-w-3xl pb-8 sm:pb-12">
                <div className="absolute -right-20 top-10 h-72 w-72 rounded-full bg-orange-500/15 blur-3xl" />
                <div className="relative grid grid-cols-[1fr_0.78fr] items-end gap-3 sm:gap-5">
                  <a
                    href="/reports/quadrelliot-roof-report-example.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.16)] transition hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-orange-500/40"
                    aria-label="Open the sample report"
                  >
                    <Image src="/images/commercial/report-preview-cover.png" alt="First page of the Quadrelliot example aerial roof inspection report" width={910} height={1287} sizes="(min-width: 1024px) 370px, 58vw" className="h-auto w-full" />
                  </a>
                  <a
                    href="/reports/quadrelliot-roof-report-example.pdf#page=2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative -mb-7 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.14)] transition hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-orange-500/40 sm:-mb-10"
                    aria-label="Open the detailed findings page in the sample report"
                  >
                    <Image src="/images/commercial/report-preview-findings.png" alt="Detailed defect findings page from the Quadrelliot example roof inspection report" width={910} height={1287} sizes="(min-width: 1024px) 290px, 42vw" className="h-auto w-full" />
                  </a>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="border-y border-slate-200 bg-[#f6f3ee]">
          <Container>
            <div className="grid gap-8 py-14 lg:grid-cols-[1fr_0.92fr] lg:gap-14 lg:py-20">
              <div>
                <Eyebrow>Inspection scope</Eyebrow>
                <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">What we inspect</h2>
                <p className="mt-4 max-w-2xl leading-7 text-slate-600">
                  Visible external condition across commercial roofs, buildings and assets, documented from the drone&apos;s safe operating position.
                </p>
                <div className="mt-7 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                  {inspectionAreas.map((item) => (
                    <div key={item} className="flex gap-3 border-t border-slate-300 pt-4 text-sm font-semibold text-slate-800">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-orange-600" aria-hidden="true" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-7 rounded-xl border border-slate-300 bg-white p-4 text-sm leading-6 text-slate-600">
                  This is a non-intrusive visual inspection, not a structural survey, moisture test or invasive investigation. Some defects may still require close physical investigation by a suitable contractor.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-950 p-6 text-white shadow-sm sm:p-8">
                <Eyebrow light>What you receive</Eyebrow>
                <h2 className="mt-3 text-3xl font-bold tracking-tight">Evidence ready to review and share</h2>
                <div className="mt-6 divide-y divide-white/15 border-y border-white/15">
                  {deliverables.map((item) => (
                    <div key={item} className="flex min-h-14 items-center gap-3 py-3 text-sm font-semibold">
                      <Check className="h-4 w-4 shrink-0 text-orange-300" aria-hidden="true" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-5 text-sm leading-6 text-slate-300">
                  Where a report is included, the existing Quadrelliot service promise is delivery within an hour of the flight taking place.
                </p>
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-white">
          <Container>
            <div className="py-14 lg:py-20">
              <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
                <div className="max-w-2xl">
                  <Eyebrow>Real-site operation</Eyebrow>
                  <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Built for work on real sites</h2>
                  <p className="mt-4 leading-7 text-slate-600">Professional equipment, planned operation and imagery captured for inspection rather than spectacle.</p>
                </div>
                <p className="max-w-sm text-sm leading-6 text-slate-500">Actual Quadrelliot equipment photographed during on-site operation.</p>
              </div>
              <div className="mt-9 grid gap-4 md:grid-cols-[1.15fr_0.85fr] md:grid-rows-2 md:gap-5">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100 md:row-span-2 md:aspect-auto md:min-h-[560px]">
                  <Image
                    src="/images/commercial/operator-drone-inspection.jpg"
                    alt="Quadrelliot operator in high-visibility clothing and a hard hat flying a drone on site"
                    fill
                    sizes="(min-width: 1280px) 620px, (min-width: 768px) 56vw, calc(100vw - 2rem)"
                    className="object-cover object-[54%_50%]"
                  />
                </div>
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-slate-100">
                  <Image
                    src="/images/commercial/drone-in-flight.jpg"
                    alt="Quadrelliot inspection drone in flight beside site access equipment"
                    fill
                    sizes="(min-width: 1280px) 455px, (min-width: 768px) 40vw, calc(100vw - 2rem)"
                    className="object-cover object-center"
                  />
                </div>
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-slate-100">
                  <Image
                    src="/images/commercial/drone-inspection-closeup.jpg"
                    alt="Close view of the camera system on a Quadrelliot inspection drone"
                    fill
                    sizes="(min-width: 1280px) 455px, (min-width: 768px) 40vw, calc(100vw - 2rem)"
                    className="object-cover object-[58%_50%]"
                  />
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-slate-950 text-white">
          <Container>
            <div className="py-14 lg:py-20">
              <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
                <div>
                  <Eyebrow light>Commercial pricing</Eyebrow>
                  <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Industrial &amp; commercial inspections from £195</h2>
                  <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
                    Larger or more complex sites are quoted individually based on the property, site conditions, access requirements and inspection scope. You receive a clear quote before work begins.
                  </p>
                </div>
                <a href="#enquiry" className={`${buttonClasses("primary")} w-full gap-2 lg:w-auto`}>
                  Return to enquiry form <ArrowUp className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>

              <div className="mt-10 grid gap-5 border-t border-white/15 pt-8 md:grid-cols-3">
                {[
                  ["1. Send the site details", "Tell us what needs checking and any known access constraints or hazards."],
                  ["2. Inspection planned", "The flight is planned around the site, operating environment and required imagery."],
                  ["3. Receive the evidence", "Imagery and, where included, a clear report ready to review or share."],
                ].map(([title, text]) => (
                  <div key={title}>
                    <h3 className="font-bold text-white">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 grid gap-5 rounded-2xl bg-orange-500 p-6 text-slate-950 sm:p-8 md:grid-cols-[1fr_auto] md:items-center">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">Need a commercial property inspected?</h2>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-900/80">Send the requirements now and Quadrelliot will provide a clear quote and next steps.</p>
                </div>
                <a href="#enquiry" className={buttonClasses("dark")}>Go to enquiry form</a>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
