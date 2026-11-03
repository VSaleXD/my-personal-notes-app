import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import NotesList from '../components/NotesList';
import NoteSearch from '../components/NoteSearch';
import { useLanguage } from '../contexts/AppContexts';
import { soundProps } from '../utils/sound';

function NotesPage({ notes, onDelete, onArchive, archivedOnly = false, isLoading }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t, language } = useLanguage();
  const keyword = searchParams.get('q') || '';
  const visibleNotes = notes.filter((note) => note.archived === archivedOnly)
    .filter((note) => note.title.toLowerCase().includes(keyword.trim().toLowerCase()))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const description = archivedOnly ? (language === 'id' ? 'Catatan lama yang tetap ingin kamu simpan.' : 'Older notes worth keeping.') : (language === 'id' ? 'Tulis ide, rencana, dan hal penting tanpa ribet.' : 'Write ideas, plans, and important things without friction.');

  return (
    <main className="page-shell">
      <section className="page-intro"><div><p className="eyebrow">{archivedOnly ? 'SAVED COLLECTION' : 'YOUR THINKING SPACE'}</p><h1>{archivedOnly ? t.archive : (language === 'id' ? 'Catatan saya' : 'My notes')}</h1><p className="page-intro__description">{description}</p></div><div className="page-intro__sticker">{archivedOnly ? 'SAVED!' : 'LET’S\nWRITE!'}</div></section>
      <div className="toolbar"><NoteSearch keyword={keyword} onSearch={(value) => setSearchParams(value ? { q: value } : {})} /><Link className="button button--yellow" to="/notes/new" {...soundProps()}>{t.newNote}</Link><span className="toolbar__count">{visibleNotes.length} {language === 'id' ? 'catatan ditemukan' : 'notes found'}</span></div>
      {isLoading ? <p className="loading-state">{t.loading}</p> : <NotesList notes={visibleNotes} onDelete={onDelete} onArchive={onArchive} searchKeyword={keyword} dataTestId={archivedOnly ? 'archived-notes-list' : 'active-notes-list'} />}
    </main>
  );
}

export default NotesPage;
