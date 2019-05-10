import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";

import Home from "./pages";
import Police from "./pages/Police";
import User from "./pages/User";

const Routes = createAppContainer(
  createSwitchNavigator({
    Home: createStackNavigator({
      Home: {
        screen: Home
      }
    }),
    Police: createStackNavigator({
      Police: {
        screen: Police
      }
    }),
    User: createStackNavigator({
      User: {
        screen: User
      }
    })
  })
);

export default Routes;
