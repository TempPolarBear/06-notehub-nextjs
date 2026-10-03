import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import NoteDetailsClient from './NoteDetails.client';
export default async function NotePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const client = new QueryClient();
  await client.prefetchQuery({ queryKey: ['note', id], queryFn: () => fetchNoteById(id) });
  return (
    <HydrationBoundary state={dehydrate(client)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
