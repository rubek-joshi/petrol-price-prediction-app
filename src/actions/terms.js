export const GET_TERMS = "GET_TERMS";

export const getTerms = terms => {
  return {
    type: GET_TERMS,
    payload: terms
  };
};
