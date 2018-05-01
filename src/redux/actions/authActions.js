import jwtDecode from 'jwt-decode';

export const setCurrentUser = (user) => {
  return {
    type: 'SET_CURRENT_USER',
    user
  }
}

export const login = (userData) => {
  return (dispatch) => {
    return fetch('https://pinterestlikeapp-server.herokuapp.com/api/auth', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    }).then(response => response.json())
      .then(response => {
        if (response.token) {
          const token = response.token;
          localStorage.setItem('jwtToken', token);
          dispatch(setCurrentUser(jwtDecode(token)))
          return response
        } else {
          return response
        }
      })
  }
}

export const logout = () => {
  return dispatch => {
    localStorage.removeItem('jwtToken');
    dispatch(setCurrentUser({}))
  }
}