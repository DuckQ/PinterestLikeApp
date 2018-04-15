export default (state = [], action = {}) => {
  switch(action.type) {
    case 'LOAD_IMAGES':
      return [
        ...action.images
      ];
      
    default: return state
  }
  
}