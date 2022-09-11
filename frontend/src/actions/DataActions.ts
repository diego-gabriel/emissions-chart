import { EmissionsData } from '../utils/types';

export enum DataActionType {
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

export type DataAction = GetDataAction | GetDataSuccessAction;
