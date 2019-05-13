import React, { Component } from "react";
import { Container, Title, Input, Button, ButtonText } from "./styles";
import api from "../../services/api";
import AsyncStorage from "@react-native-community/async-storage";
import { Text, Alert } from "react-native";

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
    loggedInUser: null,
    errorMessage: null,
    email: null,
    password: null
  };

  // getProjectList = async () => {
  //   try {
  //     const response = await api.get("/tasks");

  //     const { projects } = response.data;

  //     this.setState({ projects });
  //   } catch (response) {
  //     this.setState({ errorMessage: response.data.error });
  //   }
  // };

  async componentDidMount() {
    const token = await AsyncStorage.getItem("@Security:token");
    const user = JSON.parse(await AsyncStorage.getItem("@Security:user"));
    const police = JSON.parse(await AsyncStorage.getItem("@Security:police"));

    if (token && user) this.setState({ loggedInUser: user });

    if (token && police) this.setState({ loggedInUser: police });
  }

  registerUser = async () => {
    try {
      const response = await api.post("/auth/register/user", {
        email,
        password
      });
      console.log(response);

      const { user, token } = response.data;

      await AsyncStorage.multiSet([
        ["@Security:token", token],
        ["@Security:user", JSON.stringify(user)]
      ]);

      this.setState({ loggedInUser: user });

      Alert.alert("Login com sucesso", `Email: ${user.email}`);
    } catch (response) {
      console.log(response);
      this.setState({ errorMessage: response.data.error });
    }
  };
  render() {
    return (
      <Container>
        <Title>Register for User</Title>
        <Input
          placeholder="Email"
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor="#ccc"
          onChangeText={email => this.setState({ email })}
        />
        <Input
          placeholder="Password"
          placeholderTextColor="#ccc"
          onChangeText={password => this.setState({ password })}
          secureTextEntry
        />
        <Button onPress={this.registerUser}>
          <ButtonText>Register</ButtonText>
        </Button>
        {/* {!!this.state.errorMessage && <Text>{this.state.errorMessage}</Text>}
        {!!this.state.loggedInUser && (
          <Text>{this.state.loggedInUser.email}</Text>
        )}
        {this.state.loggedInUser ? (
          <Button onPress={this.getProjectList}>
            <ButtonText>Carregar</ButtonText>
          </Button>
        ) : (
          <Button onPress={this.registerUser}>
            <ButtonText>Register</ButtonText>
          </Button>
        )}

        {this.state.projects.map(project => {
          <View key={project._id} style={{ marginTop: 15 }}>
            <Text style={{ fontWeight: "bold" }}>{project.title}</Text>
            <Text>{project.description}</Text>
          </View>;
        })} */}
      </Container>
    );
  }
}
