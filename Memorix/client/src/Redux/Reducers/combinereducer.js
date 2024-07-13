import{combineReducers}from 'redux';
import mem from './memoriesReducer.js';
import auth from './authReducer.js';
const reducer=combineReducers({mem,auth});
export default reducer;