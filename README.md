# NoteHub

A Next.js application for viewing, searching, creating, and deleting personal notes.

## Features

- Notes list with search, pagination, and note creation
- Note deletion and detail pages on a dedicated route
- Server-side data prefetching and client-side TanStack Query hydration
- Loading and error states for note pages

## Technologies

- Next.js
- React
- TypeScript
- TanStack Query
- Axios
- Formik and Yup
- CSS Modules

## Getting Started

### Installation

```bash
npm install
```

### Environment variables

Create `.env.local` and set:

```env
NEXT_PUBLIC_NOTEHUB_TOKEN=
```

### Development

```bash
npm run dev
```

## Routes

- `/` — welcome page
- `/notes` — notes list
- `/notes/[id]` — note details
