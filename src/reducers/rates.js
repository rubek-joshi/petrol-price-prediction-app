import {
  GET_RATES,
  GET_HISTORY,
  GET_PREDICTION,
  GET_COMPOSITION
} from "../actions";

const initialState = {
  latestRates: [],
  history: [],
  prediction: [],
  composition: {
    id: 5,
    rates_id: 58,
    petrol: 110,
    retail_price: 5.2,
    custom_duty: 0.5,
    road_maintenance: 0.05,
    pending_dev_tax: 7,
    pollution_fees: 7,
    price_stabilization: 7,
    VAT: 7,
    avg_transportation_cost: 7,
    insurance: 7,
    administrative_cost: 7,
    technological_loss: 7,
    determined_profit: 7,
    fuel_station: 7,
    published_at: "2019-05-02 16:31:11"
  }
};

export default (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case GET_RATES:
      return {
        ...state,
        latestRates: action.payload
      };
    case GET_HISTORY:
      return {
        ...state,
        history: action.payload
      };
    case GET_PREDICTION:
      return {
        ...state,
        prediction: action.payload
      };
    case GET_COMPOSITION:
      return {
        ...state,
        composition: action.payload
      };
    default:
      return state;
  }
};
