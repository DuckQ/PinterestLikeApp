const initialState = {
  componentIsReady: false,
  fetchIsFinished: false
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'SET_IMAGE_CONTAINER_STATE':
      return {
        ...state,
        componentIsReady: !state.componentIsReady
      };
    case 'SET_FETCH_STATE':
      return {
        ...state,
        fetchIsFinished: action.isTrue
      };
    default:
      return state;
  }
};
