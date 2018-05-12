import React, { Component, Fragment } from 'react';
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
  };

  render() {
    const images = this.props.isAuthenticated && this.props.user.savedImages.map((img) => {
      return <ImageItem  key={img.id || img._id} {...img} savedImage={this.props.isAuthenticated && this.props.user.savedImages.find(image => image.id === img.id || img._id )}/>
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
      <Fragment>
        {this.props.isAuthenticated && this.props.user.savedImages.length > 0 ? 
          <div>{masonry}</div> : <div className="no-images"> You have not saved images yet.</div>}
      </Fragment>
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
