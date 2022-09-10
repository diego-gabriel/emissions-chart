import { currentUserReducer } from './CurrentUser';
import { combineReducers } from 'redux';

const RootReducer = combineReducers({
    currentUser: currentUserReducer,
});

export default RootReducer;
