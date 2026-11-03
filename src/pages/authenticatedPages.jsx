import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import { addNote, archiveNote, deleteNote, getActiveNotes, getArchivedNotes, unarchiveNote } from '../utils/network-data';
import DetailPage, { NotFoundPage } from './detailPage';
import NewNotePage from './newNotePage';
import NotesPage from './notesPage';

function AuthenticatedPages({ user, onLogout }) {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const refreshNotes = async () => {
    setIsLoading(true);
    const [active, archived] = await Promise.all([getActiveNotes(), getArchivedNotes()]);
    setNotes([...(active.data || []), ...(archived.data || [])]);
    setIsLoading(false);
  };

  useEffect(() => { refreshNotes(); }, []);

  const handleAdd = async (note) => {
    const result = await addNote(note);
    if (result.error) return false;
    await refreshNotes();
    return true;
  };

  const handleDelete = async (id) => {
    const result = await deleteNote(id);
    if (!result.error) setNotes((current) => current.filter((note) => note.id !== id));
  };

  const handleArchive = async (id) => {
    const note = notes.find((item) => item.id === id);
    const result = note.archived ? await unarchiveNote(id) : await archiveNote(id);
    if (!result.error) setNotes((current) => current.map((item) => (item.id === id ? { ...item, archived: !item.archived } : item)));
  };

  return <div className="note-app"><AppHeader notes={notes} user={user} onLogout={onLogout} /><Routes><Route path="/" element={<NotesPage notes={notes} onDelete={handleDelete} onArchive={handleArchive} isLoading={isLoading} />} /><Route path="/archive" element={<NotesPage notes={notes} onDelete={handleDelete} onArchive={handleArchive} archivedOnly isLoading={isLoading} />} /><Route path="/notes/new" element={<NewNotePage onAdd={handleAdd} />} /><Route path="/notes/:id" element={<DetailPage notes={notes} onDelete={handleDelete} onArchive={handleArchive} />} /><Route path="/login" element={<Navigate to="/" replace />} /><Route path="*" element={<NotFoundPage />} /></Routes></div>;
}

export default AuthenticatedPages;
