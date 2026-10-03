# NoteHub

Приложение для просмотра, поиска, создания и удаления личных заметок, построенное на Next.js.

## Features

- Список заметок с поиском, пагинацией и созданием новой заметки
- Удаление заметок и просмотр деталей по отдельному маршруту
- Предзагрузка данных на сервере и гидратация TanStack Query на клиенте
- Обработка состояний загрузки и ошибок для страниц заметок

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
