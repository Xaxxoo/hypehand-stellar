# HypeHand Frontend

Next.js 14+ (App Router) frontend for the HypeHand Stellar gifting platform.

## Tech Stack

- **Next.js 14+** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **ESLint** for code quality

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create environment file:

```bash
cp .env.local.example .env.local
```

3. Update `.env.local` with your contract IDs and RPC URL.

4. Start the development server:

```bash
npm run dev
```

The app runs at [http://localhost:3000](http://localhost:3000).

From the monorepo root you can also run:

```bash
npm run frontend:dev
```

## Routes

| Route        | Description                         |
| ------------ | ----------------------------------- |
| `/`          | Landing page with platform intro    |
| `/dashboard` | Creator dashboard (mock view)       |
| `/gift`      | Gift sending form                   |

## Backend Integration

The frontend communicates with the NestJS backend API (default `http://localhost:3001`).

Environment variables for backend integration:

- `NEXT_PUBLIC_CONTRACT_ID` — Soroban contract ID for on-chain interactions
- `STELLAR_RPC_URL` — Stellar Soroban RPC endpoint
- `NEXT_PUBLIC_API_URL` — Backend API base URL

For local devnet testing, set `STELLAR_RPC_URL` to your local Soroban RPC and `NEXT_PUBLIC_CONTRACT_ID` to the deployed contract ID from the Rust CLI.

## Build

```bash
npm run build
```
