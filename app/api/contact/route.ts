import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  ENQUIRY_SERVICES,
  isEnquiryServiceKey,
  PREFERRED_CONTACT_METHODS,
  type PreferredContactMethod,
} from "@/lib/enquiry";

const CONTACT_EMAIL = "quadrelliot@gmail.com";

function readString(value: unknown, maximumLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maximumLength) : "";
}

function getPostcodeForSubject(location: string) {
  const upperLocation = location.toUpperCase();
  const fullPostcode = upperLocation.match(/\b([A-Z]{1,2}\d[A-Z\d]?)[ ]?\d[A-Z]{2}\b/);

  if (fullPostcode) return `${fullPostcode[1]} ${fullPostcode[0].slice(-3)}`;

  return upperLocation.match(/\b[A-Z]{1,2}\d[A-Z\d]?\b/)?.[0] ?? "";
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !fromEmail) {
    console.error("Contact form email configuration is missing.");
    return NextResponse.json(
      { success: false, error: "The enquiry service is temporarily unavailable. Please try again later." },
      { status: 503 }
    );
  }

  let payload: Record<string, unknown>;

  try {
    const parsedPayload: unknown = await request.json();

    if (!parsedPayload || typeof parsedPayload !== "object" || Array.isArray(parsedPayload)) {
      throw new Error("Invalid request body");
    }

    payload = parsedPayload as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { success: false, error: "The enquiry could not be read. Please check the form and try again." },
      { status: 400 }
    );
  }

  const name = readString(payload.name, 200);
  const email = readString(payload.email, 254);
  const phone = readString(payload.phone, 100);
  const postcode = readString(payload.postcode, 500);
  const service = readString(payload.service, 100);
  const preferredContact = readString(payload.preferredContact, 20);
  const scope = readString(payload.scope, 5000);

  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const phoneIsValid = /^[+\d][\d\s().-]{6,}$/.test(phone);
  const serviceIsValid = isEnquiryServiceKey(service);
  const preferredContactIsValid = preferredContact in PREFERRED_CONTACT_METHODS;

  if (
    !name ||
    !emailIsValid ||
    !phoneIsValid ||
    !postcode ||
    !scope ||
    !serviceIsValid ||
    !preferredContactIsValid
  ) {
    return NextResponse.json(
      { success: false, error: "Please complete the required enquiry details and try again." },
      { status: 400 }
    );
  }

  const serviceLabel = ENQUIRY_SERVICES[service];
  const preferredContactLabel =
    PREFERRED_CONTACT_METHODS[preferredContact as PreferredContactMethod];
  const submittedAt = new Date();
  const submittedAtLabel = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
    timeStyle: "long",
    timeZone: "Europe/London",
  }).format(submittedAt);
  const subjectPostcode = getPostcodeForSubject(postcode);
  const resend = new Resend(apiKey);

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `New Quadrelliot enquiry — ${serviceLabel.replace(/ — .+$/, "")}${subjectPostcode ? ` — ${subjectPostcode}` : ""}`,
      text: [
        "Service requested: " + serviceLabel,
        "Name: " + name,
        "Email: " + email,
        "Phone: " + phone,
        "Property address/postcode: " + postcode,
        "Preferred contact method: " + preferredContactLabel,
        "Submitted: " + submittedAtLabel,
        "Submitted (UTC): " + submittedAt.toISOString(),
        "",
        "Enquiry details:",
        scope,
      ].join("\n"),
    });

    if (error || !data?.id) {
      console.error("Resend rejected the contact enquiry:", error);
      return NextResponse.json(
        { success: false, error: "Your enquiry could not be sent. Please try again or contact us directly." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact enquiry delivery failed:", error);
    return NextResponse.json(
      { success: false, error: "Your enquiry could not be sent. Please try again or contact us directly." },
      { status: 502 }
    );
  }
}
