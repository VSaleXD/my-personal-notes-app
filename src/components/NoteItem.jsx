import React from 'react';
import { Link } from 'react-router-dom';
import { showFormattedDate } from '../utils';
import NoteActionButton from './NoteActionButton';
import { cardSoundProps } from '../utils/sound';

function highlightText(text, keyword) {
  if (!keyword.trim()) return text;
  const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = text.split(new RegExp(`(${escapedKeyword})`, 'gi'));
  return parts.map((part, index) => (
    part.toLowerCase() === keyword.toLowerCase()
      ? <mark key={`${part}-${index}`}>{part}</mark>
      : part
  ));
}

function NoteItem({ note, onDelete, onArchive, searchKeyword = '' }) {
  return (
    <article className="note-item" data-testid="note-item" data-note-id={note?.id}>
      <Link className="note-item__content" to={`/notes/${note.id}`} {...cardSoundProps()}>
        <span className="note-item__number">#{String(note.id).slice(-3)}</span>
        <h3 className="note-item__title" data-testid="note-item-title">
          {highlightText(note.title, searchKeyword)}
        </h3>
        <p className="note-item__date" data-testid="note-item-date">{showFormattedDate(note.createdAt)}</p>
        <p className="note-item__body" data-testid="note-item-body">{highlightText(note.body, searchKeyword)}</p>
        <span className="note-item__read-more">Baca catatan →</span>
      </Link>
      <div className="note-item__action" data-testid="note-item-action">
        <NoteActionButton variant="delete" onClick={() => onDelete(note.id)} data-testid="note-item-delete-button" />
        <NoteActionButton variant="archive" onClick={() => onArchive(note.id)} data-testid="note-item-archive-button" archived={note.archived} />
      </div>
    </article>
  );
}

export default NoteItem;
export { highlightText };
