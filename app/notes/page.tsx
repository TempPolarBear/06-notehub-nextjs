import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';
const perPage = 12;

export const dynamic = 'force-dynamic';

export default async function NotesPage() {
  const client = new QueryClient();
  await client.prefetchQuery({
    queryKey: ['notes', 1, perPage, ''],
    queryFn: ({ signal }) => fetchNotes({ page: 1, perPage, search: '', signal }),
  });
  return (
    <HydrationBoundary state={dehydrate(client)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
