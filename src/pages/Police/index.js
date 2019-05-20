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
    title: "Police",
    headerTransparent: true,
    headerTintColor: "#fff",
    drawerLabel: "Profile",
    drawerIcon: ({ tintColor }) => (
      <Image
      //source={require('./chats-icon.png')}
      //style={[styles.icon, {tintColor: tintColor}]}
      />
    )
  };

  render() {
    return (
      <Button
        onPress={() => this.props.navigation.navigate("Notifications")}
        title="Go to notifications"
      />
    );
  }

  constructor() {
    super();
    this.state = {
      loggedInUser: null,
      errorMessage: null,
      cpf: null,
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
    const police = JSON.parse(await AsyncStorage.getItem("@Security:police"));

    if (token && police)
      this.setState({
        loggedInPolice: police,
        cpf: police.cpf,
        email: police.email
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

  loginPolice = async () => {
    try {
      console.log(this.state.loggedInUser);
      const response = await api.post("/auth/authenticate/police", {
        cpf: this.state.cpf,
        email: this.state.email,
        password: this.state.password
      });

      console.log(response);

      const { police, token } = response.data;

      await AsyncStorage.multiSet([
        ["@Security:token", token],
        ["@Security:user", JSON.stringify(police)]
      ]);

      this.setState({
        loggedInUser: police
      });

      Alert.alert("Login com sucesso");
    } catch (response) {
      console.log(response);
      this.setState({ errorMessage: response.data.error });
    }
  };

  registerPolice = async () => {
    try {
      const response = await api.post("/auth/register/user", {
        cpf,
        email,
        password
      });
      console.log(response);

      const { police, token } = response.data;

      await AsyncStorage.multiSet([
        ["@Security:token", token],
        ["@Security:user", JSON.stringify(police)]
      ]);

      this.setState({
        loggedInUser: police,
        email: police.email,
        password: police.password
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
          {this.state.loggedInPolice !== null ? (
            <Title>Login for Police</Title>
          ) : (
            <Title>Register for Police</Title>
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
          {/* falta cpf */}
          <InputContainer>
            {this.state.loggedInPolice !== null ? (
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

            {this.state.loggedInPolice !== null ? (
              <Email>{this.state.loggedInPolice.email}</Email>
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
        {this.state.loggedInPolice !== null ? (
          <TouchableOpacity style={styles.button} onPress={this.loginPolice}>
            <ButtonText>Login</ButtonText>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={this.registerPolice}>
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
