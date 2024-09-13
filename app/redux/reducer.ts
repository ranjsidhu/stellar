import { combineReducers } from "redux";
import UI from "./features/UI";
import Auth from "./features/Auth";

const rootReducer = combineReducers({ UI, Auth });
export default rootReducer;
