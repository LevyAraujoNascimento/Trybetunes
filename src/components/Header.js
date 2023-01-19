import React from 'react';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  state = {
    loading: false,
    name: '',
  };

  componentDidMount() {
    this.request();
  }

  request = async () => {
    this.setState(
      () => (
        { loading: true }
      ),
      async () => {
        const user = await getUser();
        this.setState(() => (
          {
            loading: false,
            name: user.name,
          }
        ));
      },
    );
  };

  render() {
    const { loading, name } = this.state;
    return (
      <header
        data-testid="header-component"
      >
        <p data-testid="header-user-name">{ name }</p>
        { loading ? <Loading /> : '' }
      </header>
    );
  }
}

export default Header;
