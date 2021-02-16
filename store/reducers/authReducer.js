import { AUTHENTICATE_USER, LOGOUT_USER } from "../actions/auth";

const INITIAL_STATE = {
  token: null,
  userId: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTHENTICATE_USER:
      return {
        token: action.payload.token,
        userId: action.payload.userId,
      }
    case LOGOUT_USER:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default authReducer;
