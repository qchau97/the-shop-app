export const SIGNUP_ACCOUNT = 'SIGNUP_ACCOUNT';

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
        throw new Error('Something went wrong!');
      }

      const data = await response.json();
      console.log('My DATA', data);
      dispatch({
        type: SIGNUP_ACCOUNT,
        payload: {
          
        }
      })
    } catch (error) {
      throw error;
    }
  };
};
