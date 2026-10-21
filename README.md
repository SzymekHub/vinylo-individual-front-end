# Vinylo Frontend

The React web app for **Vinylo**, a year 2, semester 3 project which was a platform for vinyl collectors. Users can browse records and artists, manage a personal collection, list and bid on auctions, chat in real time, and listen to album previews via Spotify.

The API it talks to is [vinylo-individual-back-end](../vinylo-individual-back-end). Design and planning documents are in [vinylo-individual-documentation](../vinylo-individual-documentation).

## Features

- Browse all vinyls and artists, with pagination and artist search
- Personal profile with editable details, and an upgrade flow to premium
- Personal collection with per-record actions
- Add vinyls and artists, and edit artist pages
- Auction list, auction details, placing bids, and an auction editor
- Real-time updates over WebSockets (STOMP) for auctions, collections and artists
- Public chat page
- Spotify album embeds
- Login and registration with token refresh, plus protected routes

## Tech stack

- React 18 with React Router 6
- Vite 5 for dev server and builds
- Tailwind CSS 3 and Material UI 6 (with Emotion)
- Axios for HTTP
- `@stomp/stompjs` for WebSocket messaging
- `jwt-decode` for reading token claims
- ESLint for linting
- Cypress for end-to-end tests

## Project layout

```
src/
├── App.jsx, main.jsx         # Entry point and routes
├── pages/                    # One component per route
├── components/
│   ├── hooks/                # Data access: add/, fetch/, update/, delete/ hooks, token and STOMP helpers
│   ├── general/              # NavBar, PrivateRoute, shared sections
│   ├── loginpage/, registerPage/, profilePage/, allvinylspage/, auctionPage/, ...
│   └── spotify/              # Spotify embed hook
└── assets/                   # Images and logos
application.config.js         # Reads backend URLs from Vite environment variables
cypress/                      # End-to-end tests
```

## Routes

| Path | Page |
|---|---|
| `/` | Home |
| `/Login`, `/Register` | Authentication |
| `/Profile`, `/Upgrade` | Profile and premium upgrade |
| `/Vinyls`, `/AllVinyls` | Browse records |
| `/Artists`, `/AllArtists` | Browse artists |
| `/Collection` | Personal collection |
| `/Auctions`, `/SellAuctions`, `/bid/:auctionId` | Auctions, selling, and bidding |
| `/Chat` | Public chat |

## Requirements

- Node.js 18 or newer
- npm
- The [Vinylo backend](../vinylo-individual-back-end) running (locally or in Docker)

## Environment variables

The app reads two variables at build time. Vite only exposes variables with the `VITE_` prefix.

| Variable | Example | Purpose |
|---|---|---|
| `VITE_BACKEND_URL` | `http://localhost:8080` | Base URL of the REST API |
| `VITE_BACKEND_WS_URL` | `ws://localhost:8080` | Base URL of the WebSocket endpoint |

Create a `.env.local` file in the project root for local development:

```bash
VITE_BACKEND_URL=http://localhost:8080
VITE_BACKEND_WS_URL=ws://localhost:8080
```

The repository also has a `.env.production` file, which is used by production builds. Check it before deploying, and point it at your own backend.

## Setup and running

```bash
npm install
npm run dev
```

The dev server starts on `http://localhost:5173` by default. The backend must allow that origin. The backend's CORS list includes `localhost:5173` and `localhost:3000`.

## Building

```bash
npm run build     # outputs to dist/
npm run preview   # serves the built app locally
```

## Running with Docker

The project has two Docker pieces:

- `dockerfile` builds a small image that serves the contents of `dist/` on port 3000 with the `serve` package. Build `dist/` first with `npm run build`.
- `docker-compose.yml` starts three containers together: a MySQL 8 database, the backend image, and the frontend.

```bash
npm run build
docker-compose up -d
```

Compose exposes the database on port `3316`, the backend on `8090` and the frontend on `3000`.

> **Note:** `docker-compose.yml` refers to the build file as `Dockerfile`, but the file in the repository is named `dockerfile` (lowercase). Rename one of them so they match, or the build will fail on case-sensitive systems.

The compose file contains default database credentials for local testing. Replace them before using this setup anywhere other than your own machine.

## Testing

```bash
npm run lint                 # ESLint
npx cypress open             # interactive Cypress runner
npx cypress run --browser chrome --headless   # headless run
```

Cypress tests need the app and backend running. The current tests cover profile updates, adding a vinyl and adding an artist.

## Continuous integration

`.gitlab-ci.yml` builds the app, brings the Docker Compose stack up, runs the Cypress suite, tears the stack down, and then builds and pushes the frontend image. The Cypress job is allowed to fail.

## Known limitations

- Some Unsplash and Pixabay images are used as placeholders and are hotlinked from their sites.
- The Docker compose file and the build file need the filename fix described above.

## Related repositories

- [vinylo-individual-back-end](../vinylo-individual-back-end): the Spring Boot API
- [vinylo-individual-documentation](../vinylo-individual-documentation): project plan, design document, diagrams and reports

## Author

Szymon Gancarz. Built as an individual project in the ICT programme at Fontys University of Applied Sciences.
