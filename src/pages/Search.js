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
          result: true,
          resultKey: searchKey,
          loading: true,
        }
      ),
      async () => {
        const albums = await searchAlbumsAPI(searchKey);
        this.setState(() => (
          {
            loading: false,
            resultAlbums: albums,
          }
        ));
      },
    );
  };

  render() {
    const { searchButton, searchKey, loading, result, resultKey,
      resultAlbums } = this.state;
    const listAlbum = resultAlbums.map((element) => (
      <li key={ element.collectionId }>
        <CardAlbum
          artName={ element.artistId }
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
          { loading ? <Loading /> : '' }
          <ul>
            { listAlbum }
          </ul>
        </form>
      </div>
    );
  }
}

export default Search;
