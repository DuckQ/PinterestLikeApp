import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import StackGrid from "react-stack-grid";
import Masonry from 'react-masonry-component';
import { Link } from 'react-router-dom'; 
import ImageItem from './ImageItem';
import { connect } from 'react-redux';
import { startUpdateImages, updatePosition } from '../redux/actions/updateImages';
import { setImageContainerState } from '../redux/actions/checkImageContainerState';
import { setIsLoginRequired } from '../redux/actions/modalActions';
import { updateUserInfo } from '../redux/actions/updateUserInfo';
import { logout, setCurrentUser } from '../redux/actions/authActions';
import { addFlashMessage } from '../redux/actions/flashMessage';
import { setShowFlashMessage } from '../redux/actions/modalActions';
import jwtDecode from 'jwt-decode';
import PageIsLoading from './PageIsLoading';

var masonryOptions = {
  itemSelector: '.grid-item',
  columnWidth: '.grid-sizer',
  percentPosition: true
};

export class ImageContainer extends Component {
  constructor(props) {
    super(props);

    this.handleScroll = this.handleScroll.bind(this);

  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.timer = setInterval(() => 
      this.checkIfComponentIsReady(), 500);
    this.timer2 = setInterval(() => 
      this.checkIfNotStandartHeight(), 500)
  };

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    clearInterval(this.timer);
    clearInterval(this.timer2);
    this.props.setImageContainerState();
  };

  // Check if masonry layout is ready to be displayed 
  checkIfComponentIsReady() {
    if (this.props.componentIsReady) return;
    if (document.body.offsetHeight > window.innerHeight + window.pageYOffset) {
      // if component is ready, it changes state to true
      this.props.setImageContainerState()
    }
  };

  // In case if user has large height of viewport and scroll event cant be applied
  // then it loads more images manually
  // It also checks if request was finished, to ensure that function wont be triggered early
  checkIfNotStandartHeight() {
    if ((window.innerHeight + window.pageYOffset ) >= document.body.offsetHeight && this.props.fetchIsFinished) { 
      this.props.startUpdateImages(null, this.props.position);
      this.props.updatePosition();
    }
  }

  // Display more images on scroll event if necessary
  handleScroll() {
    if ((window.innerHeight + window.pageYOffset ) >= document.body.offsetHeight - 250) {
      this.props.startUpdateImages(null, this.props.position);
      this.props.updatePosition();
    }
  };

  handleClick(img) {
    const { id } = this.props.user;
    // check if user is authenticated
    if (!id) {
      this.props.setIsLoginRequired();
    } else {
      this.props.updateUserInfo(id, {savedImage: JSON.stringify(img)}, localStorage.jwtToken)
        .then(response => {
          if (response.status === 401) {
            this.props.logout();
            this.props.addFlashMessage({
              type: 'error',
              text: 'The authentication session has expired. Please sign-in again.'
            });
            this.props.setShowFlashMessage();
          };
          return response.json(); 
        })
        .then(response => {
          this.props.setCurrentUser(jwtDecode(response.token));
          localStorage.setItem('jwtToken', response.token);
        })
    }
  }

  render() {
    const images = this.props.images.map((img) => {
      return <ImageItem  key={img.id || img._id} {...img} onClick={() => this.handleClick(img)} savedImage={this.props.isAuthenticated && this.props.user.savedImages.find(image => image.id === img.id || img._id )}/>
    });

    const masonry = (
      <Masonry
        ref={function(c) {this.masonry = this.masonry || c.masonry;}.bind(this)}
        className={'grid'}
        options={masonryOptions}     
      >
        <div className="grid-sizer"></div>
        {images}
      </Masonry>
    );

    return (
      <div>
        <div className={!this.props.componentIsReady ? "hide" : undefined}>
          {masonry}
        </div>
        <div className={`loading ${this.props.componentIsReady && "hide"}`} >
          <PageIsLoading />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    images: state.updateImages.images,
    position: state.updateImages.position,
    componentIsReady: state.imageContainerState.componentIsReady,
    fetchIsFinished: state.imageContainerState.fetchIsFinished,
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated
  };
};

export default connect(mapStateToProps, {startUpdateImages, updatePosition, setImageContainerState, setIsLoginRequired, updateUserInfo, setCurrentUser, logout, addFlashMessage, setShowFlashMessage})(ImageContainer)
