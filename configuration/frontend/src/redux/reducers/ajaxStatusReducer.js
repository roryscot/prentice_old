import { BEGIN_AJAX_CALL, AJAX_CALL_ERROR } from '../actionTypes';
import initialState from '../initialState';

function actionTypeEndsInSuccess(type) {
  return type.substring(type.length - 8) === '_SUCCESS';
}

// In Lieu of a switch statement, this function handles both options.
export default function ajaxStatusReducer(state = initialState.ajaxCallsInProgress, action) {
  if (action.type === BEGIN_AJAX_CALL) {
    return state + 1;
  } else if (action.type === AJAX_CALL_ERROR || actionTypeEndsInSuccess(action.type)) {
    return state - 1;
  }

  return state;
}