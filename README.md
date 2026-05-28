# Masiha

Masiha is a mobile-first Next.js PWA prototype for Persian-centered Scripture reading, daily liturgy, guided Christian formation, study themes, and a Bible-in-one-year rhythm.

## Run Locally

```bash
npm install
npm run dev
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

## MySQL

The app currently ships with local seed content in `src/lib/content.ts` so the prototype runs immediately. A MySQL-ready schema is available at `database/schema.sql`, and `src/lib/db.ts` provides a `mysql2` connection helper for moving content and progress into the database.

Expected environment variables:

```bash
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=
MYSQL_DATABASE=masiha
```
