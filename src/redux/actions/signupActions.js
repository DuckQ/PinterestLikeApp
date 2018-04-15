export const userSignupRequest = (userData) => {
  return (dispatch) => {
    return fetch('http://localhost:3000/api/users', {
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
    return fetch(`http://localhost:3000/api/users/check/${identifier}`)
  }
}