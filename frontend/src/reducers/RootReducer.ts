import { currentUserReducer } from './CurrentUser';
import { combineReducers } from 'redux';
import { dataReducer } from './DataReducer';
import { commentsReducer } from './CommentsReducer';

const RootReducer = combineReducers({
    currentUser: currentUserReducer,
    data: dataReducer,
    comments: commentsReducer,
});

export default RootReducer;
