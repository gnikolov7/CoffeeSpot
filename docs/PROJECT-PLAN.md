# CoffeeSpot — SoftUni React exam plan

**Deadline:** 27 October 2026, **15:59** (according to supplied exam document).

## Days

| Date | Implementation | Test / commit milestone |
|---|---|---|
| **13 Oct** | React + Vite, routes, responsive initial design; public GitHub repository | Initial real commit after setup and verifying app locally |
| **14 Oct** | Supabase project, real DB, AuthProvider, Register/Login/Logout, loading session state | Verify signup/login/logout and refresh; `feat: implement supabase auth` |
| **15 Oct** | Places table, Catalog and Details, REST/SDK calls; queries + loading/error/empty states | Verify record persistence across sessions; `feat: build remote catalog and details` |
| **16 Oct** | Create/Edit/Delete forms with validation, private and guest guards, ownership enforcement using RLS | Test user A cannot edit user B's place; `feat: protected place crud` |
| **17 Oct** | Likes or reviews/comments as real interaction with remote API | Test as guest and logged-in user; `feat: add reviews and likes` |
| **18 Oct** | Input validation, error states, accessibility, visual/mobile polish | Test slow network, malformed input and duplicate actions |
| **19 Oct** | QA walkthrough against every line of SoftUni requirements | Fix bugs; run build |
| **20 Oct** | Deploy frontend; Supabase already live; README, final course Functional Guide | Check real public URL, link in README |
| **21–26 Oct** | Buffer: missing rubric items, security, polish, verify in incognito | Final audit & submission in advance of deadline |

**Important:** Those are actual development milestones, not instructions to fabricate or backdate commits. Commit changes on the day you really do that work. Meaningful commit history must span 3 real days.

## Exam scoring map (from specification)

- Application Structure & Routing: 25 pts
- Authentication & Data Handling: 30 pts
- Forms, Validation & Interaction: 25 pts
- React Architecture & Styling: 20 pts

## Database architecture (to establish on Day 2)

### Initial release

- `places`: `id`, `author_id`, `name`, `category`, `city`, `address`, `description`, `image_url`, `created_at`
- `reviews`: `id`, `place_id`, `author_id`, `rating`, `body`, `created_at`
- `place_likes`: `place_id`, `user_id`, `created_at` (unique composite key)

Supabase Auth holds identities. An optional `profiles` table can hold public display names without copying passwords.

### Future business extension (after exam)

- `menus`: `id`, `place_id`, `title`, `updated_at`
- `menu_items`: `id`, `menu_id`, `name`, `description`, `price`, `currency`, `image_url`, `category`, `is_available`
- Venue-owner verification, moderation, claimed pages, photo storage, price update workflow, dish reviews, geosearch, ranking fairness, image licenses

**Mobile strategy:** React Native/Expo will connect to the same Supabase backend using separately built UI components. React DOM components cannot simply be dropped into React Native, but API contracts, validation schemas and domain knowledge can be reused. Consider a monorepo/shared TypeScript package when beginning React Native.

## Important pitfalls

- UI-hidden Edit/Delete buttons are **not** a security boundary: enforce owner checks in Supabase Row Level Security.
- A fake JSON/local catalog fails the remote data requirement; do not submit mock data.
- Static login/logout screens do not satisfy authentication: use a real hosted provider.
- Keep Supabase service_role keys server-only; client uses a publishable/anon key and RLS.
- Protect guest/private pages, and redirect signed-in visitors away from Login and Register.
- Include the exact provided SoftUni Functional Guide template, filled in, directly within `README.md`.
- Set Vercel SPA rewrites so direct navigation to `/places/:id` works after refresh.
- Verify the deployed app and the matching GitHub commit before the exam.
