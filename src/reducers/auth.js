import { SAVE_TOKEN, LOG_OUT, SAVE_USER } from "../actions";

const initialState = {
  isAuthenticated: false,
  token: "",
  userDetails: {
    user_id: 0,
    full_name: "Guest"
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SAVE_TOKEN:
      return {
        ...state,
        isAuthenticated: true,
        token: "Bearer " + action.payload
      };
    case SAVE_USER:
      return {
        ...state,
        userDetails: {
          user_id: action.payload.user_id,
          full_name: action.payload.full_name
        }
      };
    case LOG_OUT:
      return {
        ...state,
        isAuthenticated: false,
        token: "",
        userDetails: {
          user_id: 0,
          full_name: "Guest"
        }
      };
    default:
      return state;
  }
};
