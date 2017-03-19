import AuthService from '../AuthService';

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

export const debuggerDispacth = () => (dispatch) => {
  console.log('asdasd');
}

export const checkingAuth = dispatch => () => {

  dispatch({ type: types.SET_AUTHENTICATE_REQUESTED });
  AuthService.getAuthInfo()
    .then((authInfor) => {
      dispatch({ type: types.SET_LOGGED_IN });
      dispatch({ type: types.SET_AUTHENTICATE_DONE });
    })
    .catch((err) => {
      dispatch({ type: types.SET_UNLOGGED_IN });
      dispatch({ type: types.SET_AUTHENTICATE_DONE });
    });
    
}

export const signIn = dispatch => (email, password) => {

  AuthService.signin({email, password})
    .then((authInfor) => {
      dispatch({ type: types.SET_LOGGED_IN });
      dispatch({ type: types.SIGNIN_SUCCESS });
      dispatch({ type: types.SET_AUTHENTICATE_DONE });
    })
    .catch((err) => {
      dispatch({ type: types.SIGNIN_FAILED, err });
      dispatch({ type: types.SET_AUTHENTICATE_DONE });
    });
    
}

export const showSignin = (dispatch) => () => {
  dispatch({ type: types.SHOW_SIGNIN });
}

export const hideSignin = (dispatch) => () => {
  dispatch({ type: types.HIDE_SIGNIN });
}

