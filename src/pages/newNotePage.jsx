import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NoteInput from '../components/NoteInput';
import { useLanguage } from '../contexts/AppContexts';
import { soundProps } from '../utils/sound';

function NewNotePage({ onAdd }) {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const saveNote = async (note) => {
    if (await onAdd(note)) navigate('/');
  };

  return <main className="page-shell new-note-page"><Link className="back-link" to="/" {...soundProps()}>← {language === 'id' ? 'Kembali ke daftar' : 'Back to notes'}</Link><div className="new-note-layout"><div><p className="eyebrow">{language === 'id' ? 'Catatan baru' : 'New note'}</p><h1>{language === 'id' ? 'Tuangkan idemu.' : 'Put your ideas down.'}</h1></div><NoteInput addNote={saveNote} /></div></main>;
}

export default NewNotePage;
