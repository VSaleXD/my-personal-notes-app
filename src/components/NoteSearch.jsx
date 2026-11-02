import React from 'react';

class NoteSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchKeyword: props.keyword || '' };
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  componentDidUpdate(previousProps) {
    if (previousProps.keyword !== this.props.keyword
      && this.props.keyword !== this.state.searchKeyword) {
      this.setState({ searchKeyword: this.props.keyword });
    }
  }

  onChangeHandler(event) {
    const searchKeyword = event.target.value;
    this.setState({ searchKeyword });
    this.props.onSearch(searchKeyword);
  }

  render() {
    return (
      <div className="note-search" data-testid="note-search">
        <input
          type="search"
          placeholder="Cari catatan ..."
          value={this.state.searchKeyword}
          onChange={this.onChangeHandler}
          aria-label="Cari catatan"
          data-testid="note-search-input"
        />
      </div>
    );
  }
}

export default NoteSearch;
