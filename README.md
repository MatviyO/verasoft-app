# Verasoft Customer Console

Customer-focused dashboard built with React, Redux Toolkit, Redux-Saga, and Axios. It renders customer summary data and orders with sorting, tabs, and loading overlays, following a feature-based modular structure.

## Highlights

- Feature-based modular architecture (FSD-style)
- Redux Toolkit state management with Redux-Saga side effects
- Axios isolated in a shared API layer
- Clickable table headers with ASC/DESC sorting
- Loading overlays that block interactions during async fetches
- Responsive layout for tablet and mobile

## Tech Stack

- React + TypeScript
- Vite (rolldown-vite)
- Redux Toolkit + Redux-Saga
- Axios
- SCSS

## Project Structure

```
src/
  app/        # store setup, root reducer/saga
  entities/   # domain types
  features/   # sagas, slices, API modules
  pages/      # page-level layout
  shared/     # UI components, API client
  widgets/    # composed UI sections
```

## Data Sources

The app reads data from the public endpoints:

- Customer summary: `/summary.json`
- Orders: `/orders.json`

Configure the base URL via environment variable:

```
VITE_API_BASE_URL=https://evoteam-verasoft.github.io/data
```

## Getting Started

```
pnpm install
pnpm dev
```

## Live Build

[https://verasoft-app.vercel.app/](https://verasoft-app.vercel.app/)

## Scripts

- `pnpm dev` - start local dev server
- `pnpm build` - typecheck and build
- `pnpm test` - run unit tests
- `pnpm lint` - lint source code

## Architecture

- Feature-based modular structure
- Redux Toolkit for state management
- Redux-Saga for side effects
- Axios isolated in API layer
- Dumb UI components
- Fully implemented async flows with error handling
