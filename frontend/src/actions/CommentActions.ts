import { Comment } from '../utils/types';

export enum CommentActionType {
    GET_COMMENTS = 'GET_COMMENTS',
    GET_COMMENTS_SUCCESS = 'GET_COMMENTS_SUCCESS',
    POST_COMMENT = 'POST_COMMENT',
    POST_COMMENT_SUCCESS = 'POST_COMMENT_SUCCESS',
}

interface GetCommentsAction {
    type: CommentActionType.GET_COMMENTS;
}

interface GetCommentsSuccessAction {
    type: CommentActionType.GET_COMMENTS_SUCCESS;
    comments: Array<Comment>;
}

interface PostCommentAction {
    type: CommentActionType.POST_COMMENT;
    data: Omit<Comment, 'id'>;
}

interface PostCommentSuccessAction {
    type: CommentActionType.POST_COMMENT_SUCCESS;
    newComment: Comment;
}

export const dataActions = {
    getComments: () => ({ type: CommentActionType.GET_COMMENTS }),
    getCommentsSuccess: (comments: Array<Comment>) => ({ type: CommentActionType.GET_COMMENTS_SUCCESS, comments }),
    postComments: (data: Omit<Comment, 'id'>) => ({ type: CommentActionType.POST_COMMENT, data }),
    postCommentsSuccess: (newComment: Comment) => ({ type: CommentActionType.POST_COMMENT_SUCCESS, newComment }),
};
