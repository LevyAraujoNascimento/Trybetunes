import React from 'react';

class CardAlbum extends React.Component {
  render() {
    const { artName, collecId } = this.props;
    return (
      <fieldset>
        <h1>{ artName }</h1>
        <h2>{ collecId }</h2>
      </fieldset>
    );
  }
}

CardAlbum.propTypes = {
  artName: PropTypes.string.isRequired,
  collecId: PropTypes.number.isRequired,
};

export default CardAlbum;
