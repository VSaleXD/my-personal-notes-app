import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLanguage } from '../contexts/AppContexts';
import { showFormattedDate } from '../utils';
import { playNavigationSound, soundProps } from '../utils/sound';

function DetailPage({ notes, onDelete, onArchive }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const note = notes.find((item) => String(item.id) === id);
  if (!note) return <NotFoundPage />;

  return (
    <main className="page-shell detail-page">
      <button className="back-link" type="button" onClick={() => { playNavigationSound(); navigate(-1); }} {...soundProps(false)}>← {language === 'id' ? 'Kembali ke daftar' : 'Back to notes'}</button>
      <article className="note-detail"><div className="note-detail__topline"><span className="note-detail__label">{note.archived ? 'TERARSIP' : 'CATATAN AKTIF'}</span><span>{showFormattedDate(note.createdAt)}</span></div><h1>{note.title}</h1><div className="note-detail__body">{note.body}</div><div className="note-detail__actions"><button className="button button--coral" type="button" onClick={async () => { await onDelete(note.id); navigate(note.archived ? '/archive' : '/'); }}>{language === 'id' ? 'Hapus catatan' : 'Delete note'}</button><button className="button button--blue" type="button" onClick={() => onArchive(note.id)}>{note.archived ? 'Kembalikan dari arsip' : 'Arsipkan catatan'}</button></div></article>
    </main>
  );
}

function NotFoundPage() {
  return <main className="page-shell not-found"><span className="not-found__number">404</span><h1>Halaman ini tersesat.</h1></main>;
}

export { NotFoundPage };
export default DetailPage;
