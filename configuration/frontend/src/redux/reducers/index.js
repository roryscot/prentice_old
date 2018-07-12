import { combineReducers } from 'redux';
import notes from "./notes";
import auth from "./auth";
import assignments from "./assignments";


const App_rentice = combineReducers({
  notes,
  auth,
  assignments,
});

export default App_rentice;