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

## Admin and course setup

1. Apply the Supabase SQL files in order: `src/lib/supabase/20261022_content.sql`, `src/lib/supabase/20261106_course_engine.sql`, `src/lib/supabase/20261107_admin_access.sql`, `src/lib/supabase/20261108_book_delivery.sql`, `src/lib/supabase/20261109_signup_approval.sql`, then `src/lib/supabase/20261110_admin_allowlist.sql`.
2. Set `SUPABASE_SERVICE_ROLE_KEY` in the server environment (`.env.local` for local development and the Vercel project environment for production). Never prefix the service-role key with `NEXT_PUBLIC_`. Admins are configured in the protected `admin_allowlist` table by SQL.
3. In Supabase, allow email/password signups and turn off **Confirm email** under **Authentication → Sign In / Providers → Email**. No SMTP provider or invitation email is needed. Keep strong passwords enabled.
4. Sign in with `norvara0@gmail.com` and open `/admin`. The last SQL migration adds that email to the admin allowlist.
5. Students create their own account with their name, email, and password. Admins review all signups in `/admin`, then approve to grant access or decline to keep the account locked. Access decisions are shown in the student's dashboard; no decision emails are sent. With email confirmation disabled, users cannot prove they control the address, so confirm payment details manually before approving.
6. This setup cannot send password-reset emails. If a student forgets their password, they will need admin-assisted recovery or you can configure SMTP later.
7. Current product checkout is handled through WhatsApp, and payment webhooks do not automatically grant access.
8. Upload PDF books in the Books tab. They are stored in a private bucket and served only to signed-in users whose database access policy permits learning access. The dashboard reader hides normal download controls, but no browser reader can prevent screenshots or copying displayed content.
9. Add or edit video lessons in the course lessons tab by setting a title, YouTube link, summary, materials, and optional quiz. Unlisted YouTube videos can still be shared by anyone who obtains their URL.

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
