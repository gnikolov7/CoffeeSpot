# CoffeeSpot — Day 1 starter

A React single-page application for discovering restaurants, cafés, bakeries, and bars. This is an **in-progress project**, not a finished exam submission.

## Requirements

- Node.js 20.19+ recommended and npm
- Git

## Run locally

```bash
npm install
npm run dev
```

Open the local URL displayed by Vite (normally `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

## Current status (13 October 2026)

- React + Vite structure ✅
- Client-side routing ✅ (including `/places/:placeId` and `/places/:placeId/edit`)
- Responsive starter styling ✅
- Supabase authentication ⏳ Day 2
- Remote Catalog + Details ⏳ Day 3
- Protected CRUD and ownership ⏳ Day 4
- User interactions, error handling and forms ⏳ Days 5–6
- Public deployment and finalized Functional Guide ⏳ Day 8

**Do not submit this starter as a finished exam.** Its current pages deliberately show development notices rather than pretend features work. There is no hardcoded catalog of restaurant records.

## Planned URL structure

| Path | Purpose |
| --- | --- |
| `/` | Landing page |
| `/places` | Public catalog |
| `/places/:placeId` | Public details |
| `/places/new` | Private create page |
| `/places/:placeId/edit` | Author-only edit page |
| `/my-places` | Private dashboard |
| `/register` | Guest-only registration |
| `/login` | Guest-only login |

## Planned backend

Supabase Auth + Postgres + Row Level Security. Use the public/anon browser key in environment variables; **never** put the Supabase `service_role` key in a browser bundle.

## Functional Guide — DRAFT, MUST BE COMPLETED

The exam brief requires the course's **provided Functional Guide template** to be included **inside this README**. Ask for that template and replace this section with the completed guide before submission. No completed guide is claimed at this time.

## Production checklist

- [ ] All functional requirements implemented and manually tested
- [ ] Real hosted database with persistent records
- [ ] Only authors can modify/delete their own records, enforced by RLS
- [ ] Auth/guest route guards and proper loading, empty, error states
- [ ] Real API-based like/comment interaction
- [ ] README setup steps, architecture overview, final Functional Guide
- [ ] Live frontend deployment URL in README
- [ ] Public GitHub repository: at least 5 meaningful commits over at least 3 distinct calendar days
- [ ] Build and deployed site verified to match submitted commit

See [`docs/PROJECT-PLAN.md`](docs/PROJECT-PLAN.md) for daily activities.
