import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  checkMusic = ({ target }) => {
    const { trackId, favoriteMusic, unfavoriteMusic } = this.props;
    if (target.checked) {
      favoriteMusic(trackId);
    } else {
      unfavoriteMusic(trackId);
    }
  };

  render() {
    const { trackName, previewUrl, trackId, wasChecked } = this.props;
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
            checked={ wasChecked }
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
  unfavoriteMusic: PropTypes.func,
  wasChecked: PropTypes.bool,
};

MusicCard.defaultProps = {
  trackName: null,
  previewUrl: null,
  trackId: null,
  favoriteMusic: null,
  unfavoriteMusic: null,
  wasChecked: null,
};

export default MusicCard;
