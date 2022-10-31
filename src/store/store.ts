import { applyMiddleware, createStore} from "redux";
import thunkMiddleware, {ThunkDispatch} from 'redux-thunk';
import {rootReducer} from "./root-reducer";

export type RootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, undefined, applyMiddleware(thunkMiddleware))