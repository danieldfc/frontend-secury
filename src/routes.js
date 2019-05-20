import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
  createDrawerNavigator
} from "react-navigation";

import Home from "./pages/Home";
import Police from "./pages/Police";
import User from "./pages/User";
import MapaUser from "./pages/User/Mapa";
import MapaPolice from "./pages/Police/Mapa";
import Drawer from "./components/Drawer";

const Routes = createAppContainer(
  createSwitchNavigator({
    Home: createStackNavigator({
      Home: {
        screen: Home
      }
    }),
    Police: createDrawerNavigator({
      Police: {
        screen: Police
      },
      Profile: { screen: Drawer }
    }),
    User: createDrawerNavigator({
      User: {
        screen: User
      },
      Profile: { screen: Drawer }
    }),
    MapaUser: createStackNavigator({
      MapaUser: {
        screen: MapaUser
      }
    }),
    MapaPolice: createStackNavigator({
      MapaPolice: {
        screen: MapaPolice
      }
    })
  })
);

export default Routes;
