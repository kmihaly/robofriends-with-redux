import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import './index.css';
import App from './containers/App';
import './containers/App.css';
import * as serviceWorker from './serviceWorker';
import 'tachyons';
import { searchRobots, requestRobots } from './reducers';


const logger = createLogger();

const rootReducer = combineReducers({ searchRobots, requestRobots });

//const store = createStore(rootReducer); <-- the parameter is the reducer(s)
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, logger)); 

ReactDOM.render(
    
    <Provider store={ store }>
        <App />
    </Provider>
    , document.getElementById('root')
);

serviceWorker.unregister();
