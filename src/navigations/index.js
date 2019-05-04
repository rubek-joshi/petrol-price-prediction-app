import { createSwitchNavigator, createAppContainer } from "react-navigation";

import AuthNav from "./auth";
import AppNav from "./app";
import LoadingScreen from "../screens/loading";
import ResetPasswordNav from "./resetPassword";

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: LoadingScreen,
      Auth: AuthNav,
      App: AppNav,
      Password: ResetPasswordNav
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);
