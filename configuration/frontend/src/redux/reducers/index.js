import { combineReducers } from 'redux';
import notes from "./notes";
import auth from "./auth";
import assignments from "./assignments";
import myForms from './formValidation';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  notes,
  auth,
  assignments,
  myForms,
  ajaxCallsInProgress,
});

export default rootReducer;