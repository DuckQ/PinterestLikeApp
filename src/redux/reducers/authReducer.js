const initialState = {
  isAuthenticated: false,
  user: {}
};

const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

export default (state = initialState, action = {} ) => {
  switch(action.type) {
    case 'SET_CURRENT_USER':
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      }
    default: return state
  }
}