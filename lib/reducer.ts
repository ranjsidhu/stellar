import { combineReducers } from "redux";
import UI from "./features/UI";
import Jobs from "./features/Jobs";
import Testimonials from "./features/Testimonials";

const rootReducer = combineReducers({ UI, Jobs, Testimonials });
export default rootReducer;
