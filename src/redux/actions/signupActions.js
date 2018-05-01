export const userSignupRequest = (userData) => {
  return (dispatch) => {
    return fetch('https://pinterestlikeapp-server.herokuapp.com/api/users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
  }
}

export const isUserExist = (identifier) => {
  return dispatch => {
    return fetch(`https://pinterestlikeapp-server.herokuapp.com/api/users/check/${identifier}`)
  }
}