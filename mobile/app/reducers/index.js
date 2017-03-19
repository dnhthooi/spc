
import { combineReducers } from 'redux';
import { types } from '../actions';

const isLoggedIn = (state=false, action) => {
  switch(action.type) {
    case types.SET_LOGGED_IN:
      return action.currentUser;
    case types.SET_UNLOGGED_IN:
      return false;
  }
  return state;
}

const checkingAuth = (state=true, action) => {
  switch(action.type) {
    case types.SET_AUTHENTICATE_REQUESTED:
      return true;
    case types.SET_AUTHENTICATE_DONE:
      return false;
  }
  return state;
}

const canDisplaySignin = (state=true, action) => {
  switch(action.type) {
    case types.SHOW_SIGNIN:
      return state = true;
    case types.HIDE_SIGNIN:
      return state = false;
  }
  return state;
}

const signInStatus = (state = {}, action) => {
  switch(action.type) {
    case types.SIGNIN_SUCCESS:
      return {};
    case types.SIGNIN_FAILED:
      return action.err;
  }
  return state;
}

const signUpStatus = (state = {}, action) => {
  switch(action.type) {
    case types.SIGNIN_SUCCESS:
      return {};
    case types.SIGNIN_FAILED:
      return action.err;
  }
  return state;
}

const rootReducer = combineReducers({
  isLoggedIn,
  checkingAuth,
  canDisplaySignin,
  signInStatus,
  signUpStatus
});

export default rootReducer;