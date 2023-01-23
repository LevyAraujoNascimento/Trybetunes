import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  checkMusic = ({ target }) => {
    const { trackId, favoriteMusic } = this.props;
    if (target.checked) {
      favoriteMusic(trackId);
    }
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
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
        >
          Favorita
          <input
            type="checkbox"
            name="favorito"
            id="favorito"
            data-testid={ trackText }
            onChange={ this.checkMusic }
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
