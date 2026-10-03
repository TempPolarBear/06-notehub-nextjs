'use client';
import type { ChangeEvent } from 'react';
import css from './SearchBox.module.css';
export default function SearchBox({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      aria-label="Search notes"
      value={value}
      onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
    />
  );
}
