import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { trackName, previewUrl, trackId, favoriteMusic } = this.props;
    const trackText = `checkbox-music-${trackId}`;
    return (
      <fieldset>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label
          htmlFor="favorito"
          data-testid={ trackText }
        >
          Favorita
          <input
            type="checkbox"
            name="favorito"
            id="favorito"
            onCheck={ () => favoriteMusic(trackId) }
          />
        </label>
      </fieldset>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  trackId: PropTypes.number,
  favoriteMusic: PropTypes.func,
};

MusicCard.defaultProps = {
  trackName: null,
  previewUrl: null,
  trackId: null,
  favoriteMusic: null,
};

export default MusicCard;
