import { combineReducers } from 'redux';
import { dataReducer } from './DataReducer';
import { commentsReducer } from './CommentsReducer';

const RootReducer = combineReducers({
    data: dataReducer,
    comments: commentsReducer,
});

export default RootReducer;
