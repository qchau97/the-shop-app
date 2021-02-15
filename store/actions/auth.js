export const SIGNUP_ACCOUNT = 'SIGNUP_ACCOUNT';
export const SIGNIN_ACCOUNT = 'SIGNIN_ACCOUNT';

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
      })

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.error.message;
        let message = 'Something went wrong!';
        switch (errorMessage) {
          case 'EMAIL_EXISTS':
            message = 'The email address is already in use by another account!'
            break;
          case 'INVALID_EMAIL':
            message = 'The email is invalid!'
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
      dispatch({
        type: SIGNUP_ACCOUNT,
        payload: {
          token: data.idToken,
          userId: data.localId,
        }
      })
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
          email: email,
          password: password,
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
      dispatch({
        type: SIGNIN_ACCOUNT,
        payload: {
          token: data.idToken,
          userId: data.localId,
        }
      })
    } catch (error) {
      throw error;
    }
  };
};
