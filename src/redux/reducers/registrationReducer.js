const registrationReducer = (state = {isRegistering: false, isLogining: false}, action = {}) => {
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
    default:
      return state;
  }
};

export default registrationReducer;