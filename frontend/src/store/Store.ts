import { configureStore } from '@reduxjs/toolkit';
import RootReducer from '../reducers/RootReducer';
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from '../epics/RootEpic';
import { AnyAction } from 'redux';

const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, State>();

export const store = configureStore({
    reducer: RootReducer,
    middleware: [epicMiddleware],
});

epicMiddleware.run(rootEpic);

export type State = ReturnType<typeof RootReducer>;
