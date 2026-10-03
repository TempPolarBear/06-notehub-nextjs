'use client';
import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from 'formik';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as Yup from 'yup';
import { createNote, type CreateNotePayload } from '@/lib/api';
import type { NoteTag } from '@/types/note';
import css from './NoteForm.module.css';
const tags: NoteTag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];
const schema: Yup.ObjectSchema<CreateNotePayload> = Yup.object({
  title: Yup.string().min(3).max(50).required(),
  content: Yup.string().max(500).defined(),
  tag: Yup.mixed<NoteTag>().oneOf(tags).required(),
});
const initialValues: CreateNotePayload = { title: '', content: '', tag: 'Todo' };

interface NoteFormProps {
  onCancel: () => void;
  onSuccess: () => void;
}

export default function NoteForm({ onCancel, onSuccess }: NoteFormProps) {
  const client = useQueryClient();
  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: ['notes'] });
      onSuccess();
    },
  });
  const submit = async (values: CreateNotePayload, helpers: FormikHelpers<CreateNotePayload>) => {
    try {
      await mutation.mutateAsync(values);
    } catch {
      helpers.setSubmitting(false);
    }
  };
  return (
    <Formik initialValues={initialValues} validationSchema={schema} onSubmit={submit}>
      {({ isSubmitting }) => (
        <Form className={css.form} noValidate>
          <label className={css.formGroup} htmlFor="title">
            Title
            <Field id="title" name="title" className={css.input} />
            <ErrorMessage name="title" component="span" className={css.error} />
          </label>
          <label className={css.formGroup} htmlFor="content">
            Content
            <Field as="textarea" id="content" name="content" rows={8} className={css.textarea} />
            <ErrorMessage name="content" component="span" className={css.error} />
          </label>
          <label className={css.formGroup} htmlFor="tag">
            Tag
            <Field as="select" id="tag" name="tag" className={css.select}>
              {tags.map((tag) => (
                <option key={tag}>{tag}</option>
              ))}
            </Field>
          </label>
          {mutation.isError && (
            <p className={css.error}>Could not create the note. Please try again.</p>
          )}
          <div className={css.actions}>
            <button type="button" className={css.cancelButton} onClick={onCancel}>
              Cancel
            </button>
            <button
              type="submit"
              className={css.submitButton}
              disabled={isSubmitting || mutation.isPending}
            >
              {isSubmitting ? 'Creating…' : 'Create note'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
