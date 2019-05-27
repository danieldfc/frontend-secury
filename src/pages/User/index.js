import React, { Component } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import Icon from "react-native-vector-icons/Ionicons";
import api from "../../services/api";
import logo from "../../assets/logo.png";
import {
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Text
} from "react-native";
import {
  ButtonText,
  Container,
  Title,
  LoggedIn,
  LoggedInText,
  Image,
  ImageContainer,
  InputContainer,
  EyeButton
} from "./styles";

const { width: WIDTH } = Dimensions.get("window");

export default class User extends Component {
  static navigationOptions = {
    title: "User",
    headerTransparent: true,
    headerTintColor: "#fff"
  };

  state = {
    showPass: true,
    press: false,
    loggedInUser: null,
    errorMessage: null,
    email: null,
    password: null,
    location: null
  };

  async componentDidMount() {
    const token = await AsyncStorage.getItem("@Security:token");
    const user = JSON.parse(await AsyncStorage.getItem("@Security:user"));

    if (token && user) {
      this.setState({
        loggedInUser: user,
        email: user.email,
        location: user.location
      });
      this.props.navigation.navigate("MapaUser");
    }
  }

  showPass = () => {
    const { press } = this.state;

    if (press === false) {
      this.setState({ showPass: false, press: true });
    } else {
      this.setState({ showPass: true, press: false });
    }
  };

  loginUser = async () => {
    const { email, password, location } = this.state;
    try {
      const response = await api.post("/auth/authenticate/user", {
        email,
        password,
        location
      });

      const { user, token } = response.data;

      await AsyncStorage.multiSet([
        ["@Security:token", token],
        ["@Security:user", JSON.stringify(user)]
      ]);

      const parsed = JSON.parse(user);

      this.setState({
        loggedInUser: parsed,
        email: parsed.email,
        password: parsed.password
      });

      this.props.navigation.navigate("MapaUser");
    } catch (response) {
      this.setState({ errorMessage: response.data.error });
    }
  };

  registerUser = async () => {
    const { email, password } = this.state;

    try {
      const response = await api.post("/auth/register/user", {
        email,
        password
      });

      const { user, token } = response.data;

      await AsyncStorage.multiSet([
        ["@Security:token", token],
        ["@Security:user", JSON.stringify(user)]
      ]);

      const parsed = JSON.parse(user);

      this.setState({
        loggedInUser: parse,
        email: parsed.email,
        password: parsed.password
      });

      this.props.navigation.navigate("MapaUser");
    } catch (response) {
      this.setState({ errorMessage: response.data.error });
    }
  };

  render() {
    const { loggedInUser, errorMessage, press } = this.state;

    return (
      <Container>
        <Image source={logo} />
        <ImageContainer>
          {loggedInUser !== null ? (
            <Title>Login for User</Title>
          ) : (
            <Title>Register for User</Title>
          )}
        </ImageContainer>
        {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
        <InputContainer>
          <Icon
            style={styles.iconMail}
            name="ios-mail"
            size={28}
            color={"rgba(255,255,255,0.7)"}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={"rgba(255,255,255,0.7)"}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={email => this.setState({ email })}
          />
        </InputContainer>

        <InputContainer>
          <Icon
            style={styles.iconLock}
            name={"ios-lock"}
            size={28}
            color={"rgba(255,255,255,0.7)"}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#ccc"
            onChangeText={password => this.setState({ password })}
            secureTextEntry={this.state.showPass}
          />
          <EyeButton onPress={this.showPass.bind(this)}>
            <Icon
              name={press === false ? "ios-eye-off" : "ios-eye"}
              size={26}
              color={"rgba(255,255,255,0.7)"}
            />
          </EyeButton>
        </InputContainer>
        {/* {this.state.projects.map(project => {
          <View key={project._id} style={{ marginTop: 15 }}>
            <Text style={{ fontWeight: "bold" }}>{project.title}</Text>
            <Text>{project.description}</Text>
          </View>;
        })} */}

        {loggedInUser !== null ? (
          <>
            <TouchableOpacity style={styles.button} onPress={this.loginUser}>
              <ButtonText>Login</ButtonText>
            </TouchableOpacity>
            <LoggedIn onPress={() => this.setState({ loggedInUser: null })}>
              <LoggedInText>Não possui login?</LoggedInText>
            </LoggedIn>
          </>
        ) : (
          <>
            <TouchableOpacity style={styles.button} onPress={this.registerUser}>
              <ButtonText>Register</ButtonText>
            </TouchableOpacity>
            <LoggedIn onPress={() => this.setState({ loggedInUser: "user" })}>
              <LoggedInText>Já possui login?</LoggedInText>
            </LoggedIn>
          </>
        )}
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  iconLock: {
    position: "absolute",
    top: 8,
    left: 37
  },
  iconMail: {
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
    paddingLeft: 45
  },
  button: {
    width: WIDTH - 55,
    height: 45,
    backgroundColor: "#096",
    fontSize: 16,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  error: {
    alignItems: "center",
    justifyContent: "center",
    color: "rgba(255,0,0,0.5)",
    fontWeight: "bold"
  }
});
