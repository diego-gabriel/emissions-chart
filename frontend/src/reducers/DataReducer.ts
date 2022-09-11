import { EmissionsData } from '../utils/types';
import { DataAction, DataActionType } from '../actions/DataActions';

type EmissionsDataState = EmissionsData | 'loading' | null;

export const dataReducer = (state: EmissionsDataState = null, action: DataAction) => {
    switch (action.type) {
        case DataActionType.GET_DATA:
            return 'loading';
        case DataActionType.GET_DATA_SUCCESS:
            return action.data;
        default:
            return state;
    }
};
