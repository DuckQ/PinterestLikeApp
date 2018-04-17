import React from 'react';
import NavigationBar from './NavigationBar';
import SignupModal from './SignupModal';
import LoginModal from './LoginModal';
import FlashMessageModal from './FlashMessageModal';


export default class App extends React.Component {
  render () {
    return (
      <div>
        <NavigationBar />
        <SignupModal />
        <LoginModal />
        <FlashMessageModal />
        {this.props.children}
      </div>
    )
  }
}
