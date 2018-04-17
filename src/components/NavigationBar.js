import { NavLink } from 'react-router-dom'; 
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setIsRegistering, setIsLogining } from '../redux/actions/modalActions';
import { logout } from '../redux/actions/authActions';
import SearchBar from './SearchBar';

class NavigationBar extends Component {
  constructor(props) {
    super(props);

    this.onLoginClick = this.onLoginClick.bind(this);
    this.onSignupClick = this.onSignupClick.bind(this);
    this.onLogoutClick = this.onLogoutClick.bind(this);
  };

  onLoginClick() {
    this.props.setIsLogining();
  };

  onSignupClick() {
    this.props.setIsRegistering();
  };

  onLogoutClick() {
    this.props.logout();
  };
  
  render() {
    const { isAuthenticated, user } = this.props.auth;
    
    const userLinks = (
      <ul>
        <li><NavLink to={user.username ? `/user/${user.username}` : '/'} ><div className="nav-btn" >{user.username}</div></NavLink></li>
        <li><div className="nav-btn" onClick={this.onLogoutClick} >Logout</div></li>
      </ul>
    );

    const guestLinks = (
      <ul>
        <li><div className="nav-btn" onClick={this.onLoginClick} >Login</div></li>
        <li><div className="nav-btn" onClick={this.onSignupClick} >Sign Up</div></li>
      </ul>
    );

    return (
      <nav>
        <div className="navigation" >
          <div className="navigation-item item1" ><NavLink to="/" ><div className="nav-btn home-btn" >Home</div></NavLink></div>
          <div className="navigation-item item2" ><SearchBar /></div>
          <div className="navigation-item item3" >{ isAuthenticated ? userLinks : guestLinks}</div>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, { setIsRegistering, setIsLogining, logout })(NavigationBar);