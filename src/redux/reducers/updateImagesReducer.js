export default (state = {images: [], position: 20}, action = {}) => {
  switch(action.type) {
    case 'UPDATE_IMAGES':
      return {
        ...state,
        images: [...state.images, ...action.images]
      };
    case 'CLEAR_IMAGES':
      state.images = [];
    case 'UPDATE_POSITION':
      return {
        ...state,
        position: state.position + 5
      };
    case 'SET_DEFAULT_POSITION':
      state.position = 20;
      
    default: return state
  }
}