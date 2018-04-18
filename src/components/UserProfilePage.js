import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUserInfo } from '../redux/actions/updateUserInfo';
import UpdateUserInfoForm from './UpdateUserInfoForm';
import { logout, setCurrentUser } from '../redux/actions/authActions';
import PageNotFound from './PageNotFound';

class UserProfilePage extends Component {
  constructor(props) {
    super(props);

  this.state = {
      isUserLegit: null
    }
  };
  
  componentWillMount() {
    const userId = this.props.location.pathname.split("/user/")[1];
    if (userId === this.props.auth.user.username){
      this.setState({isUserLegit: true})
    } else {
      this.setState({isUserLegit: false})
    };
  };

  render() {
    const { user } = this.props.auth;

    return (
      <div>
        { this.state.isUserLegit ? <UpdateUserInfoForm setCurrentUser={this.props.setCurrentUser} updateUserInfo={this.props.updateUserInfo} user={user} logout={this.props.logout} /> : <PageNotFound />}
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
