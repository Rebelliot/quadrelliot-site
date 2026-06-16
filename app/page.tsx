import type { Metadata } from "next";

import QuadrelliotWebsite from "./QuadrelliotWebsite";

export const metadata: Metadata = {
title: "Commercial Drone Roof Inspections | Quadrelliot",
description:
"Quadrelliot provides commercial drone roof and asset inspections with clear aerial images, marked-up findings and reports ready within an hour of the flight.",
alternates: {
canonical: "https://quadrelliot.co.uk",
},
openGraph: {
title: "Commercial Drone Roof Inspections | Quadrelliot",
description:
"Commercial drone roof and asset inspections with marked-up findings and fast inspection reports.",
url: "https://quadrelliot.co.uk",
siteName: "Quadrelliot",
type: "website",
},
};

export default function Page() {
return <QuadrelliotWebsite />;
}
