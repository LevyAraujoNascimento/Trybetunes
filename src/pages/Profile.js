import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Profile extends React.Component {
  state = {
    name: '',
    email: '',
    img: '',
    desc: '',
    loading: '',
  };

  componentDidMount() {
    this.showUser();
  }

  showUser = () => {
    this.setState(
      () => (
        {
          loading: true,
        }
      ),
      async () => {
        const user = await getUser();
        this.setState(() => (
          {
            loading: false,
            name: user.name,
            email: user.email,
            img: user.image,
            desc: user.description,
          }
        ));
      },
    );
  };

  render() {
    const { name, email, img, desc, loading } = this.state;
    const text = 'Editar perfil';
    return (
      <div data-testid="page-profile">
        <Header />
        { loading ? <Loading /> : ''}
        <fieldset>
          <label htmlFor="userName">
            <p
              name="userName"
              id="userName"
            >
              { name }
            </p>
          </label>
          <label htmlFor="userEmail">
            <p
              name="userEmail"
              id="userEmail"
            >
              { email }
            </p>
          </label>
          <img src={ img } alt="Foto do Usuario" data-testid="profile-image" />
          <label htmlFor="userDesc">
            <p
              name="userDesc"
              id="userDesc"
            >
              { desc }
            </p>
          </label>
          <Link to="/profile/edit">{ text }</Link>
        </fieldset>
      </div>
    );
  }
}

export default Profile;
