import React, { Component } from "react";
import api from "../../services/api";
import AsyncStorage from "@react-native-community/async-storage";
import { Alert, StyleSheet } from "react-native";
import logo from "../../assets/logo.png";
import {
  Container,
  Title,
  Input,
  Button,
  ButtonText,
  Image,
  ImageContainer,
  InputContainer,
  Icon,
  EyeButton
} from "./styles";

const { width: WIDTH } = Dimensions.get("window");

//import { Platform, DeviceEventEmitter } from "react-native";
//import QuickActions from "react-native-quick-actions";

// QuickActions.setShortcutItems([
//   {
//     type: "Orders",
//     title: "See your orders",
//     subtitle: "Compose",
//     icon: Platform.OS === 'ios' ? "Icona" : "icon",
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

  constructor() {
    super();
    this.state = {
      loggedInUser: null,
      errorMessage: null,
      email: null,
      password: null,
      showPass: true,
      press: false
    };
  }

  showPass = () => {
    const { press } = this.state;
    if (press === false) {
      this.setState({ showPass: false, press: true });
    } else {
      this.setState({ showPass: true, press: false });
    }
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
        <ImageContainer>
          <Image source={logo} />
          <Title>Register for User</Title>
        </ImageContainer>
        <InputContainer>
          <Icon
            style={styles.inputIcon}
            name={"ios-person-outline"}
            size={28}
            color={"rgba(255,255,255,0.7)"}
          />
          <Input
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={"rgba(255,255,255,0.7)"}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={email => this.setState({ email })}
          />
        </InputContainer>

        <InputContainer>
          <Icon
            style={styles.inputIcon}
            name={"ios-lock-outline"}
            size={28}
            color={"rgba(255,255,255,0.7)"}
          />
          <Input
            placeholder="Password"
            placeholderTextColor="#ccc"
            onChangeText={password => this.setState({ password })}
            secureTextEntry={this.state.showPass}
          />
          <EyeButton onPress={this.showPass.bind(this)}>
            <Icon
              name={
                this.state.press === false
                  ? "ios-eye-off-outline"
                  : "ios-eye-outline"
              }
              size={26}
              color={"rgba(255,255,255,0.7)"}
            />
          </EyeButton>
        </InputContainer>

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
const styles = StyleSheet.create({
  inputIcon: {
    position: "absolute",
    top: 8,
    left: 37
  },
  input: {
    width: WIDTH - 55,
    height: 45,
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 16,
    borderRadius: 45,
    marginHorizontal: 25,
    paddingLeft: 10
  }
});
