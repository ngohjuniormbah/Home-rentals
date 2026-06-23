# Home Rentals

A clean property-management app for landlords and property owners, built with
**React Native + TypeScript** (Expo). Owners get an at-a-glance view of rent
collection, occupancy, overdue tenants, and per-building chats.

## Features

- **Home dashboard** — greeting header with collection progress, four-up
  portfolio stats (Buildings · Tenants · Paid · Overdue), a featured building
  card, and an overdue-rent list with one-tap chat.
- **Buildings** — every property with occupancy and collected-vs-expected rent,
  plus quick actions (Tenants, Group Chat, Call).
- **Tenants** — searchable directory grouped by payment status with colour-coded
  status pills.
- **Chats** — building group chats and 1:1 tenant threads with unread badges.
- **Settings** — profile, notification toggles, and account actions.

## Tech stack

| Concern        | Choice                                   |
| -------------- | ---------------------------------------- |
| Framework      | Expo SDK 51, React Native 0.74           |
| Language       | TypeScript (strict)                      |
| Navigation     | React Navigation (bottom tabs + stack)   |
| Icons          | `@expo/vector-icons` (Ionicons)          |
| State / data   | Local mock data (`src/data/mockData.ts`) |

## Getting started

```bash
npm install
npm start        # then press i / a, or scan the QR with Expo Go
```

Other scripts:

```bash
npm run ios        # open iOS simulator
npm run android    # open Android emulator
npm run web        # run in the browser
npm run typecheck  # tsc --noEmit
```

## Project structure

```
App.tsx                  # entry: providers + navigation container
src/
  components/            # reusable UI (Card, BuildingCard, StatsRow, …)
  screens/               # one file per tab
  navigation/            # tab + stack navigators and route types
  data/                  # mock data standing in for a backend
  theme/                 # colors, spacing, typography, shadows
  types/                 # domain models
  utils/                 # formatting helpers (currency, dates)
```

## Notes

Data is mocked in `src/data/mockData.ts`. The screens read from those exports,
so wiring a real API or store later means changing the data layer only — the UI
components stay the same. Amounts are formatted as `FCFA` via
`src/utils/format.ts`.
