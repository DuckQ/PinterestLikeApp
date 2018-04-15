import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import StackGrid from "react-stack-grid";
import Masonry from 'react-masonry-component';
import { Link } from 'react-router-dom'; 
import ImageItem from './ImageItem';
import { connect } from 'react-redux';
import { startUpdateImages, updatePosition } from '../redux/actions/updateImages';

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
  };

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  };

  handleScroll() {
    if ((window.innerHeight + window.pageYOffset ) >= document.body.offsetHeight - 250) {
      this.props.startUpdateImages(null, this.props.position);
      this.props.updatePosition();
    }
  };


  render() {

    const images = this.props.images.map((img) => {
      return <ImageItem  key={img.id || img._id} {...img}/>
    })
    
    return (
      <div>
        <Masonry
          ref={function(c) {this.masonry = this.masonry || c.masonry;}.bind(this)}
          className={'grid'}
          options={masonryOptions}     
        >
          <div className="grid-sizer"></div>
          {images}
        </Masonry>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    images: state.updateImages.images,
    position: state.updateImages.position
  };
};

export default connect(mapStateToProps, {startUpdateImages, updatePosition})(ImageContainer)
