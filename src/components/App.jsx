import React from 'react';
import {
  BrowserRouter,
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { getInitialData, showFormattedDate } from '../utils';
import NoteInput from './NoteInput';
import NotesList from './NotesList';
import NoteSearch from './NoteSearch';
import { playNavigationSound, soundProps } from '../utils/sound';

function Header({ notes }) {
  const location = useLocation();
  const activeCount = notes.filter((note) => !note.archived).length;
  const archivedCount = notes.filter((note) => note.archived).length;

  return (
    <header className="site-header">
      <Link className="brand" to="/" {...soundProps()}>
        <span className="brand__mark">✦</span>
        <span>NOTEBOOK</span>
      </Link>
      <nav className="main-nav" aria-label="Navigasi utama">
        <NavLink className="main-nav__link" to="/" end {...soundProps()}>
          Semua <span>{activeCount}</span>
        </NavLink>
        <NavLink className="main-nav__link" to="/archive" {...soundProps()}>
          Arsip <span>{archivedCount}</span>
        </NavLink>
      </nav>
      {location.pathname !== '/notes/new' && (
        <Link className="button button--yellow header-action" to="/notes/new" {...soundProps()}>
          + Catatan baru
        </Link>
      )}
    </header>
  );
}

function NotesPage({ notes, onDelete, onArchive, archivedOnly = false }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('q') || '';
  const visibleNotes = notes
    .filter((note) => note.archived === archivedOnly)
    .filter((note) => note.title.toLowerCase().includes(keyword.trim().toLowerCase()))
    .sort((first, second) => new Date(second.createdAt) - new Date(first.createdAt));

  const onSearch = (value) => {
    if (value) setSearchParams({ q: value });
    else setSearchParams({});
  };

  return (
    <main className="page-shell">
      <section className="page-intro">
        <div>
          <p className="eyebrow">{archivedOnly ? 'Koleksi tersimpan' : 'Ruang pikiranmu'}</p>
          <h1>{archivedOnly ? 'Arsip catatan' : 'Catatan saya'}</h1>
          <p className="page-intro__description">
            {archivedOnly
              ? 'Catatan lama yang tetap ingin kamu simpan.'
              : 'Tulis ide, rencana, dan hal penting tanpa ribet.'}
          </p>
        </div>
        <div className="page-intro__sticker">{archivedOnly ? 'SAVED!' : 'LET’S\nWRITE!'}</div>
      </section>
      <div className="toolbar">
        <NoteSearch keyword={keyword} onSearch={onSearch} />
        <span className="toolbar__count">{visibleNotes.length} catatan ditemukan</span>
      </div>
      <section aria-labelledby="notes-title">
        <h2 id="notes-title" className="section-title">
          {archivedOnly ? 'Arsip' : 'Terbaru'} <span>({visibleNotes.length})</span>
        </h2>
        <NotesList
          notes={visibleNotes}
          onDelete={onDelete}
          onArchive={onArchive}
          searchKeyword={keyword}
          dataTestId={archivedOnly ? 'archived-notes-list' : 'active-notes-list'}
        />
      </section>
    </main>
  );
}

function DetailPage({ notes, onDelete, onArchive }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const note = notes.find((item) => String(item.id) === id);

  if (!note) return <NotFoundPage />;

  const deleteNote = () => {
    onDelete(note.id);
    navigate(note.archived ? '/archive' : '/');
  };

  return (
    <main className="page-shell detail-page">
      <button className="back-link" type="button" onClick={() => { playNavigationSound(); navigate(-1); }} {...soundProps(false)}>
        ← Kembali ke daftar
      </button>
      <article className="note-detail">
        <div className="note-detail__topline">
          <span className="note-detail__label">{note.archived ? 'TERARSIP' : 'CATATAN AKTIF'}</span>
          <span>{showFormattedDate(note.createdAt)}</span>
        </div>
        <h1>{note.title}</h1>
        <div className="note-detail__body">{note.body}</div>
        <div className="note-detail__actions">
          <button className="button button--coral" type="button" onClick={deleteNote}>Hapus catatan</button>
          <button className="button button--blue" type="button" onClick={() => onArchive(note.id)}>
            {note.archived ? 'Kembalikan dari arsip' : 'Arsipkan catatan'}
          </button>
        </div>
      </article>
    </main>
  );
}

function NewNotePage({ addNote }) {
  const navigate = useNavigate();
  const saveNote = (note) => {
    addNote(note);
    navigate('/');
  };

  return (
    <main className="page-shell new-note-page">
      <Link className="back-link" to="/" {...soundProps()}>← Kembali ke daftar</Link>
      <div className="new-note-layout">
        <div>
          <p className="eyebrow">Catatan baru</p>
          <h1>Tuangkan idemu.</h1>
          <p className="page-intro__description">Tidak harus sempurna. Yang penting mulai dulu.</p>
        </div>
        <NoteInput addNote={saveNote} />
      </div>
    </main>
  );
}

function NotFoundPage() {
  return (
    <main className="page-shell not-found">
      <span className="not-found__number">404</span>
      <h1>Halaman ini tersesat.</h1>
      <p>Mungkin catatannya juga sedang mencari jalan pulang.</p>
      <Link className="button button--yellow" to="/" {...soundProps()}>Kembali ke beranda</Link>
    </main>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { notes: getInitialData() };
    this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onArchiveHandler = this.onArchiveHandler.bind(this);
  }

  onAddNoteHandler({ title, body }) {
    this.setState((prevState) => ({
      notes: [...prevState.notes, {
        id: String(+new Date()),
        title,
        body,
        createdAt: new Date().toISOString(),
        archived: false,
      }],
    }));
  }

  onDeleteHandler(id) {
    this.setState((prevState) => ({
      notes: prevState.notes.filter((note) => note.id !== id),
    }));
  }

  onArchiveHandler(id) {
    this.setState((prevState) => ({
      notes: prevState.notes.map((note) => (
        note.id === id ? { ...note, archived: !note.archived } : note
      )),
    }));
  }

  render() {
    const { notes } = this.state;
    return (
      <BrowserRouter>
        <div className="note-app" data-testid="note-app">
          <Header notes={notes} />
          <Routes>
            <Route path="/" element={<NotesPage notes={notes} onDelete={this.onDeleteHandler} onArchive={this.onArchiveHandler} />} />
            <Route path="/archive" element={<NotesPage notes={notes} onDelete={this.onDeleteHandler} onArchive={this.onArchiveHandler} archivedOnly />} />
            <Route path="/notes/new" element={<NewNotePage addNote={this.onAddNoteHandler} />} />
            <Route path="/notes/:id" element={<DetailPage notes={notes} onDelete={this.onDeleteHandler} onArchive={this.onArchiveHandler} />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
