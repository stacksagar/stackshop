import {createStore, applyMiddleware} from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";
const middlewares = [thunk];
const store = createStore(rootReducer, applyMiddleware(...middlewares));
export default store;
