import React, { Component } from "react";
import { Container, Title, Input, Button, ButtonText } from "./styles";
//import { Platform, DeviceEventEmitter } from "react-native";
//import QuickActions from "react-native-quick-actions";

// QuickActions.setShortcutItems([
//   {
//     type: "Orders",
//     title: "See your orders",
//     subtitle: "Compose",
//     icon: Platform.OS === 'ios' ? "Icon" : "icon",
//     userInfo: {
//       url: "app://orders"
//     }
//   }
// ]);
// DeviceEventEmitter.addListener('quickActionShortcut', data=> {
// console.log(data);
//});
// QuickActions.popInitialAction().then(data=> {
// console.log(data);
//})

export default class App extends Component {
  static navigationOptions = {
    title: "User",
    headerTransparent: true,
    headerTintColor: "#fff"
  };
  render() {
    return (
      <Container>
        <Title>Welcome to user!</Title>
        <Input />
        <Input />
        <Input />
        <Button>
          <ButtonText>Register</ButtonText>
        </Button>
      </Container>
    );
  }
}
