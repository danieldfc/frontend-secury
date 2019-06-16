import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import Home from "./pages/Home";
import Police from "./pages/Police";
import User from "./pages/User";
import TaskPolice from "./pages/Task";
import TaskUser from "./pages/Task";

import MapaUser from "./pages/User/MapaUser";
import MapaPolice from "./pages/Police/MapaPolice";

import ProfileUser from "./pages/User/Profile";
import ProfilePolice from "./pages/Police/Profile";

const Routes = createAppContainer(
  createSwitchNavigator(
    {
      Home,
      Police,
      NavPolice: createMaterialBottomTabNavigator(
        {
          TaskPolice,
          MapaPolice,
          ProfilePolice
        },
        {
          shifting: false,
          activeColor: "#fff",
          inactiveColor: "#ccc"
        }
      ),
      User,
      NavUser: createMaterialBottomTabNavigator(
        {
          MapaUser,
          TaskUser,
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
