
import { combineReducers } from 'redux';
import { types } from '../actions';

const isLoggedIn = (state=false, action) => {
  switch(action.type) {
    case types.SET_LOGGED_IN:
      return true;
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

const currentUser = (state={}, action) => {
  switch(action.type) {
    case types.SET_CURRENT_USER:
      debugger;
      return action.user;
  }
  return state;
}

const channels = (state = [], action) => {
  switch(action.type) {
    case types.SET_CHANNELS:
      return action.channels;
    case types.ADD_CHANNEL:
      state.push(action.channel);
      return state;
  }
  return state;
}

const selectedChannel = (state = {}, action) => {
  switch(action.type) {
    case types.SET_CURRENT_CHANNEL:
      return { id: action.channelId, messages: channels[action.channelId] };
  }
  return state;
}

const messages = (state = [], action) => {
  switch(action.type) {
    case types.SET_MESSAGES:
      return action.messages;
    case types.ADD_MESSAGE:
      state.push(action.message);
      return state;
  }
  return state;
}

const rootReducer = combineReducers({
  isLoggedIn,
  checkingAuth,
  canDisplaySignin,
  signInStatus,
  signUpStatus,
  currentUser,
  channels,
  selectedChannel,
  messages
});

export default rootReducer;