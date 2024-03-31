import { combineReducers } from "redux";
import UI from "./features/UI";
import Jobs from "./features/Jobs";

const rootReducer = combineReducers({ UI, Jobs });
export default rootReducer;
