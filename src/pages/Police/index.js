import React, { Component, Fragment } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import Icon from "react-native-vector-icons/Ionicons";
import api from "../../services/api";
import logo from "../../assets/logo.png";
import {
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Text,
  Platform,
  KeyboardAvoidingView
} from "react-native";
import {
  ButtonText,
  Container,
  EyeButton,
  LoggedIn,
  LoggedInText,
  Image,
  ImageContainer,
  InputContainer,
  Title
} from "./styles";

const { width: WIDTH } = Dimensions.get("window");

export default class Police extends Component {
  static navigationOptions = {
    title: "Police",
    headerTransparent: true,
    headerTintColor: "#fff"
  };

  constructor(props) {
    super(props);
    this.state = {
      loggedInPolice: null,
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

    if (token && police) {
      this.setState({
        loggedInPolice: police,
        cpf: police.cpf,
        email: police.email,
        password: police.password
      });
      this.props.navigation.navigate("MapaPolice");
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

  loginPolice = async () => {
    const { cpf, email, password } = this.state;
    try {
      const response = await api.post("/auth/authenticate/police", {
        cpf,
        email,
        password
      });

      const { police, token } = response.data;

      await AsyncStorage.multiSet([
        ["@Security:token", token],
        ["@Security:police", JSON.stringify(police)]
      ]);

      this.setState({
        loggedInUser: police
      });

      this.props.navigation.navigate("MapaPolice");
    } catch (response) {
      this.setState({ errorMessage: response.data.error });
    }
  };

  registerPolice = async () => {
    const { cpf, email, password } = this.state;
    try {
      const response = await api.post("/auth/register/police", {
        cpf,
        email,
        password
      });

      const { police, token } = response.data;

      await AsyncStorage.multiSet([
        ["@Security:token", token],
        ["@Security:police", JSON.stringify(police)]
      ]);

      this.setState({
        loggedInPolice: police,
        cpf: police.cpf,
        email: police.email,
        password: police.password
      });

      this.props.navigation.navigate("MapaPolice");
    } catch (response) {
      this.setState({ errorMessage: response.data.error });
    }
  };
  render() {
    const { loggedInPolice, errorMessage, email } = this.state;
    return (
      <Container>
        <ImageContainer>
          <Image source={logo} />
          {loggedInPolice !== null ? (
            <Title>Login for Police</Title>
          ) : (
            <Title>Register for Police</Title>
          )}
        </ImageContainer>
        <KeyboardAvoidingView>
          {errorMessage !== null ? (
            <Text
              style={{
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(255,0,0,0.5)",
                fontWeight: "bold",
                marginHorizontal: WIDTH - 55
              }}
            >
              {errorMessage}
            </Text>
          ) : null}
          <Icon
            style={styles.icon}
            name="ios-key"
            size={28}
            color={"rgba(255,255,255,0.7)"}
          />
          <TextInput
            style={styles.input}
            placeholder="CPF"
            placeholderTextColor={"rgba(255,255,255,0.7)"}
            autoCapitalize="none"
            keyboardType={Platform.select({
              ios: "numbers-and-punctuation",
              android: "numeric"
            })}
            autoCorrect={false}
            onChangeText={cpf => this.setState({ cpf })}
          />
          <InputContainer>
            {loggedInPolice !== null && email ? (
              <Icon
                style={styles.icon}
                name="ios-at"
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
        {loggedInPolice !== null ? (
          <Fragment>
            <TouchableOpacity style={styles.button} onPress={this.loginPolice}>
              <ButtonText>Login</ButtonText>
            </TouchableOpacity>
            <LoggedIn onPress={() => this.setState({ loggedInPolice: null })}>
              <LoggedInText>Não possui login?</LoggedInText>
            </LoggedIn>
          </Fragment>
        ) : (
          <Fragment>
            <TouchableOpacity
              style={styles.button}
              onPress={this.registerPolice}
            >
              <ButtonText>Register</ButtonText>
            </TouchableOpacity>
            <LoggedIn
              onPress={() => this.setState({ loggedInPolice: "police" })}
            >
              <LoggedInText>Já possui login?</LoggedInText>
            </LoggedIn>
          </Fragment>
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
