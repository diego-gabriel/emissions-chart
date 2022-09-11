import { combineEpics } from 'redux-observable';
import { dataEpic } from './DataEpic';
import { commentsEpic } from './CommentsEpic';

export const rootEpic = combineEpics(dataEpic, commentsEpic);
