import { NextResponse } from "next/server";
import { Resend } from "resend";

const CONTACT_EMAIL = "quadrelliot@gmail.com";

const SERVICES = {
  inspection: "Commercial Roof Inspection",
  asset: "Asset Inspection",
  progress: "Construction Progress",
} as const;

const DEADLINES = {
  asap: "As soon as possible",
  week: "This week",
  month: "This month",
  planned: "Planned / recurring work",
} as const;

type ServiceKey = keyof typeof SERVICES;
type DeadlineKey = keyof typeof DEADLINES;

function readString(value: unknown, maximumLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maximumLength) : "";
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

  const company = readString(payload.company, 200);
  const name = readString(payload.name, 200);
  const email = readString(payload.email, 254);
  const phone = readString(payload.phone, 100);
  const postcode = readString(payload.postcode, 200);
  const service = readString(payload.service, 50);
  const deadline = readString(payload.deadline, 50);
  const scope = readString(payload.scope, 5000);

  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const serviceIsValid = service in SERVICES;
  const deadlineIsValid = deadline in DEADLINES;

  if (!emailIsValid || !scope || !serviceIsValid || !deadlineIsValid) {
    return NextResponse.json(
      { success: false, error: "Please complete the required enquiry details and try again." },
      { status: 400 }
    );
  }

  const serviceLabel = SERVICES[service as ServiceKey];
  const deadlineLabel = DEADLINES[deadline as DeadlineKey];
  const resend = new Resend(apiKey);

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: "Quadrelliot - Inspection Enquiry",
      text: [
        "Company: " + (company || "-"),
        "Name: " + (name || "-"),
        "Email: " + email,
        "Phone: " + (phone || "-"),
        "Location/Postcode: " + (postcode || "-"),
        "Service: " + serviceLabel,
        "Timing: " + deadlineLabel,
        "",
        "What needs inspecting / reporting:",
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
