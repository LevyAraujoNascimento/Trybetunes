import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class CardAlbum extends React.Component {
  render() {
    const { artName, albumName, collecId } = this.props;
    const link = `/album/${collecId}`;
    const teste = `link-to-album-${collecId}`;
    return (
      <Link to={ link } data-testid={ teste }>
        <fieldset>
          <h1>{ albumName }</h1>
          <h2>{ artName }</h2>
        </fieldset>
      </Link>
    );
  }
}

CardAlbum.propTypes = {
  artName: PropTypes.string.isRequired,
  albumName: PropTypes.string.isRequired,
  collecId: PropTypes.number.isRequired,
};

export default CardAlbum;
