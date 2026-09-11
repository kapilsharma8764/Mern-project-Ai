# Forge — MERN site inspired by Squarespace

A full MERN stack (MongoDB, Express, React, Node) site whose homepage UI, theme,
and animations are modeled on `www.squarespace.com` (dark hero with serif
italic headline, scroll-reveal sections, logo marquee, alternating dark/light
feature rows, template showcase grid, testimonials, and an email capture CTA).
Images used in the showcase and feature sections are real assets copied from
the local `squarespace/` HTTrack mirror at `D:\projecr ai\squarespace`.

## Stack

- **Client**: React 18 + Vite, plain CSS (no UI framework), IntersectionObserver-based
  scroll animations.
- **Server**: Express 4, REST API under `/api`.
- **Database**: MongoDB via Mongoose — optional. If `MONGODB_URI` is not set or
  MongoDB isn't running, the server automatically falls back to an in-memory
  store for the newsletter-subscribe demo endpoint, so it always runs locally
  without extra setup.

## First-time setup

```powershell
cd "D:\projecr ai\Mern"
npm run install:all
```

(Or just run `Start-Mern.cmd` — it installs dependencies automatically the
first time.)

## Run locally

```powershell
.\Start-Mern.cmd
```

- Frontend: http://localhost:5188
- API health check: http://localhost:4000/api/health

Stop everything with:

```powershell
.\Stop-Mern.cmd
```

## Manual dev (two terminals)

```powershell
npm run dev:server   # http://localhost:4000
npm run dev:client   # http://localhost:5188
```

## Enable real MongoDB (optional)

1. Copy `server/.env.example` to `server/.env`.
2. Set `MONGODB_URI` to a running MongoDB instance (local or Atlas).
3. Restart the server — subscribers will now persist in the `Subscriber`
   collection instead of the in-memory fallback.

## Original Squarespace mirror (served from this same Express server)

The Express server also serves the real HTTrack mirror of `www.squarespace.com`
(from `D:\projecr ai\squarespace`, referenced directly — not copied) as static
files, so the exact original site is now part of the MERN project instead of
needing a separate Python server:

- http://localhost:4000/www.squarespace.com/ — the real, original site
- http://localhost:4000/ — redirects there automatically

## API

| Method | Route             | Description                          |
|--------|-------------------|--------------------------------------|
| GET    | `/api/health`     | Server + DB status                   |
| GET    | `/api/templates`  | Template showcase data               |
| POST   | `/api/subscribe`  | `{ email }` — newsletter sign-up     |

## Project structure

```
Mern/
  server/            Express API
  client/             React + Vite frontend
    public/assets/images/   real images copied from the squarespace mirror
    src/components/         Navbar, Hero, LogoMarquee, Features, Showcase,
                             Testimonials, CTA, Footer
    src/styles/              one CSS file per section
  Start-Mern.cmd / .ps1
  Stop-Mern.cmd / .ps1
```
