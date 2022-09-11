import { Epic } from 'redux-observable';
import { filter, map } from 'rxjs/operators';
import { DataAction, dataActions, DataActionType } from '../reducers/DataReducer';
import { State } from '../store/Store';
import Any = jasmine.Any;
import { AnyAction } from 'redux';

const dummyData = [
    {
        year: 1980,
        emissions: 123,
    },
    {
        year: 1990,
        emissions: 234,
    },
    {
        year: 2000,
        emissions: 463,
    },
    {
        year: 2010,
        emissions: 793,
    },
    {
        year: 2020,
        emissions: 1092,
    },
];

export const dataEpic: Epic<AnyAction, AnyAction, State> = (actionStream$) =>
    actionStream$.pipe(
        filter((action) => action.type === DataActionType.GET_DATA),
        map((action) => dataActions.getDataSuccess(dummyData))
    );
