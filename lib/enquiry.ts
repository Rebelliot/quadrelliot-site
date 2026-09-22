export const ENQUIRY_SERVICES = {
  "roof-spot-check": "Roof Spot Check — £69",
  "post-repair-check": "Post-Repair Check — £69",
  "aerial-property-photos": "Aerial Property Photos — £79",
  "gutter-chimney-check": "Gutter & Chimney Check — £79",
  "solar-panel-visual-check": "Solar Panel Visual Check — £79",
  "storm-damage-check": "Storm Damage Check — £89",
  "repair-before-after-pack": "Repair Before & After Pack — £99",
  "residential-roof-inspection": "Residential Roof Inspection — £149",
  "large-complex-residential": "Large / Complex Residential — from £195",
  "commercial-housing-public-sector": "Commercial / Housing / Public Sector",
  "existing-customer-return-check": "Existing Customer Return Check — £49",
  "not-sure": "Not sure — help me choose",
  other: "Other enquiry",
} as const;

export type EnquiryServiceKey = keyof typeof ENQUIRY_SERVICES;

export const ENQUIRY_SERVICE_OPTIONS = Object.entries(ENQUIRY_SERVICES).map(
  ([value, label]) => ({ value, label })
) as { value: EnquiryServiceKey; label: string }[];

export const PREFERRED_CONTACT_METHODS = {
  email: "Email",
  phone: "Phone",
  text: "Text message",
} as const;

export type PreferredContactMethod = keyof typeof PREFERRED_CONTACT_METHODS;

export const PREFERRED_CONTACT_OPTIONS = Object.entries(PREFERRED_CONTACT_METHODS).map(
  ([value, label]) => ({ value, label })
) as { value: PreferredContactMethod; label: string }[];

export function isEnquiryServiceKey(value: string): value is EnquiryServiceKey {
  return value in ENQUIRY_SERVICES;
}
