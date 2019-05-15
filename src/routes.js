import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";

import Home from "./pages/Home";
import Police from "./pages/Police";
import User from "./pages/User";
import MapaUser from "./pages/User/Mapa";
import MapaPolice from "./pages/Police/Mapa";

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
      },
      Mapa: {
        screen: MapaPolice
      }
    }),
    User: createStackNavigator({
      User: {
        screen: User
      },
      Mapa: {
        screen: MapaUser
      }
    })
  })
);

export default Routes;
