export const updateUserInfo = (id, updates, token) => {
  const {username, email, password, passwordConfirmation} = updates
  const formData = new FormData();
  if (username !== '') {
    formData.append('username', username);
  };
  if (email !== '') {
    formData.append('email', email);
  };
  if (password !== '') {
    formData.append('password', password);
  };
  if (passwordConfirmation !== '') {
    formData.append('passwordConfirmation', passwordConfirmation);
  };
  if (userAvatar !== '') {
    formData.append('userAvatar', document.getElementById('userAvatar').files[0]);
  };
  return (dispatch) => {
    return fetch("https://pinterestlikeapp-server.herokuapp.com/api/users/" + id, {
      headers: {
        authorization: `Bearer ${token}`
      },
      method: "PATCH",
      body: formData
    })
  }
}