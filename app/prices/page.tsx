import type { Metadata } from "next";

import QuadrelliotWebsite from "../QuadrelliotWebsite";

export const metadata: Metadata = {
  title: { absolute: "Drone Roof Inspection Prices | Quadrelliot" },
  description:
    "Drone roof inspection prices from £69, including targeted checks, residential roof inspections and individually quoted commercial drone inspections.",
  alternates: {
    canonical: "https://quadrelliot.co.uk/prices",
  },
  openGraph: {
    title: "Drone Roof Inspection Prices | Quadrelliot",
    description:
      "Straightforward prices for residential roof inspections, targeted checks and aerial property imagery.",
    url: "https://quadrelliot.co.uk/prices",
    siteName: "Quadrelliot",
    type: "website",
  },
};

export default function PricesPage() {
  return <QuadrelliotWebsite initialRoute="prices" />;
}
