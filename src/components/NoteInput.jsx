import React from 'react';

class NoteInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
      error: '',
    };

    this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
    this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onTitleChangeEventHandler(event) {
    this.setState({ title: event.target.value.slice(0, 50) });
  }

  onBodyChangeEventHandler(event) {
    this.setState({ body: event.target.value, error: '' });
  }

  onSubmitEventHandler(event) {
    event.preventDefault();

    if (this.state.body.trim().length < 10) {
      this.setState({ error: 'Isi catatan harus memiliki minimal 10 karakter.' });
      return;
    }

    this.props.addNote({
      title: this.state.title,
      body: this.state.body,
    });
    this.setState({ title: '', body: '', error: '' });
  }

  render() {
    const remainingChars = 50 - this.state.title.length;
    const counterClassName = remainingChars < 10
      ? 'note-input__title__char-limit note-input__title__char-limit--warn'
      : 'note-input__title__char-limit';

    return (
      <div className="note-input" data-testid="note-input">
        <h2>Buat catatan</h2>

        <form
          onSubmit={this.onSubmitEventHandler}
          data-testid="note-input-form"
        >
          <p
            className={counterClassName}
            data-testid="note-input-title-remaining"
          >
            Sisa karakter: {remainingChars}
          </p>
          <input
            className="note-input__title"
            type="text"
            placeholder="Ini adalah judul ..."
            value={this.state.title}
            onChange={this.onTitleChangeEventHandler}
            required
            data-testid="note-input-title-field"
          />
          <textarea
            className="note-input__body"
            placeholder="Tuliskan catatanmu di sini ..."
            value={this.state.body}
            onChange={this.onBodyChangeEventHandler}
            required
            data-testid="note-input-body-field"
          />
          <button type="submit" data-testid="note-input-submit-button">
            Buat
          </button>
        </form>
      </div>
    );
  }
}

export default NoteInput;
