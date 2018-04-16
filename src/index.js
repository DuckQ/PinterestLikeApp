import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './components/routes/AppRouter';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import { Provider } from 'react-redux';
import configureStore from './redux/store/configureStore';
import { startLoadImages } from './redux/actions/imagesActions';
import { startUpdateImages } from './redux/actions/updateImages';
import { setCurrentUser } from './redux/actions/authActions';
import jwtDecode from 'jwt-decode';

const store = configureStore();

// loading all images then rendering first 20 of them
store.dispatch(startLoadImages()).then( () => store.dispatch(startUpdateImages(20, 0)) );

if (localStorage.jwtToken) {
  store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)))
}

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
)

ReactDOM.render(jsx, document.getElementById('app'));
