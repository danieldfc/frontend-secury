import { createAppContainer, createSwitchNavigator } from "react-navigation";

import Home from "./pages";
import Police from "./pages/Police";
import User from "./pages/User";

const Routes = createAppContainer(
  createSwitchNavigator({
    Home,
    Police,
    User
  })
);

export default Routes;
