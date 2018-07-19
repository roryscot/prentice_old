import { combineReducers } from 'redux';
import notes from "./notes";
import auth from "./auth";
import assignments from "./assignments";
import myForms from './formValidation';

const rootReducer = combineReducers({
  notes,
  auth,
  assignments,
  myForms,
});

export default rootReducer;