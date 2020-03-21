import React from 'react';
import './userIndexPage.css';

class UserIndexPage extends React.Component {
    constructor(props) {
        super()
    }

    componentDidMount() {
      this.props.getUser(this.props.userId)
    }

    logout() {
        this.props.logout();
        this.props.history.push('/');
    }

    redirect() {
      let path = `user/${this.props.userId}`;
      this.props.history.push(path);
    }

    render() {
        return (
          <div id="indexPage">
            <h1 className="indexTitle">Welcome To Stock Wallet</h1>
            <p className="indexText">Your personal stock organization app</p>
            <div className="indexButtons">
              <button onClick={this.redirect.bind(this)}>Profile</button>
              <button onClick={this.logout.bind(this)}>Logout</button>
            </div>
          </div>
        );
    }
}

export default UserIndexPage;