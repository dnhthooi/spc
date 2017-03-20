import { AuthService, ApiService } from '../services';

export const types = {
  SET_LOGGED_IN: "SET_LOGGED_IN",
  SET_UNLOGGED_IN: 'SET_UNLOGGED_IN',
  SET_AUTHENTICATE_REQUESTED: 'SET_AUTHENTICATE_REQUESTED',
  SET_AUTHENTICATE_DONE: 'SET_AUTHENTICATE_DONE',
  SET_AUTHENTICATE_DONE: 'SET_AUTHENTICATE_DONE',
  SHOW_SIGNIN: 'SHOW_SIGNIN',
  HIDE_SIGNIN: 'HIDE_SIGNIN',
  SIGNIN_SUCCESS: 'SIGNIN_SUCCESS',
  SIGNIN_FAILED: 'SIGNIN_FAILED',
  SET_CURRENT_USER: 'SET_CURRENT_USER',
  SET_CHANNELS: 'SET_CHANNELS',
  ADD_CHANNEL: 'ADD_CHANNEL',
  SET_CURRENT_CHANNEL: 'SET_CURRENT_CHANNEL',
  SET_MESSAGES: 'SET_MESSAGES',
  ADD_MESSAGES: 'ADD_MESSAGES'
}

const loggedIn = (dispatch, user) => {
  dispatch({ type: types.SET_LOGGED_IN });
  dispatch({ type: types.SET_CURRENT_USER, user });
}

export const checkingAuth = () => (dispatch) => {

  dispatch({ type: types.SET_AUTHENTICATE_REQUESTED });
  AuthService.getAuthInfo()
    .then((authInfo) => {
      loggedIn(dispatch, authInfo);
      dispatch({ type: types.SET_AUTHENTICATE_DONE });
    })
    .catch((err) => {
      dispatch({ type: types.SET_UNLOGGED_IN });
      dispatch({ type: types.SET_AUTHENTICATE_DONE });
    });
    
}

export const getAllChannelsOfUser = () => (dispatch) => {

  ApiService.getChannels()
    .then((channels) => {
      dispatch({type: types.SET_CHANNELS, channels});
    }).catch((err) => {
      console.log(err);
    });

}

export const setCurrentChannel = (channel) => (dispatch) => {
  dispatch({ type: types.SET_CURRENT_CHANNEL, channel });
  getAllMessagesOfChannel(channel.id)(dispatch);
}

export const getAllMessagesOfChannel = (channelId) => (dispatch) => {
  ApiService.getMessagesOfChannel(channelId)
    .then((messages) => {
      dispatch({type: types.SET_MESSAGES, messages});
    }).catch((err) => {
      console.log(err);
    });
}

export const signIn = (email, password) => (dispatch) => {

  AuthService.signin({email, password})
    .then((authInfo) => {
      loggedIn(dispatch, authInfo);
      dispatch({ type: types.SIGNIN_SUCCESS });
      dispatch({ type: types.SET_AUTHENTICATE_DONE });
    })
    .catch((err) => {
      dispatch({ type: types.SIGNIN_FAILED, err });
      dispatch({ type: types.SET_AUTHENTICATE_DONE });
    });
    
}

export const signUp = (firstName, lastName, email, password) => (dispatch) => {

  AuthService.signup({firstName, lastName, email, password})
    .then((authInfo) => {
      loggedIn(dispatch, authInfo);
      dispatch({ type: types.SIGNUP_SUCCESS });
      dispatch({ type: types.SET_AUTHENTICATE_DONE });
    })
    .catch((err) => {
      dispatch({ type: types.SIGNUP_FAILED, err });
      dispatch({ type: types.SET_AUTHENTICATE_DONE });
    });
    
}

export const showSignin = () => ({ type: types.SHOW_SIGNIN })

export const hideSignin = () => ({ type: types.HIDE_SIGNIN })

