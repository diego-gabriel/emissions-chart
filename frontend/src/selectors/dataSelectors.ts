import { State } from '../store/Store';

export const dataSelectors = {
    getData: (state: State) => state.data,
};
