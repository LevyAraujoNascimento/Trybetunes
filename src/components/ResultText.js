import React from 'react';
import PropTypes from 'prop-types';

class ResultText extends React.Component {
  render() {
    const { resultKey } = this.props;
    const texto = `Resultado de álbuns de: ${resultKey}`;
    return (
      <h2>
        { texto }
      </h2>
    );
  }
}

ResultText.propTypes = {
  resultKey: PropTypes.string.isRequired,
};

export default ResultText;
