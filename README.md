# Masiha

Masiha is a mobile-first Next.js PWA prototype for Persian-centered Scripture reading, daily liturgy, guided Christian formation, study themes, and a Bible-in-one-year rhythm.

## Run Locally

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## What Is Implemented

- Bible reader with Farsi, English, search, bookmarks, and English interlinear support.
- Story of Salvation guided track.
- Seeker / Curious and Growing in Faith journeys with bite-sized lessons, progress, navigation, and reinforcement questions.
- Discover Study Themes for temptation, anxiety, depression, love, anger, hope, peace, fear, stress, patience, doubt, joy, jealousy, loss, and healing.
- Daily Liturgy screen with reading and prayer of the day.
- Bible in One Year reading plan with persisted progress.
- Warm custom day/night themes using shadcn-style local components.

## Database

The app currently ships with local seed content in `src/lib/content.ts` so the prototype runs immediately. Prisma is configured for MySQL in `prisma/schema.prisma`, and `src/lib/db.ts` exposes the Prisma client plus shared content queries.

Expected environment variables:

```bash
DATABASE_URL=mysql://user:password@127.0.0.1:3307/masiha
```

Useful commands:

```bash
pnpm prisma generate
pnpm prisma migrate dev --name init
pnpm test
```

## Docker Local Deployment

Use Docker after feature work to verify the production app and MySQL schema together:

```bash
pnpm deploy:local
```

Open [http://localhost:3000](http://localhost:3000).

Useful Docker commands:

```bash
pnpm docker:build
pnpm docker:up
pnpm docker:logs
pnpm docker:migrate
pnpm docker:down
```

`docker-compose.yml` starts MySQL, runs `prisma migrate deploy`, then starts the production Next.js app.
