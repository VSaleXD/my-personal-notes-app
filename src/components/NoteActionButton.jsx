import React from 'react';

function NoteActionButton({ variant, onClick, 'data-testid': dataTestId, archived = false }) {
  const isDelete = variant === 'delete';
  const label = isDelete ? 'Hapus' : (archived ? 'Batal arsip' : 'Arsipkan');

  return (
    <button
      className={`note-item__${isDelete ? 'delete' : 'archive'}-button`}
      type="button"
      onClick={onClick}
      data-testid={dataTestId}
    >
      {label}
    </button>
  );
}

export default NoteActionButton;
