# Home Rentals — House Rental & Tenant Management System

A glossy, futuristic platform for landlords and tenants, built with the
**iOS 26 Liquid Glass** design system. Landlords track rent collection,
occupancy and revenue and nudge late payers over WhatsApp; tenants get a calm
portal with their rent status, countdown, payment history and receipts.

> **Status — Phase 1 (design + app).** The full UI is built and runs on mock
> data, so it deploys to Vercel with zero configuration. Supabase (auth +
> database) is Phase 2 — the schema is ready in [`supabase/schema.sql`](supabase/schema.sql).

## Tech stack

| Concern       | Choice                                          |
| ------------- | ----------------------------------------------- |
| Framework     | Next.js 14 (App Router) + TypeScript            |
| Styling       | Tailwind CSS — custom liquid-glass design system|
| Animation     | Framer Motion                                   |
| Charts        | Recharts (blue→cyan gradients)                  |
| Icons         | Lucide React                                    |
| Notifications | WhatsApp `wa.me` deep links (Twilio-ready)      |
| Database (P2) | Supabase — Postgres, Auth, Storage              |

## Pages

| Route                  | What it is                                                         |
| ---------------------- | ----------------------------------------------------------------- |
| `/`                    | Marketing landing page with liquid-glass hero & feature grid      |
| `/login`, `/signup`    | Auth UI with role selection (routes by role; Supabase-ready)      |
| `/dashboard/landlord`  | Stat cards, revenue chart, occupancy donut, "who paid" ledger, tenant table |
| `/dashboard/tenant`    | Rent status + countdown, lease facts, payment history + receipts, maintenance form |

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build (what Vercel runs)
npm run start      # serve the production build
npm run typecheck  # tsc --noEmit
npm run lint       # next lint
```

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new) — Vercel auto-detects
   Next.js; no build settings needed.
3. Deploy. Phase 1 needs **no environment variables**.

## Design system: iOS 26 Liquid Glass

- Frosted white surfaces (`bg-white/70` + `backdrop-blur-xl`) with soft white
  borders and multi-layered shadows (`shadow-glass`).
- Deep slate text for contrast; vibrant blue accents.
- Fluid blue→indigo→cyan gradients (`bg-liquid-primary`, `.gradient-text`).
- Organic rounded corners (`rounded-3xl` / `rounded-4xl`) and liquid hover
  states (elements scale and lift). Tokens live in `tailwind.config.ts` and
  `app/globals.css`.

## Project structure

```
app/
  layout.tsx              # root layout + ambient glass background
  globals.css             # design tokens & glass component classes
  page.tsx                # landing page
  login/ · signup/        # auth UI
  dashboard/landlord/     # landlord dashboard
  dashboard/tenant/       # tenant portal
components/                # GlassCard, StatCard, charts, PaymentLedger, …
lib/
  types.ts                # domain models (mirror the Supabase schema)
  mock-data.ts            # Phase 1 data — swap for Supabase queries in Phase 2
  format.ts               # currency (FCFA), dates, due-day math
  whatsapp.ts             # reminder template + wa.me link builder
supabase/schema.sql       # Phase 2: tables, RLS, signup trigger
```

## WhatsApp reminders

The **Send Reminder** buttons format a template message — *"Hello [Name], your
rent of [Amount] for [Month] is due…"* — and open WhatsApp pre-filled via a
`wa.me` link (Option A, no backend). For automated background sending, add
Twilio credentials (see `.env.example`) and swap the link builder for an API
route (Option B).

## Roadmap

- **Phase 2 — Database:** run `supabase/schema.sql`, add a Supabase client,
  replace `lib/mock-data.ts` with real queries and Server Actions, wire real
  auth into `/login` and `/signup`.
- **Phase 3:** Twilio background WhatsApp sending; receipt PDFs via Storage.
