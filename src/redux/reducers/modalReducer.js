const initialState = {
  isRegistering: false,
  isLogining: false,
  isLoginRequired: false,
  showFlashMessage: false
};

const ModalReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'CALL_REGISTRATION_FORM':
      return {
        ...state, 
        isRegistering: !state.isRegistering
      };
    case 'CALL_LOGIN_FORM':
    return {
      ...state, 
      isLogining: !state.isLogining
    };
    case 'CALL_LOGIN_REQUIRED_FORM':
    return {
      ...state, 
      isLoginRequired: !state.isLoginRequired
    };
    case 'CALL_FLASHMESSAGE_FORM':
    return {
      ...state, 
      showFlashMessage: !state.showFlashMessage
    };
    default:
      return state;
  }
};

export default ModalReducer;