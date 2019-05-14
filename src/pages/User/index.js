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
  KeyboardAvoidingView
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

    if (token && user)
      this.setState({
        loggedInUser: user,
        email: user.email
      });
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
    try {
      console.log(this.state.loggedInUser);
      const response = await api.post("/auth/authenticate/user", {
        email: this.state.email
      });

      console.log(response);

      const { user, token } = response.data;

      await AsyncStorage.multiSet([
        ["@Security:token", token],
        ["@Security:user", JSON.stringify(user)]
      ]);

      this.setState({
        loggedInUser: user
      });

      Alert.alert("Login com sucesso");
    } catch (response) {
      console.log(response);
      this.setState({ errorMessage: response.data.error });
    }
  };

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

      this.setState({
        loggedInUser: user,
        email: user.email,
        password: user.password
      });

      Alert.alert("Register success");
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
          {this.state.loggedInUser !== null ? (
            <Title>Login for User</Title>
          ) : (
            <Title>Register for User</Title>
          )}
        </ImageContainer>
        <KeyboardAvoidingView>
          {this.state.errorMessage !== null ? (
            <Text
              style={{
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(255,0,0,0.5)",
                fontWeight: "bold",
                marginHorizontal: WIDTH - 55
              }}
            >
              {this.state.errorMessage}
            </Text>
          ) : null}
          <InputContainer>
            {this.state.loggedInUser !== null ? (
              <Icon
                style={styles.icon}
                name="ios-mail"
                size={28}
                color={"rgba(255,255,255,0.7)"}
              />
            ) : (
              <Icon
                style={styles.icon}
                name="ios-person"
                size={28}
                color={"rgba(255,255,255,0.7)"}
              />
            )}

            {this.state.loggedInUser !== null ? (
              <Email>{this.state.loggedInUser.email}</Email>
            ) : (
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor={"rgba(255,255,255,0.7)"}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={email => this.setState({ email })}
              />
            )}
          </InputContainer>

          <InputContainer>
            <Icon
              style={styles.icon}
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
        })} */}
        </KeyboardAvoidingView>
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
  icon: {
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
  }
});
