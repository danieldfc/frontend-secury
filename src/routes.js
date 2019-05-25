import React from "react";
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator
} from "react-navigation";
import { StyleSheet } from "react-native";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import Home from "./pages/Home";

import Police from "./pages/Police";
import User from "./pages/User";

import MapaUser from "./pages/User/MapaUser";
import MapaPolice from "./pages/Police/MapaPolice";

import Task from "./pages/Task";
import ProfileUser from "./pages/User/Profile";
import ProfilePolice from "./pages/Police/Profile";

const tabBarIcon = name => ({ tintColor }) => {
  <MaterialIcons
    style={{ backgroundColor: "transparent" }}
    name={name}
    color={tintColor}
    size={24}
  />;
};

const Routes = createAppContainer(
  createSwitchNavigator(
    {
      Home,
      Police,
      Police: createMaterialBottomTabNavigator(
        {
          ProfilePolice: {
            screen: ProfilePolice,
            navigationOptions: {
              title: "Profile",
              headerTransparent: true,
              headerTintColor: "#059"
            }
          },
          Task
        },
        {
          shifting: false,
          activeColor: "#059",
          inactiveColor: "#000",
          barStyle: {
            backgroundColor: "#fff",
            borderTopWidth: StyleSheet.hairlineWidth,
            borderStyle: "solid",
            borderColor: "#d0cfd0"
          }
        }
      ),
      MapaPolice: createStackNavigator({
        MapaPolice
      }),
      User,
      User: createMaterialBottomTabNavigator(
        {
          ProfileUser: {
            screen: ProfileUser,
            navigationOptions: {
              title: "Profile",
              headerTransparent: true,
              headerTintColor: "#059",
              tabBarIcon: tabBarIcon("photo-album")
            }
          },
          Task,
          MapaUser: {
            screen: MapaUser,
            navigationOptions: {
              title: "Mapa",
              headerTransparent: true,
              headerTintColor: "#059",
              tabBarIcon: tabBarIcon("photo-album")
            }
          }
        },
        {
          shifting: false,
          activeColor: "#059",
          inactiveColor: "#000",
          barStyle: {
            backgroundColor: "#fff",
            borderTopWidth: StyleSheet.hairlineWidth,
            borderStyle: "solid",
            borderColor: "#d0cfd0"
          }
        }
      )
    },
    {
      initialRouteName: "Home"
    }
  )
);

export default Routes;
