import { createStore, applyMiddleware, compose  } from 'redux';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import imagesReducer from '../reducers/imagesReducer';
import updateImagesReducer from '../reducers/updateImagesReducer';
import modalReducer from '../reducers/modalReducer';
import authReducer from '../reducers/authReducer';
import flashMessage from '../reducers/flashMessage';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      images: imagesReducer,
      updateImages: updateImagesReducer,
      modal: modalReducer,
      auth: authReducer,
      flashMessage: flashMessage
    }), 
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
};
