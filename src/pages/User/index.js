import React, { Component } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import Icon from "react-native-vector-icons/Ionicons";
import api from "../../services/api";
import logo from "../../assets/logo.png";
import {
  Alert,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Text,
  Platform,
  ToastAndroid,
  PermissionsAndroid
} from "react-native";
import {
  ButtonText,
  Container,
  Email,
  EyeButton,
  Image,
  ImageContainer,
  InputContainer,
  Title
} from "./styles";

const { width: WIDTH } = Dimensions.get("window");

export default class App extends Component {
  watchId = null;

  static navigationOptions = {
    title: "User",
    headerTransparent: true,
    headerTintColor: "#fff"
  };

  state = {
    loggedInUser: null,
    errorMessage: null,
    email: null,
    password: null,
    showPass: true,
    press: false
  };

  async componentDidMount() {
    const token = await AsyncStorage.getItem("@Security:token");
    const user = JSON.parse(await AsyncStorage.getItem("@Security:user"));

    if (token && user) {
      this.setState({
        loggedInUser: user,
        email: user.email,
        password: user.password
      });
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
    const { email, password } = this.state;
    try {
      const response = await api.post("/auth/authenticate/user", {
        email,
        password
      });

      const { user, token } = response.data;

      await AsyncStorage.multiSet([
        ["@Security:token", token],
        ["@Security:user", JSON.stringify(user)]
      ]);

      this.setState({
        loggedInUser: user
      });

      Alert.alert("Login success!");

      this.props.navigation.navigate("MapaU");
    } catch (response) {
      Alert.alert(response.data.error);
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

      this.setState({
        loggedInUser: user,
        email: user.email,
        password: user.password
      });

      Alert.alert("Register success!");

      this.props.navigation.navigate("MapaU");
    } catch (response) {
      this.setState({ errorMessage: response.data.error });
    }
  };

  render() {
    return (
      <Container>
        <Image source={logo} />
        <ImageContainer>
          {!!this.state.loggedInUser !== null ? (
            <Title>Login for User</Title>
          ) : (
            <Title>Register for User</Title>
          )}
        </ImageContainer>
        {!!this.state.errorMessage && (
          <Text style={styles.error}>{this.state.errorMessage}</Text>
        )}
        <InputContainer>
          <Icon
            style={styles.iconMail}
            name="ios-mail"
            size={28}
            color={"rgba(255,255,255,0.7)"}
          />
          {!!this.state.loggedInUser !== null ? (
            <Email>{this.state.email}</Email>
          ) : (
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={"rgba(255,255,255,0.7)"}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={email => this.setState({ email })}
            />
          )}
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
              name={this.state.press === false ? "ios-eye-off" : "ios-eye"}
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
          }) */}

        {this.state.loggedInUser !== null ? (
          <TouchableOpacity style={styles.button} onPress={this.loginUser}>
            <ButtonText>Login</ButtonText>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={this.registerUser}>
            <ButtonText>Register</ButtonText>
          </TouchableOpacity>
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
    top: 8
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
    fontWeight: "bold",
    marginHorizontal: WIDTH - 55
  }
});
