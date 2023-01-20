import React from 'react';
import Header from '../components/Header';
import ResultText from '../components/ResultText';
import Loading from './Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import CardAlbum from '../components/CardAlbum';

class Search extends React.Component {
  state = {
    searchKey: '',
    searchButton: true,
    loading: false,
    resultKey: '',
    result: false,
    resultAlbums: [],
    noResult: false,
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

  cleanInput = () => {
    this.setState(() => (
      { searchKey: '' }
    ));
  };

  searching = () => {
    const { searchKey } = this.state;
    this.cleanInput();
    this.setState(
      () => (
        {
          result: false,
          resultKey: searchKey,
          loading: true,
          noResult: false,
        }
      ),
      async () => {
        const albums = await searchAlbumsAPI(searchKey);
        this.setState(() => (
          {
            result: true,
            loading: false,
            resultAlbums: albums,
          }
        ));
        if (albums.length === 0) {
          this.setState(() => ({ noResult: true }));
        } else {
          this.setState(() => ({ noResult: false }));
        }
      },
    );
  };

  render() {
    const { searchButton, searchKey, loading, result, resultKey,
      resultAlbums, noResult } = this.state;
    const semResultado = 'Nenhum álbum foi encontrado';
    const listAlbum = resultAlbums.map((element) => (
      <li key={ element.collectionId }>
        <CardAlbum
          artName={ element.artistName }
          albumName={ element.collectionName }
          collecId={ element.collectionId }
        />
      </li>
    ));
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <fieldset>
            <input
              type="text"
              data-testid="search-artist-input"
              value={ searchKey }
              onChange={ this.searchTest }
            />
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ searchButton }
              onClick={ this.searching }
            >
              Pesquisar
            </button>
          </fieldset>
          { result ? <ResultText resultKey={ resultKey } /> : ''}
          { result ? <ul>{ listAlbum }</ul> : ''}
          { noResult ? <p>{ semResultado }</p> : ''}
          { loading ? <Loading /> : '' }
        </form>
      </div>
    );
  }
}

export default Search;
