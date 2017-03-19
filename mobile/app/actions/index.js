import { AuthService } from '../services';

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
}

export const loggedIn = logged => ({ type: types.LOGGED_IN, logged })

export const checkingAuth = () => (dispatch) => {

  dispatch({ type: types.SET_AUTHENTICATE_REQUESTED });
  AuthService.getAuthInfo()
    .then((authInfo) => {
      dispatch({ type: types.SET_LOGGED_IN, currentUser: authInfo });
      dispatch({ type: types.SET_AUTHENTICATE_DONE });
    })
    .catch((err) => {
      dispatch({ type: types.SET_UNLOGGED_IN });
      dispatch({ type: types.SET_AUTHENTICATE_DONE });
    });
    
}

export const signIn = (email, password) => (dispatch) => {

  AuthService.signin({email, password})
    .then((authInfo) => {
      dispatch({ type: types.SET_LOGGED_IN, currentUser: authInfo });
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
      dispatch({ type: types.SET_LOGGED_IN, currentUser: authInfo });
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

