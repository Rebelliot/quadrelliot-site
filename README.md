This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Contact form notifications

The contact form sends its primary notification through Resend to the existing Quadrelliot contact address. The deployment requires:

- `RESEND_API_KEY` — Resend API key
- `RESEND_FROM_EMAIL` — a verified sender address, for example `Quadrelliot Website <enquiries@quadrelliot.co.uk>`

The submitted service, contact details, property address, preferred contact method, enquiry text and server-recorded submission time are included in the email.

SMS alerts are not currently sent. If they are added later, keep email as the primary delivery path and add the SMS provider call after a successful Resend response in `app/api/contact/route.ts`. Provider credentials such as a Twilio or Vonage API key and destination number must be supplied through environment variables; do not commit them to the repository. SMS failure should be logged separately and must not turn an email-delivered enquiry into a failed form submission.
