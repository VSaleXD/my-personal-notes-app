import React from 'react';
import NoteItem from './NoteItem';

function NotesList({
  notes,
  onDelete,
  onArchive,
  searchKeyword = '',
  dataTestId = 'notes-list',
}) {
  const hasNotes = notes.length > 0;

  if (!hasNotes) {
    return (
      <div className="notes-list" data-testid={dataTestId}>
        <p
          className="notes-list__empty-message"
          data-testid={`${dataTestId}-empty`}
        >Belum ada catatan.</p>
      </div>
    );
  }

  const groups = notes.reduce((groupedNotes, note) => {
    const groupName = new Intl.DateTimeFormat('id-ID', {
      month: 'long',
      year: 'numeric',
    }).format(new Date(note.createdAt));

    if (!groupedNotes[groupName]) groupedNotes[groupName] = [];
    groupedNotes[groupName].push(note);
    return groupedNotes;
  }, {});

  return (
    <div className="notes-list notes-list--grouped" data-testid={dataTestId}>
      {Object.entries(groups).map(([groupName, groupNotes]) => (
        <section className="notes-group" key={groupName}>
          <header className="notes-group__header">
            <h3 className="notes-group__title">{groupName}</h3>
            <span className="notes-group__count">
              {groupNotes.length} catatan
            </span>
          </header>
          <div className="notes-group__items">
            {groupNotes.map((note) => (
              <NoteItem
                key={note.id}
                note={note}
                onDelete={onDelete}
                onArchive={onArchive}
                searchKeyword={searchKeyword}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default NotesList;
