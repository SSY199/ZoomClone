# ZOOMY

A full-featured Zoom clone built with Next.js 16, Clerk, and Stream Video. Create instant or scheduled meetings, join via link, manage upcoming and past calls, and host video conferences with screen sharing, layout controls, and recordings.

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![React](https://img.shields.io/badge/React-19-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC)

## Features

- **Authentication** — Sign up and sign in with [Clerk](https://clerk.com)
- **Instant meetings** — Start a video call in one click
- **Scheduled meetings** — Pick a date/time and share an invite link
- **Join via link** — Enter a meeting URL to join an existing call
- **Personal room** — Persistent meeting room tied to your user ID
- **Upcoming & previous calls** — View and rejoin scheduled or past meetings
- **Recordings** — Browse and play meeting recordings
- **In-call controls** — Mute/unmute, camera toggle, layout switching (grid, speaker-left, speaker-right), participant list, and end call for everyone (host only)
- **Pre-call setup** — Preview camera/mic before joining
- **Responsive UI** — Desktop sidebar and mobile navigation

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4, shadcn/ui |
| Auth | [Clerk](https://clerk.com) (`@clerk/nextjs`) |
| Video | [Stream Video SDK](https://getstream.io/video/) (`@stream-io/video-react-sdk`, `@stream-io/node-sdk`) |
| UI | Radix UI, Lucide React, Sonner (toasts), React DatePicker |

## Prerequisites

Before running the project locally, create accounts and obtain API keys from:

1. **[Clerk](https://dashboard.clerk.com)** — Authentication (publishable + secret keys)
2. **[Stream](https://dashboard.getstream.io)** — Video calling (API key + secret)

## Getting Started

### 1. Clone and install

```bash
git clone <your-repo-url>
cd zoomclone
npm install
```

### 2. Environment variables

Create a `.env` or `.env.local` file in the project root:

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Stream Video
NEXT_PUBLIC_STREAM_API_KEY=your_stream_api_key
STREAM_SECRET_KEY=your_stream_secret_key

# App URL (used for meeting invite links)
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Unauthenticated users are redirected to sign in.

### 4. Build for production

```bash
npm run build
npm start
```

## Project Structure

```
zoomclone/
├── action/
│   └── stream.action.ts       # Server action — Stream token generation
├── app/
│   ├── (auth)/                # Sign-in & sign-up pages
│   ├── (root)/
│   │   ├── (home)/            # Dashboard routes (sidebar layout)
│   │   │   ├── page.tsx       # Home — meeting actions
│   │   │   ├── upcoming/      # Upcoming meetings
│   │   │   ├── previous/      # Past meetings
│   │   │   ├── recordings/    # Call recordings
│   │   │   └── personal-room/ # Personal meeting room
│   │   ├── meeting/[id]/      # Live meeting room
│   │   └── layout.tsx         # Stream Video provider wrapper
│   ├── layout.tsx             # Root layout (ClerkProvider)
│   └── globals.css
├── components/                # UI components (MeetingRoom, CallList, etc.)
├── constants/                 # Sidebar links, avatar images
├── hooks/                     # useGetCalls, useGetCallById
├── providers/
│   └── StreamClientProvider.tsx
├── proxy.ts                   # Clerk route protection (Next.js 16)
└── public/icons/              # App icons and assets
```

## Routes

| Route | Description | Auth required |
| --- | --- | --- |
| `/sign-in` | Clerk sign-in | No |
| `/sign-up` | Clerk sign-up | No |
| `/` | Home dashboard with meeting actions | Yes |
| `/upcoming` | Upcoming scheduled meetings | Yes |
| `/previous` | Past meetings | Yes |
| `/recordings` | Meeting recordings | Yes |
| `/personal-room` | Personal meeting room details | Yes |
| `/meeting/[id]` | Live video meeting | Yes |

Protected routes are enforced in `proxy.ts` using Clerk's `clerkMiddleware`.

## How It Works

1. **Auth** — Clerk handles user sessions. The root layout wraps the app in `ClerkProvider`.
2. **Stream client** — `StreamVideoProvider` (in `app/(root)/layout.tsx`) initializes a `StreamVideoClient` for the signed-in user and fetches tokens via the server action in `action/stream.action.ts`.
3. **Meetings** — Calls are created with Stream's `default` call type. Scheduled meetings store a `starts_at` timestamp and optional description in call custom data.
4. **Join flow** — Users land on a pre-call setup screen (`MeetingSetup`), then enter the live room (`MeetingRoom`) with Stream's built-in video layouts and controls.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm start` | Run production server |
| `npm run lint` | Run ESLint |

## Deployment

The app is designed to deploy on [Vercel](https://vercel.com) or any Node.js host that supports Next.js.

1. Push your repository to GitHub.
2. Import the project in Vercel.
3. Add all environment variables from the [Environment variables](#2-environment-variables) section.
4. Set `NEXT_PUBLIC_BASE_URL` to your production domain (e.g. `https://your-app.vercel.app`).
5. In the Clerk dashboard, add your production URL to allowed origins and redirect URLs.
6. Deploy.

## License

Private project.
