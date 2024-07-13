import {createStore,applyMiddleware,compose}from 'redux';
import reducer from './Reducers/combinereducer';
import {thunk} from 'redux-thunk';
const store= createStore(reducer,compose(applyMiddleware(thunk)));
export default store;