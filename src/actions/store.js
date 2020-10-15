import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';                                           
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import articlereducer from './reducers/articles';

const rootReducer=combineReducers({
    at:articlereducer
})

const store=createStore(rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  ))
export default store;