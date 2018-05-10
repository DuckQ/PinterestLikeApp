const defaultUpdates = {
  savedImage: '',
  username: '',
  email: '',
  password: '',
  passwordConfirmation: '',
  userAvatar: ''
};

export const updateUserInfo = (id, updates = defaultUpdates, token) => {
  const {username, email, password, passwordConfirmation, savedImage, userAvatar} = updates
  const formData = new FormData();
  if (username) {
    formData.append('username', username);
  };
  if (email) {
    formData.append('email', email);
  };
  if (password) {
    formData.append('password', password);
  };
  if (passwordConfirmation) {
    formData.append('passwordConfirmation', passwordConfirmation);
  };
  if (savedImage) {
    formData.append('savedImage', savedImage);
  };
  if (userAvatar) {
    console.log(!userAvatar)
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