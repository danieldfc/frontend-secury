import React, { Component } from "react";
import { Container, Title, Input, Button, ButtonText } from "./styles";
import api from "../../services/api";
import AsyncStorage from "@react-native-community/async-storage";
import { Text } from "react-native";

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

  state = {
    errorMessage: null
  };

  registerUser = async () => {
    try {
      const response = await api.post("/auth/authenticate", {
        email: "daniel.david772f@gmail.com",
        password: "123456",
        location: "Areia"
      });
      this.setState({ errorMessage: response });

      const { user, token } = response.data;
      await AsyncStorage.multiSet([
        ["@Security:token", token],
        ["@Security:user", JSON.stringify(user)]
      ]);
    } catch (err) {
      this.setState({ errorMessage: response.data.error });
    }
  };
  render() {
    return (
      <Container>
        <Title>Welcome to user!</Title>
        <Input />
        <Input />
        <Input />
        <Button onPress={this.registerUser}>
          <ButtonText>Register</ButtonText>
        </Button>
        {this.state.errorMessage ? (
          <Text>{this.state.errorMessage}</Text>
        ) : null}
      </Container>
    );
  }
}
