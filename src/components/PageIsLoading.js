import React, { Component } from 'react'

class PageIsLoading extends Component {
  render() {
    return (
      // heroku and local machine use diffent pathes
      <div>
        <img src="/src/files/loading.svg" alt=""/>
        <img src="/files/loading.svg" alt=""/>
      </div>
    )
  }
}

export default PageIsLoading
