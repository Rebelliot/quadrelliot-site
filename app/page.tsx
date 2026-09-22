import type { Metadata } from "next";

import QuadrelliotWebsite from "./QuadrelliotWebsite";

export const metadata: Metadata = {
title: { absolute: "Residential & Commercial Drone Roof Inspections | Quadrelliot" },
description:
"Quadrelliot provides residential and commercial drone roof and asset inspections with clear aerial images, marked-up findings and reports delivered within an hour of the flight.",
alternates: {
canonical: "https://quadrelliot.co.uk",
},
openGraph: {
title: "Residential & Commercial Drone Roof Inspections | Quadrelliot",
description:
"Residential and commercial drone roof and asset inspections with marked-up findings and fast inspection reports.",
url: "https://quadrelliot.co.uk",
siteName: "Quadrelliot",
type: "website",
},
};

export default function Page() {
return <QuadrelliotWebsite />;
}
