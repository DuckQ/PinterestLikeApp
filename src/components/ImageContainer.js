import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import StackGrid from "react-stack-grid";
import Masonry from 'react-masonry-component';
import { Link } from 'react-router-dom'; 
import ImageItem from './ImageItem';
import { connect } from 'react-redux';
import { startUpdateImages, updatePosition } from '../redux/actions/updateImages';
import { setImageContainerState } from '../redux/actions/checkImageContainerState';
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
  };

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    clearInterval(this.timer);
    this.props.setImageContainerState();
  };

  // Check if masonry layout is ready to be displayed 
  checkIfComponentIsReady() {
    if (this.props.componentIsReady) return;
    if (document.body.offsetHeight > window.innerHeight + window.pageYOffset) {
      // if component is ready, it changes state to true
      this.props.setImageContainerState()
    }
  }

  // Display more images on scroll event if necessary
  handleScroll() {
    if ((window.innerHeight + window.pageYOffset ) >= document.body.offsetHeight - 250) {
      this.props.startUpdateImages(null, this.props.position);
      this.props.updatePosition();
    }
  };


  render() {

    const images = this.props.images.map((img) => {
      return <ImageItem  key={img.id || img._id} {...img}/>
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
    componentIsReady: state.imageContainerState.componentIsReady
  };
};

export default connect(mapStateToProps, {startUpdateImages, updatePosition, setImageContainerState})(ImageContainer)
