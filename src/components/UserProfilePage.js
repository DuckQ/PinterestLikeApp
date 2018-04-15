import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUserInfo } from '../redux/actions/updateUserInfo';
import UpdateUserInfoForm from './UpdateUserInfoForm';
import { logout, setCurrentUser } from '../redux/actions/authActions';

class UserProfilePage extends Component {
  constructor(props) {
    super(props);
  
  };
  
  render() {
    const { user } = this.props.auth;

    return (
      <div>
        <UpdateUserInfoForm setCurrentUser={this.props.setCurrentUser} updateUserInfo={this.props.updateUserInfo} user={user} logout={this.props.logout} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
};

export default connect(mapStateToProps, {updateUserInfo, logout, setCurrentUser})(UserProfilePage);
