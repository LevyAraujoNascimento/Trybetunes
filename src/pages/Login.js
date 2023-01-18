import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  state = {
    name: '',
    startButton: true,
    loading: false,
    redirect: false,
  };

  startTest = ({ target }) => {
    const limit = 3;
    const name = target.value;
    this.setState(() => ({
      name,
    }));
    if (name.length >= limit) {
      this.setState(() => ({
        startButton: false,
      }));
    } else {
      this.setState(() => ({
        startButton: true,
      }));
    }
  };

  saveUser = async () => {
    const { name } = this.state;
    const user = {
      name,
    };
    this.setState(
      { loading: true },
      async () => {
        await createUser(user);
        this.setState({
          loading: false,
          redirect: true,
        });
      },
    );
  };

  render() {
    const { startButton, loading, redirect } = this.state;
    return (
      <form data-testid="page-login">
        <fieldset>
          <input
            type="text"
            data-testid="login-name-input"
            onChange={ this.startTest }
          />
          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={ startButton }
            onClick={ this.saveUser }
          >
            Entrar
          </button>
        </fieldset>
        { loading ? <Loading /> : ''}
        { redirect ? <Redirect to="search" /> : ''}
      </form>
    );
  }
}

export default Login;
