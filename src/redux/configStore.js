import { LTBTQLND } from "./reducers/LTBTQLND";
import { combineReducers, createStore } from "redux";
const rootReducer = combineReducers({
    LTBTQLND,
});



export const store = createStore(rootReducer);