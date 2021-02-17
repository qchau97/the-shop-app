import AsyncStorage from "@react-native-async-storage/async-storage";

export const AUTHENTICATE_USER = 'AUTHENTICATE_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const DID_TRY_AUTO_LOGIN = 'DID_TRY_AUTO_LOGIN';

export const didTryAutoLogin = () => {
  return {
    type: DID_TRY_AUTO_LOGIN,
  }
};

export const authenticateUser = (token, userId, expirationTime) => {
  return dispatch => {
    dispatch(setLogoutTimer(expirationTime));
    dispatch({
      type: AUTHENTICATE_USER,
      payload: {
        token,
        userId,
      }
    });
  };
};

let timer;

// Set up a timer to make sure the user is logged out immediately when the token is expired
// expirationTime is in MILLISECONDs
// setTimeout() is an async function
const setLogoutTimer = (expirationTime) => {
  return dispatch => {
    timer = setTimeout(() => {
      dispatch(logoutUser());
    }, expirationTime);
  };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  };
};

export const logoutUser = () => {
  return async dispatch => {
    await AsyncStorage.removeItem('userData');
    // Clear the timer when user manually logs out
    clearLogoutTimer();
    dispatch({
      type: LOGOUT_USER,
    })
  }
};

export const signupAccount = (email, password) => {
  return async dispatch => {
    try {
      const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAJUenvo7TociAOwE_vX9yJ43LGIz1IzQM', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.error.message;
        let message = 'Something went wrong!';
        switch (errorMessage) {
          case 'EMAIL_EXISTS':
            message = 'The email address is already in use by another account!'
            break;
          case 'INVALID_EMAIL':
            message = 'Please enter a valid email address!'
            break;
          case 'WEAK_PASSWORD : Password should be at least 6 characters':
            message = 'Password should be at least 6 characters!'
            break;
          default:
            return message;
        }
        throw new Error(message);
      }

      const data = await response.json();
      // console.log(data.email);
      // console.log(data.expiresIn);
      // console.log(data.idToken);
      // console.log(data.kind);
      // console.log(data.localId);
      // console.log(data.refreshToken);
      dispatch(authenticateUser(data.idToken, data.localId, parseInt(data.expiresIn) * 1000));
      const expirationDate = new Date(new Date().getTime() + parseInt(data.expiresIn) * 1000);
      storeData(data.idToken, data.localId, expirationDate);
    } catch (error) {
      throw error;
    }
  };
};

export const signinAccount = (email, password) => {
  return async dispatch => {
    try {
      const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAJUenvo7TociAOwE_vX9yJ43LGIz1IzQM', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true
        })
      })

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.error.message;
        let message = 'Something went wrong!';
        switch (errorMessage) {
          case 'EMAIL_NOT_FOUND':
            message = 'There is no user record corresponding to this identifier. The user may have been deleted!'
            break;
          case 'INVALID_EMAIL':
            message = 'Please enter a valid email address!'
            break;
          case 'INVALID_PASSWORD':
            message = 'The password is invalid or the user does not have a password!'
            break;
          case 'USER_DISABLED':
            message = 'The user account has been disabled by an administrator!'
            break;
          default:
            return message;
        }
        throw new Error(message);
      }

      const data = await response.json();
      // console.log(data.displayName);
      // console.log(data.email);
      // console.log(data.expiresIn);
      // console.log(data.idToken);
      // console.log(data.kind);
      // console.log(data.localId);
      // console.log(data.refreshToken);
      // console.log(data.registered);
      dispatch(authenticateUser(data.idToken, data.localId, parseInt(data.expiresIn) * 1000));
      // getTime() returns the current timestamp in MILLISECONDs since 1970
      // data.expiresIn returns an amount of time in SECONDs
      // 'expirationDate' must be an object
      const expirationDate = new Date(new Date().getTime() + parseInt(data.expiresIn) * 1000);
      storeData(data.idToken, data.localId, expirationDate);
    } catch (error) {
      throw error;
    }
  };
};

const storeData = (token, userId, expirationDate) => {
  AsyncStorage.setItem('userData', JSON.stringify({
    token: token,
    userId: userId,
    expirationDate: expirationDate.toISOString(),
  }));
};

