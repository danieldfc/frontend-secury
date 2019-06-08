import React, { Component } from "react";
import { StyleSheet, RefreshControl, Platform } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import api from "../../services/api";

import {
  ContainerProfile,
  TitleProfile,
  ProfileScrollView,
  EmailInput,
  ButtonUpdate,
  ButtonUpdateText,
  PasswordInput,
  CpfInput,
  ButtonExit,
  ButtonExitText
} from "./styles";

export default class Profile extends Component {
  static navigationOptions = {
    title: "Profile",
    headerTransparent: true,
    headerTintColor: "#fff",
    barStyle: {
      backgroundColor: "#059",
      borderTopWidth: StyleSheet.hairlineWidth,
      borderStyle: "solid",
      borderColor: "#d0cfd0"
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      Police: {},
      editable: false,
      email: null,
      password: null,
      cpf: null,
      refreshing: false
    };
  }

  async componentDidMount() {
    const police = JSON.parse(await AsyncStorage.getItem("@Security:police"));

    this.setState({ Police: police });
  }

  handleProfile = async () => {
    const { Police, email, password, cpf } = this.state;

    if (!email && !password && !cpf) {
      alert("Você precisa alterar os campos.");

      this.setState({ password: null, email: null, cpf: null });

      this.showPass();
      return this._onRefresh();
    }
    if (!email || !password || !cpf) {
      if (!email) {
        const response = await api.post(`/auth/update/police/${Police._id}`, {
          password,
          cpf
        });
        const { police } = response.data;

        const parsed = JSON.stringify(police);

        await AsyncStorage.setItem("@Security:police", parsed);
      }
      if (!password || !cpf) {
        if (!password) {
          const response = await api.post(`/auth/update/police/${Police._id}`, {
            email,
            cpf
          });
          const { police } = response.data;

          const parsed = JSON.stringify(police);

          await AsyncStorage.setItem("@Security:police", parsed);
        }
        if (!cpf) {
          const response = await api.post(`/auth/update/police/${Police._id}`, {
            email,
            password
          });
          const { police } = response.data;

          const parsed = JSON.stringify(police);

          await AsyncStorage.setItem("@Security:police", parsed);
        }
      }
    } else {
      const response = await api.post(`/auth/update/police/${Police._id}`, {
        email,
        password,
        cpf
      });
      const { police } = response.data;

      const parsed = JSON.stringify(police);

      await AsyncStorage.setItem("@Security:police", parsed);
    }
    alert("O usuário foi atualizado com sucesso!");

    this.showPass();
    this._onRefresh();
    this.setState({ password: null, email: null, cpf: null });
  };

  handleExit = async () => {
    await AsyncStorage.setItem("@Security:police", "");
    this.props.navigation.navigate("Home");
  };

  showPass = () => {
    const { editable } = this.state;
    if (editable === false) {
      this.setState({ editable: true });
    } else if (editable === true) {
      this.setState({ editable: false });
    }
  };

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.componentDidMount().then(() => {
      this.setState({ refreshing: false });
    });
  };

  render() {
    const { Police, editable, refreshing } = this.state;
    return (
      <ContainerProfile>
        <TitleProfile>Profile</TitleProfile>
        <ProfileScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
        >
          <EmailInput
            placeholder="Email"
            placeholderTextColor="#999"
            onChangeText={email => this.setState({ email })}
            defaultValue={Police.email}
            editable={editable}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <CpfInput
            placeholder="CPF"
            placeholderTextColor="#999"
            onChangeText={cpf => this.setState({ cpf })}
            editable={editable}
            keyboardType={Platform.select({
              ios: "numbers-and-punctuation",
              android: "numeric"
            })}
          />
          <PasswordInput
            placeholder="Password"
            placeholderTextColor="#999"
            onChangeText={password => this.setState({ password })}
            secureTextEntry
            editable={editable}
          />
          {editable ? (
            <ButtonUpdate onPress={this.handleProfile}>
              <ButtonUpdateText>UPDATE</ButtonUpdateText>
            </ButtonUpdate>
          ) : (
            <ButtonUpdate onPress={this.showPass}>
              <ButtonUpdateText>EDIT</ButtonUpdateText>
            </ButtonUpdate>
          )}
          <ButtonExit onPress={this.handleExit}>
            <ButtonExitText>EXIT</ButtonExitText>
          </ButtonExit>
        </ProfileScrollView>
      </ContainerProfile>
    );
  }
}
