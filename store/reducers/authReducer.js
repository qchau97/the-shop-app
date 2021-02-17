import { AUTHENTICATE_USER, DID_TRY_AUTO_LOGIN, LOGOUT_USER } from "../actions/auth";

const INITIAL_STATE = {
  token: null,
  userId: null,
  didTryAutoLogin: false,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTHENTICATE_USER:
      return {
        token: action.payload.token,
        userId: action.payload.userId,
        didTryAutoLogin: true,
      }
    case DID_TRY_AUTO_LOGIN:
      return {
        ...state,
        didTryAutoLogin: true,
      }
    case LOGOUT_USER:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default authReducer;
