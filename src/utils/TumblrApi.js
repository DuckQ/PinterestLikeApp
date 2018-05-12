import React, { Component, Fragment } from 'react';


export class TumblrApi extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tag: 'nature',
      tumblrData: [],
      structuredData: [],
      lastTimestamp: ''
    };
    this.onAddClick = this.onAddClick.bind(this);
    this.onGetClick = this.onGetClick.bind(this);
  }

  getPostsFromTumblr() {
    const tag = this.state.tag;
    const api_key = 'fuiKNFp9vQFvjLNvx4sUwti4Yb5yGutBN4Xh10LXZhhRKjWlV4';
    // limit is in range 1-20 accroding to tumblr api
    const limit = '20';
    const before = this.state.lastTimestamp ? this.state.lastTimestamp : Date.now().toString().slice(0, -3);
    return fetch(`https://api.tumblr.com/v2/tagged?tag=${tag}&before=${before}&limit=${limit}&api_key=${api_key}`)
    .then(res => res.json())
    .then(res => {
      const postsWithPhotos = [];
      // searching for posts with type "photo" to exclude posts with audio, text etc 
      res.response
      .filter(obj => {return obj.type === "photo"})
      .map(obj => {
        postsWithPhotos.push(obj)
      })
      this.setState({tumblrData: postsWithPhotos})
      return res
    })
  }

  // structure data that will be used in post request to db
  structureData() {
    const structuredData = [];
    // lastTimestamp is needed for get request to Tumblr, so it will not fetch data that already exists in this.state or db
    this.setState({lastTimestamp: this.state.tumblrData[this.state.tumblrData.length-1].timestamp}) 
    this.state.tumblrData.map(obj => {
      const source = obj.post_url;
      const original_timestamp = obj.timestamp;
      const image_url = obj.photos[0].original_size.url;
      const main_tag = this.state.tag;
      const tags = obj.tags
      const structuredObj = {source, original_timestamp, image_url, main_tag, tags}
      structuredData.push(structuredObj);
    })
    this.setState({ structuredData })
  }

  sendPostToDb() {
    let x = 0;
      // interval is needed to not shuffle posts in db
      // in other case their chain will be broken and we'll not be able to get last timestamp correctly
      setInterval( () => {
        if (x < this.state.structuredData.length) {
            fetch('https://pinterestlikeapp-server.herokuapp.com/api/images', {
              method: 'post',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(this.state.structuredData[x])
            }).then(response => response.json())
            .then(response => console.log(response))
        }
        else return;
        x++;
      }, 750); 
  }

  onAddClick() {
    this.getPostsFromTumblr().then(() => this.structureData()).then(() => this.sendPostToDb()) 
  }

  // Get last added to db timestamp of post by tag
  // It allows us to continue adding new posts from tumblr, that are not in our db yet
  onGetClick() {
    const tag = this.state.tag;
    fetch(`https://pinterestlikeapp-server.herokuapp.com/api/images/last/${tag}`)
    .then(response => response.json())
    .then(response => this.setState({ lastTimestamp: response[0].original_timestamp }))
  }

  render() {
    return (
      <Fragment>
        <button onClick={this.onAddClick} > add to db </button>
        <button onClick={this.onGetClick} > get last timestamp</button>
      </Fragment>
    )
  }
}



export default TumblrApi;
