import { currentUserReducer } from './CurrentUser';
import { combineReducers } from 'redux';
import { dataReducer } from './DataReducer';

const RootReducer = combineReducers({
    currentUser: currentUserReducer,
    data: dataReducer,
});

export default RootReducer;
