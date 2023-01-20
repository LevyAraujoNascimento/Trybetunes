import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  state = {
    id: '',
    musics: [],
    artistName: '',
    collectionName: '',
  };

  componentDidMount() {
    this.musicRequest();
  }

  musicRequest = async () => {
    const {
      match: { params: { id },
      } } = this.props;
    const listMusic = await getMusics(id);
    const { artistName, collectionName } = listMusic[0];
    this.setState(() => (
      {
        artistName,
        collectionName,
        id,
        musics: listMusic,
      }
    ));
    console.log(listMusic);
  };

  render() {
    const { id, artistName, collectionName, musics } = this.state;
    const listMusic = musics.map((music) => (
      <li key={ music.trackId }>
        <MusicCard
          trackName={ music.trackName }
          previewUrl={ music.previewUrl }
        />
      </li>
    ));
    listMusic.shift();
    return (
      <div data-testid="page-album">
        <Header />
        <h1 data-testid="artist-name">{ artistName }</h1>
        <h2 data-testid="album-name">{ collectionName }</h2>
        <h2>{ id }</h2>
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
