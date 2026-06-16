import type { Metadata } from "next";

import QuadrelliotWebsite from "../QuadrelliotWebsite";

export const metadata: Metadata = {
title: "Request a Drone Inspection Quote | Quadrelliot",
description:
"Request a commercial drone roof or asset inspection from Quadrelliot. Contact by form, phone, text or WhatsApp.",
alternates: {
canonical: "https://quadrelliot.co.uk/contact",
},
openGraph: {
title: "Request a Drone Inspection Quote | Quadrelliot",
description:
"Request a commercial drone roof or asset inspection with clear visual evidence and fast reporting.",
url: "https://quadrelliot.co.uk/contact",
siteName: "Quadrelliot",
type: "website",
},
};

export default function ContactPage() {
return <QuadrelliotWebsite initialRoute="contact" />;
}
