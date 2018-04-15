import { createStore, applyMiddleware, compose  } from 'redux';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import imagesReducer from '../reducers/imagesReducer';
import updateImagesReducer from '../reducers/updateImagesReducer';
import registrationReducer from '../reducers/registrationReducer';
import authReducer from '../reducers/authReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      images: imagesReducer,
      updateImages: updateImagesReducer,
      registration: registrationReducer,
      auth: authReducer
    }), 
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
};
