import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import userReducer from './store/reducers/reducer';

const logger = (store ) => {
    return function(next) {
        return function(action) {
            console.log('[Log Middleware] Dispatching', action);
            const result = next(action);
            console.log('[Log Middleware] next state', store.getState());
            return result;
        }
    }
}

const rootReducer = combineReducers({
    userReducer: userReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 

var store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)));

ReactDOM.render(<Provider store={store} ><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
