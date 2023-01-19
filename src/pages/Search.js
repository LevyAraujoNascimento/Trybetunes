import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    searchKey: '',
    searchButton: true,
  };

  searchTest = ({ target }) => {
    const limit = 2;
    const name = target.value;
    this.setState(() => ({
      searchKey: name,
    }));
    if (name.length >= limit) {
      this.setState(() => ({
        searchButton: false,
      }));
    } else {
      this.setState(() => ({
        searchButton: true,
      }));
    }
  };

  render() {
    const { searchButton, searchKey } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <fieldset>
            <input
              type="text"
              data-testid="search-artist-input"
              onChange={ this.searchTest }
            />
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ searchButton }
            >
              Pesquisar
            </button>
            <p>{ searchKey }</p>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default Search;
