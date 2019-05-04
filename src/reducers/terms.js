import { GET_TERMS } from "../actions";

const initialState = {
  termsConditions: {
    date_applied: "n/a",
    t_and_c: null
  }
};

export default (state = initialState, action) => {
  //console.log('ACTION:', action);
  switch (action.type) {
    case GET_TERMS:
      return {
        ...state,
        termsConditions: action.payload
      };
    default:
      return state;
  }
};
