import React from 'react';
import PropTypes from 'prop-types';

class Album extends React.Component {
  render() {
    const { id } = this.props.match.params;
    return (
      <div data-testid="page-album">
        Album
        { id }
      </div>
    );
  }
}

Album.propTypes = {
  id: PropTypes.string,
};

export default Album;
