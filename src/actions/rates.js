export const GET_RATES = "GET_RATES";
export const GET_HISTORY = "GET_HISTORY";
export const GET_PREDICTION = "GET_PREDICTION";
export const GET_COMPOSITION = "GET_COMPOSITION";

export const getRates = rates => {
  return {
    type: GET_RATES,
    payload: rates
  };
};

export const getHistory = history => {
  return {
    type: GET_HISTORY,
    payload: history
  };
};

export const getPrediction = prediction => {
  return {
    type: GET_PREDICTION,
    payload: prediction
  };
};

export const getComposition = composition => {
  return {
    type: GET_COMPOSITION,
    payload: composition
  };
};
