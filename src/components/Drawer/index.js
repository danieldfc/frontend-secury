import React, { Component } from "react";
import { Image, Button } from "react-native";
import { createAppContainer, createDrawerNavigator } from "react-navigation";

class MyNotificationsScreen extends Component {
  static navigationOptions = {
    drawerLabel: "Notifications",
    drawerIcon: ({ tintColor }) => (
      <Image
      //source={require("./notif-icon.png")}
      //style={[styles.icon, { tintColor: tintColor }]}
      />
    )
  };

  render() {
    return (
      <Button
        onPress={() => this.props.navigation.goBack()}
        title="Go back home"
      />
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24
  }
});
