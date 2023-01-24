import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';

class Favorites extends React.Component {
  state = {
    loading: false,
    favorited: [],
  };

  componentDidMount() {
    this.favoritedSongs();
  }

  favoritedSongs = async () => {
    this.setState(
      () => (
        {
          loading: true,
        }
      ),
      async () => {
        const list = await getFavoriteSongs();
        this.setState(() => (
          {
            loading: false,
            favorited: list,
          }
        ));
      },
    );
  };

  unfavoriteMusic = async (trackId) => {
    const { favorited } = this.state;
    const track = favorited.find((element) => (element.trackId === trackId));
    this.setState(
      () => (
        {
          loading: true,
        }
      ),
      async () => {
        await removeSong(track);
        const wasFavorited = await getFavoriteSongs();
        this.setState(() => (
          {
            loading: false,
            favorited: wasFavorited,
          }
        ));
      },
    );
  };

  render() {
    const { favorited, loading } = this.state;
    console.log(favorited);
    const listMusic = favorited.map((music) => (
      <li key={ music.trackId }>
        <MusicCard
          trackName={ music.trackName }
          previewUrl={ music.previewUrl }
          trackId={ music.trackId }
          unfavoriteMusic={ this.unfavoriteMusic }
          wasChecked
        />
      </li>
    ));
    return (
      <div data-testid="page-favorites">
        <Header />
        { loading ? <Loading /> : '' }
        { listMusic }
      </div>
    );
  }
}

export default Favorites;
