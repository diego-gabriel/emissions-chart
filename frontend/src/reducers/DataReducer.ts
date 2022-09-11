import { EmissionsData } from '../utils/types';

enum DataActionType {
    GET_DATA = 'GET_DATA',
    GET_DATA_SUCCESS = 'GET_DATA_SUCCESS',
}

interface GetDataAction {
    type: DataActionType.GET_DATA;
}

interface GetDataSuccessAction {
    type: DataActionType.GET_DATA_SUCCESS;
    data: EmissionsData;
}

export const dataActions = {
    getData: () => ({ type: DataActionType.GET_DATA }),
    getDataSuccess: (data: EmissionsData) => ({ type: DataActionType.GET_DATA_SUCCESS, data }),
};

type DataAction = GetDataAction | GetDataSuccessAction;

type EmissionsDataState = EmissionsData | 'loading' | null;

export const dataReducer = (state: EmissionsDataState = null, action: DataAction) => {
    switch (action.type) {
        case DataActionType.GET_DATA:
            return 'loading';
        case DataActionType.GET_DATA_SUCCESS:
            return action.data;
    }
};
