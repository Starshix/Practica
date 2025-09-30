import * as reducers from './reducers.js';
import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';

export const store = createStore(reducers.rootReducer, applyMiddleware(thunk));