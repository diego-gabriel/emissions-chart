import { combineEpics, Epic } from 'redux-observable';
import { AnyAction } from 'redux';
import { State } from '../store/Store';
import { commentActions, CommentActionType } from '../actions/CommentActions';
import { filter, map, mergeMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { Comment } from '../utils/types';

const getCommentsEpic: Epic<AnyAction, AnyAction, State> = (actionSteam$) =>
    actionSteam$.pipe(
        filter((action) => action.type === CommentActionType.GET_COMMENTS),
        mergeMap((action) =>
            ajax
                .get('http://127.0.0.1:8000/comments')
                .pipe(map(({ response }) => commentActions.getCommentsSuccess(response as Array<Comment>)))
        )
    );

const postCommentEpic: Epic<AnyAction, AnyAction, State> = (actionStream$) =>
    actionStream$.pipe(
        filter((action) => action.type === CommentActionType.POST_COMMENT),
        mergeMap((action) =>
            ajax
                .post('http://127.0.0.1:8000/comments', action.data)
                .pipe(map(({ response }) => commentActions.postCommentsSuccess(response as Comment)))
        )
    );

export const commentsEpic = combineEpics(getCommentsEpic, postCommentEpic);
