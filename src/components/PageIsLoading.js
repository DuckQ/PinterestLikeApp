import React, { Component, Fragment } from 'react'

class PageIsLoading extends Component {
  render() {
    return (
      // heroku and local machine use diffent pathes
      <Fragment>
        <img src="/src/files/loading.svg" alt=""/>
        <img src="/files/loading.svg" alt=""/>
      </Fragment>
    )
  }
}

export default PageIsLoading
