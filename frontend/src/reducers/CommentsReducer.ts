import { Comment } from '../utils/types';
import { CommentAction, CommentActionType } from '../actions/CommentActions';

export const commentsReducer = (state: { [k: number]: Comment } = {}, action: CommentAction) => {
    switch (action.type) {
        case CommentActionType.GET_COMMENTS_SUCCESS:
            const commentIdMap = action.comments.reduce((commentMap, comment) => {
                commentMap[comment.id] = comment;
                return commentMap;
            }, {} as { [k: number]: Comment });

            return {
                ...state,
                ...commentIdMap,
            };
        case CommentActionType.POST_COMMENT_SUCCESS:
            return {
                ...state,
                [action.newComment.id]: action.newComment,
            };
        default:
            return state;
    }
};
