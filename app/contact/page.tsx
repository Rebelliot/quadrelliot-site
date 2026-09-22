import type { Metadata } from "next";

import QuadrelliotWebsite from "../QuadrelliotWebsite";

export const metadata: Metadata = {
title: { absolute: "Request a Drone Inspection Quote | Quadrelliot" },
description:
"Request a residential or commercial drone roof or asset inspection from Quadrelliot. Contact by form, phone, text or WhatsApp.",
alternates: {
canonical: "https://quadrelliot.co.uk/contact",
},
openGraph: {
title: "Request a Drone Inspection Quote | Quadrelliot",
description:
"Request a residential or commercial drone roof or asset inspection with clear visual evidence and fast reporting.",
url: "https://quadrelliot.co.uk/contact",
siteName: "Quadrelliot",
type: "website",
},
};

export default async function ContactPage({
searchParams,
}: {
searchParams: Promise<{ service?: string | string[] }>;
}) {
const params = await searchParams;
const service = typeof params.service === "string" ? params.service : "";

return <QuadrelliotWebsite initialRoute="contact" initialService={service} />;
}
