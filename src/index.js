import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore,combineReducers,applyMiddleware} from'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import articlereducer from './actions/reducers/articles';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';

const composeEnhancers = composeWithDevTools({
  // options like actionSanitizer, stateSanitizer
});
const rootReducer=combineReducers({
    at:articlereducer
})

const store=createStore(rootReducer,composeEnhancers(
    applyMiddleware(thunk)
  ))

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();