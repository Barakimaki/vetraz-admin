import {AnyAction, applyMiddleware, createStore} from "redux";
import thunkMiddleware, {ThunkDispatch} from 'redux-thunk';
import {rootReducer} from "./root-reducer";

export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;

export const store = createStore(rootReducer, undefined, applyMiddleware(thunkMiddleware))