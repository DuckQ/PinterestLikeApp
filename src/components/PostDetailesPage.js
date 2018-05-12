import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { loadSingleIMage } from '../redux/actions/imagesActions';
import PageNotFound from './PageNotFound';

class PostDetailesPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      postData: {
        source: '',
        image_url: ''
      },
      isIdExist: true
    }
  };

  componentWillMount() {
    const postId = this.props.location.pathname.split("/post/")[1];
    this.props.loadSingleIMage(postId)
      .then(response => {
        if (response.status === 404) {
          this.setState({isIdExist: false})
        } else {
          this.setState({isIdExist: true})
        }
        return response.json();
      })
      .then(response => {
        const postData = {
          source: '',
          image_url: ''
        }
        postData.source = response.source;
        postData.image_url = response.image_url;
        this.setState({postData})
      })
  }
  
  render() {
    const pageContent = (
      <div className="post-details-container" >
        <div className="items" >
          <div className="image-wrapper" >
            <img  src={this.state.postData.image_url} alt=""/>
          </div>
        </div>
        <div className="items" >
          <div className="text-wrapper" >
            <a href={this.state.postData.image_url} target="_blank"> Open in full size </a>
            <p>If you want to see original post follow this link: <a href={this.state.postData.source} target="_blank">here</a></p>
          </div>
        </div>
      </div>
    )
    return (
      <Fragment> {this.state.isIdExist ? pageContent : <PageNotFound /> } </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    images: state.images
  }
};

export default connect(mapStateToProps, { loadSingleIMage })(PostDetailesPage);
