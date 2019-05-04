import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

// Import all the reducers created for each part of the store
import authReducer from "./auth";
import ratesReducer from "./rates";
import termsReducer from "./terms";

const persistConfig = {
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ["navigation"]
};

const rootReducer = combineReducers({
  // fieldInStore: Reducer
  auth: authReducer,
  rates: ratesReducer,
  terms: termsReducer
});

export default persistReducer(persistConfig, rootReducer);
