import { combineEpics } from 'redux-observable';
import { dataEpic } from './DataEpic';

export const rootEpic = combineEpics(dataEpic);
