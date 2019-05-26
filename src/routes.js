import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator
} from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import Home from "./pages/Home";
import Police from "./pages/Police";
import User from "./pages/User";
import Task from "./pages/Task";

import MapaUser from "./pages/User/MapaUser";
import MapaPolice from "./pages/Police/MapaPolice";

import ProfileUser from "./pages/User/Profile";
import ProfilePolice from "./pages/Police/Profile";

const Routes = createAppContainer(
  createSwitchNavigator(
    {
      Home,
      Police: createStackNavigator({
        Police: {
          screen: Police
        }
      }),
      MapaPolice: createMaterialBottomTabNavigator(
        {
          ProfilePolice,
          Task,
          MapaPolice
        },
        {
          shifting: false,
          activeColor: "#059",
          inactiveColor: "#000"
        }
      ),
      User,
      MapaUser: createMaterialBottomTabNavigator(
        {
          MapaUser,
          Task,
          ProfileUser
        },
        {
          shifting: false,
          activeColor: "#fff",
          inactiveColor: "#ccc"
        }
      )
    },
    {
      initialRouteName: "Home"
    }
  )
);

export default Routes;
