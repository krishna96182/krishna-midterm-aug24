import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import ReducerRegistration from '../reducer/ReducerRegistration';

const rootReducer = combineReducers({
  auth: ReducerRegistration,
});


const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;