import {configureStore} from "@reduxjs/toolkit";
import {currentUserReducer} from "../reducers/CurrentUser";
import RootReducer from "../reducers/RootReducer";

export const store = configureStore({ reducer: RootReducer });

export type State = ReturnType<typeof RootReducer>;