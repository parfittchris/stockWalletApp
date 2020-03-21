import React from 'react';
import { withRouter } from 'react-router';
import './splashPage.css'

class SplashPage extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
      type: 'Login'
    };

    this.userLogin = this.userLogin.bind(this);
    this.userSignUp = this.userSignUp.bind(this);
  }

  componentWillUnmount() {
    this.props.removeErrors();
  }

  userSignUp(e) {
    e.preventDefault();
    this.props.signUp({
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      money: 5000
    });
  }

  userLogin(e) {
    if (e) {
      e.preventDefault();
    }
    this.props.login({
      username: this.state.username,
      password: this.state.password
    });
  }

  demoLogin(e) {
    e.preventDefault();
    this.props.login({ username: 'demoUser', password: 'password123' });
  }

  // Renders sign in or login form based on current state
  changeForm() {
    let word = this.state.type === 'Login' ? 'Sign Up' : 'Login';

    this.setState({
      type: word,
      username: '',
      email: '',
      password: ''
    });

    this.props.removeErrors()
  }

  handleChange(e) {
    let change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
  }


  // Converts errors in state into error that will be shown on screen
  renderErrors() {
    let bubble = document.getElementById('errorsBubble');

    if (bubble) {
      bubble.innerHTML = '';
      for (let i = 0; i < this.props.errors.length; i++) {
        let error = document.createElement('p');
        error.classList.add('error');
        error.innerHTML = `<li>${this.props.errors[i]}</li>`;
        bubble.appendChild(error);
      }
    }
  }

  render() {
    this.renderErrors()
    
    if (this.state.type === 'Login') {
      return (
        <div id='splashPageOverall'>
          <div id='splashPageComponent'>
            <h1>Stock Wallet</h1>
            <form onSubmit={this.userLogin}>
              <p>Login</p>
              <div className='startForm'>
                <input
                  type='text'
                  className='homeInput'
                  id='loginName'
                  name='username'
                  placeholder='Username'
                  onChange={this.handleChange.bind(this)}
                  autoComplete='off'
                />
                <input
                  type='password'
                  className='homeInput'
                  id='loginPassword'
                  name='password'
                  placeholder='Password'
                  onChange={this.handleChange.bind(this)}
                  autoComplete='off'
                />
              </div>
              <div>
                <button className='signUpButton'>{this.state.type}</button>
                <button
                  className='signUpButton'
                  onClick={this.demoLogin.bind(this)}
                >
                  Demo User
                </button>
              </div>
            </form>
            <p>
              Not a user? Sign up
              <a className='link' onClick={this.changeForm.bind(this)}>
                {' '}
                here!
              </a>
            </p>
          </div>
          <ul id='errorsBubble'></ul>
        </div>
      );
    } else {
      return (
        <div id='splashPageOverall'>
          <div id='splashPageComponent'>
            <h1>Stock Wallet</h1>
            <form onSubmit={this.userSignUp}>
              <p>Sign Up</p>
              <div className='startForm'>
                <input
                  type='text'
                  className='homeInput'
                  id='loginName'
                  name='username'
                  placeholder='Username'
                  onChange={this.handleChange.bind(this)}
                  autoComplete='off'
                />
                <input
                  type='text'
                  className='homeInput'
                  id='email'
                  name='email'
                  placeholder='Email'
                  onChange={this.handleChange.bind(this)}
                  autoComplete='off'
                />
                <input
                  type='password'
                  className='homeInput'
                  id='loginPassword'
                  name='password'
                  placeholder='Password'
                  onChange={this.handleChange.bind(this)}
                  autoComplete='off'
                />
              </div>
              <div>
                <button className='signUpButton'>{this.state.type}</button>
                <button
                  className='signUpButton'
                  onClick={this.demoLogin.bind(this)}
                >
                  Demo User
                </button>
              </div>
            </form>
            <p>
              Already a user? Login
              <a className='link' onClick={this.changeForm.bind(this)}>
                {' '}
                here!
              </a>
            </p>
          </div>
          <ul id='errorsBubble'></ul>
        </div>
      );
    }
  }
}


export default withRouter(SplashPage)