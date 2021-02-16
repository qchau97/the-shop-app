import { SIGNIN_ACCOUNT, SIGNUP_ACCOUNT } from "../actions/auth";

const INITIAL_STATE = {
  token: null,
  userId: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGNUP_ACCOUNT:
      return {
        token: action.payload.token,
        userId: action.payload.userId,
      }
    case SIGNIN_ACCOUNT:
      return {
        token: action.payload.token,
        userId: action.payload.userId,
      }
    default:
      return state;
  }
};

export default authReducer;
