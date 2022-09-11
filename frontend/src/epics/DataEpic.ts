import { Epic } from 'redux-observable';
import { filter, map, mergeMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { dataActions, DataActionType } from '../reducers/DataReducer';
import { State } from '../store/Store';
import { AnyAction } from 'redux';
import { EmissionsData } from '../utils/types';

export const dataEpic: Epic<AnyAction, AnyAction, State> = (actionStream$) =>
    actionStream$.pipe(
        filter((action) => action.type === DataActionType.GET_DATA),
        mergeMap((action) =>
            ajax
                .get('http://127.0.0.1:8000/data')
                .pipe(map((data) => dataActions.getDataSuccess(data.response as EmissionsData)))
        )
    );
