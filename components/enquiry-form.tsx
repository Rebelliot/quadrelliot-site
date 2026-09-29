"use client";

import { useRef, useState } from "react";

import {
  ENQUIRY_SERVICE_OPTIONS,
  isEnquiryServiceKey,
  PREFERRED_CONTACT_OPTIONS,
  type EnquiryServiceKey,
  type PreferredContactMethod,
} from "@/lib/enquiry";
import { LinkButton, SiteButton, WHATSAPP_LINK } from "@/components/site-chrome";

declare global {
  interface Window {
    gtag?: (
      command: "event",
      eventName: "conversion",
      parameters: { send_to: string }
    ) => void;
  }
}

function FieldLabel({ children, htmlFor }: { children: React.ReactNode; htmlFor: string }) {
  return <label htmlFor={htmlFor} className="text-sm font-medium text-slate-700">{children}</label>;
}

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-slate-950 outline-none placeholder:text-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
    />
  );
}

function TextArea({ className = "", ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`min-h-[130px] w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none placeholder:text-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 ${className}`.trim()}
    />
  );
}

function SelectNative({
  options,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { options: { value: string; label: string }[] }) {
  return (
    <select
      {...props}
      className="h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-slate-950 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
    >
      {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
    </select>
  );
}

export function EnquiryForm({
  initialService = "",
  includeCompany = false,
  idPrefix = "enquiry",
  fixedService,
  compact = false,
  showWhatsApp = true,
}: {
  initialService?: string;
  includeCompany?: boolean;
  idPrefix?: string;
  fixedService?: EnquiryServiceKey;
  compact?: boolean;
  showWhatsApp?: boolean;
}) {
  const [service, setService] = useState<EnquiryServiceKey | "">(
    fixedService ?? (isEnquiryServiceKey(initialService) ? initialService : "")
  );
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [postcode, setPostcode] = useState("");
  const [preferredContact, setPreferredContact] = useState<PreferredContactMethod | "">("");
  const [scope, setScope] = useState("");
  const [submissionState, setSubmissionState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [submissionError, setSubmissionError] = useState("");
  const submissionInProgress = useRef(false);
  const fieldId = (name: string) => `${idPrefix}-${name}`;

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
        body: JSON.stringify({ company, name, email, phone, postcode, service, preferredContact, scope }),
      });
      const result = (await response.json().catch(() => null)) as { success?: boolean; error?: string } | null;

      if (!response.ok || !result?.success) {
        throw new Error(result?.error || "Your enquiry could not be sent. Please try again.");
      }

      setSubmissionState("success");

      try {
        if (typeof window.gtag === "function") {
          window.gtag("event", "conversion", { send_to: "AW-18243911087/RRriCO-KnugcEK_7r_tD" });
        }
      } catch {
        // Tracking must never change the successful form outcome.
      }
    } catch (error) {
      setSubmissionState("error");
      setSubmissionError(error instanceof Error ? error.message : "Your enquiry could not be sent. Please try again.");
    } finally {
      submissionInProgress.current = false;
    }
  }

  return (
    <form onSubmit={submitEnquiry} className={compact ? "space-y-3" : "space-y-4"}>
      {!fixedService ? <div className="space-y-2">
        <FieldLabel htmlFor={fieldId("service")}>What are you interested in?</FieldLabel>
        <SelectNative
          id={fieldId("service")}
          value={service}
          onChange={(event) => setService(event.target.value as EnquiryServiceKey | "")}
          options={[{ value: "", label: "Choose a service" }, ...ENQUIRY_SERVICE_OPTIONS]}
          required
        />
      </div> : null}

      {includeCompany ? (
        <div className="space-y-2">
          <FieldLabel htmlFor={fieldId("company")}>Company / organisation <span className="font-normal text-slate-500">(optional)</span></FieldLabel>
          <TextInput
            id={fieldId("company")}
            value={company}
            onChange={(event) => setCompany(event.target.value)}
            placeholder="Company or organisation"
            autoComplete="organization"
            maxLength={200}
          />
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <FieldLabel htmlFor={fieldId("name")}>Name</FieldLabel>
          <TextInput id={fieldId("name")} value={name} onChange={(event) => setName(event.target.value)} placeholder="Full name" autoComplete="name" maxLength={200} required />
        </div>
        <div className="space-y-2">
          <FieldLabel htmlFor={fieldId("email")}>Email address</FieldLabel>
          <TextInput id={fieldId("email")} value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@example.com" type="email" autoComplete="email" maxLength={254} required />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <FieldLabel htmlFor={fieldId("phone")}>Phone number</FieldLabel>
          <TextInput id={fieldId("phone")} value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="Your phone number" type="tel" inputMode="tel" autoComplete="tel" maxLength={100} required />
        </div>
        <div className="space-y-2">
          <FieldLabel htmlFor={fieldId("postcode")}>Property / site postcode or address</FieldLabel>
          <TextInput id={fieldId("postcode")} value={postcode} onChange={(event) => setPostcode(event.target.value)} placeholder="Address or postcode" autoComplete="street-address" maxLength={500} required />
        </div>
      </div>

      <div className="space-y-2">
        <FieldLabel htmlFor={fieldId("preferred-contact")}>Preferred contact method</FieldLabel>
        <SelectNative
          id={fieldId("preferred-contact")}
          value={preferredContact}
          onChange={(event) => setPreferredContact(event.target.value as PreferredContactMethod | "")}
          options={[{ value: "", label: "Choose how you would like a reply" }, ...PREFERRED_CONTACT_OPTIONS]}
          required
        />
      </div>

      <div className="space-y-2">
        <FieldLabel htmlFor={fieldId("scope")}>Details / what needs inspecting</FieldLabel>
        <TextArea
          id={fieldId("scope")}
          value={scope}
          onChange={(event) => setScope(event.target.value)}
          placeholder="Tell me what you would like checked, including any known issues, access constraints or hazards."
          maxLength={5000}
          className={compact ? "min-h-[96px]" : ""}
          style={compact ? { minHeight: 96 } : undefined}
          required
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <SiteButton type="submit" disabled={submissionState === "submitting"}>
          {submissionState === "submitting" ? "Sending…" : "Request an inspection"}
        </SiteButton>
        {showWhatsApp ? <LinkButton href={WHATSAPP_LINK} target="_blank">Text / WhatsApp instead</LinkButton> : null}
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
  );
}
