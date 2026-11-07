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

1. Apply the Supabase SQL files in order: `src/lib/supabase/20261022_content.sql`, `src/lib/supabase/20261106_course_engine.sql`, then `src/lib/supabase/20261107_admin_access.sql`.
2. Set `ADMIN_EMAILS=norvara0@gmail.com` and `SUPABASE_SERVICE_ROLE_KEY` in the server environment (`.env.local` for local development and the Vercel project environment for production). Never prefix the service-role key with `NEXT_PUBLIC_`.
3. Sign up with the admin email and verify it, then open `/admin`.
4. New signups request access automatically. Approve verified users in the access queue to grant course and book access.
5. Add or edit video lessons in the course lessons tab. Set videos to unlisted on YouTube, then add each link, summary, materials, and optional quiz.

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
