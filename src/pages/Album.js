import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Album extends React.Component {
  state = {
    id: '',
    musics: [],
    artistName: '',
    collectionName: '',
    loading: false,
    favorited: [],
  };

  componentDidMount() {
    this.musicRequest();
  }

  musicRequest = async () => {
    const {
      match: { params: { id },
      } } = this.props;
    const listMusic = await getMusics(id);
    const favorited = await getFavoriteSongs();
    const { artistName, collectionName } = listMusic[0];
    this.setState(() => (
      {
        artistName,
        collectionName,
        id,
        musics: listMusic,
        favorited,
      }
    ));
  };

  favoriteMusic = async (trackId) => {
    const { musics } = this.state;
    const track = musics.find((element) => (element.trackId === trackId));
    this.setState(
      () => (
        {
          loading: true,
        }
      ),
      async () => {
        await addSong(track);
        const favorited = await getFavoriteSongs();
        this.setState(() => (
          {
            loading: false,
            favorited,
          }
        ));
      },
    );
  };

  unfavoriteMusic = async (trackId) => {
    const { musics } = this.state;
    const track = musics.find((element) => (element.trackId === trackId));
    this.setState(
      () => (
        {
          loading: true,
        }
      ),
      async () => {
        await removeSong(track);
        const favorited = await getFavoriteSongs();
        this.setState(() => (
          {
            loading: false,
            favorited,
          }
        ));
      },
    );
  };

  render() {
    const { id, artistName, collectionName, musics, loading, favorited } = this.state;
    const listMusic = musics.map((music) => {
      let checking = false;
      if (favorited.some((e) => (e.trackId === music.trackId))) {
        checking = true;
      }
      return (
        <li key={ music.trackId }>
          <MusicCard
            trackName={ music.trackName }
            previewUrl={ music.previewUrl }
            trackId={ music.trackId }
            favoriteMusic={ this.favoriteMusic }
            unfavoriteMusic={ this.unfavoriteMusic }
            wasChecked={ checking }
          />
        </li>
      );
    });
    listMusic.shift();
    return (
      <div data-testid="page-album">
        <Header />
        <h1 data-testid="artist-name">{ artistName }</h1>
        <h2 data-testid="album-name">{ collectionName }</h2>
        <h2>{ id }</h2>
        { loading ? <Loading /> : '' }
        <ul>
          { listMusic }
        </ul>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
