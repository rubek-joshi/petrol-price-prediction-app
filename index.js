import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import React from "react";
import { Provider } from "react-redux";
import store from "./src/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import Loading from "./src/components/loadingIndicator";

const persistor = persistStore(store);

const RootContainer = () => (
  <Provider store={store}>
    <PersistGate loading={<Loading />} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

AppRegistry.registerComponent(appName, () => RootContainer);
