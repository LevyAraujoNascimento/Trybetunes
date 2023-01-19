import React from 'react';
import { Link } from 'react-router-dom';
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
        <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
        <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        <p data-testid="header-user-name">{ name }</p>
        { loading ? <Loading /> : '' }
      </header>
    );
  }
}

export default Header;
