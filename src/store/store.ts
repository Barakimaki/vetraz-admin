import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware, {ThunkDispatch} from 'redux-thunk';
import coursesReducer from "./courses/courses.reducer";

const rootReducer = combineReducers({
    courses: coursesReducer
})

export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

export const store = createStore(rootReducer, undefined, applyMiddleware(thunkMiddleware))