import React from 'react';
import NavigationBar from './NavigationBar';
import SignupModal from './SignupModal';
import LoginModal from './LoginModal';


export default class App extends React.Component {
  render () {
    return (
      <div>
        <NavigationBar />
        <SignupModal />
        <LoginModal />
        {this.props.children}
      </div>
    )
  }
}
