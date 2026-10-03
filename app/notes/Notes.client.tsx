'use client';
import { useCallback, useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import { fetchNotes } from '@/lib/api';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import css from './notes.module.css';
const perPage = 12;
export default function NotesClient() {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const debounce = useDebouncedCallback((value: string) => {
    setSearch(value.trim());
    setPage(1);
  }, 350);
  const query = useQuery({
    queryKey: ['notes', page, perPage, search],
    queryFn: ({ signal }) => fetchNotes({ page, perPage, search, signal }),
    placeholderData: keepPreviousData,
  });
  const created = () => {
    debounce.cancel();
    setSearchInput('');
    setSearch('');
    setPage(1);
    close();
  };
  const data = query.data;
  return (
    <main className={css.app}>
      <div className={css.toolbar}>
        <SearchBox
          value={searchInput}
          onChange={(value) => {
            setSearchInput(value);
            debounce(value);
          }}
        />
        {data && data.totalPages > 1 && (
          <Pagination currentPage={page} totalPages={data.totalPages} onPageChange={setPage} />
        )}
        <button className={css.button} type="button" onClick={() => setOpen(true)}>
          Create note +
        </button>
      </div>
      {query.isPending && <p>Loading notes…</p>}
      {query.isError && <p>Could not load notes.</p>}
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {query.isSuccess && data?.notes.length === 0 && <p>No notes found.</p>}
      {open && (
        <Modal onClose={close}>
          <NoteForm onCancel={close} onSuccess={created} />
        </Modal>
      )}
    </main>
  );
}
