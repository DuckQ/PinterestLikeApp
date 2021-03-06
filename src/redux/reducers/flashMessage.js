export default (state = {}, action = {}) => {
  switch(action.type) {
    case 'ADD_FLASH_MESSAGE':
      return {
          type: action.message.type,
          text: action.message.text
      }
    default: return state
  }
}