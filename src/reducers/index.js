import { combineReducers } from "redux";
import authReducer from "./auth";
import filtersReducer from "./filters";
import shelfReducer from './products';

export default combineReducers({ 
    auth: authReducer,
    filters: filtersReducer,
    shelf: shelfReducer
});