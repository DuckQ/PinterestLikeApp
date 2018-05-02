const initialState = {
  componentIsReady: false
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'SET_IMAGE_CONTAINER_STATE':
      return {
        componentIsReady: !state.componentIsReady
      };
    default:
      return state;
  }
};
