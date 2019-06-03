import React, { Component } from "react";
import { StyleSheet, RefreshControl } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import api from "../../services/api";

import {
  Container,
  Title,
  ProfileScrollView,
  EmailInput,
  ButtonUpdate,
  ButtonUpdateText,
  PasswordInput
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
      User: {},
      editable: false,
      email: null,
      password: null,
      refreshing: false
    };
  }

  async componentDidMount() {
    const user = JSON.parse(await AsyncStorage.getItem("@Security:user"));

    this.setState({ User: user });
  }

  handleProfile = async () => {
    const { User, email, password } = this.state;

    if (!email && !password) {
      alert("Você precisa alterar os campos.");

      this.setState({ password: null, email: null });

      this.showPass();
      return this._onRefresh();
    }
    if (!email) {
      const response = await api.post(`/auth/update/user/${User._id}`, {
        email: User.email,
        password
      });

      const { user } = response.data;

      const parsed = JSON.stringify(user);

      await AsyncStorage.setItem("@Security:user", parsed);

      alert("Sua senha foi atualizada com sucesso!");

      this.setState({ password: null, email: null });

      this.showPass();
      return this._onRefresh();
    }

    if (password === null) {
      const response = await api.post(`/auth/update/user/${User._id}`, {
        email
      });

      const { user } = response.data;

      const parsed = JSON.stringify(user);

      await AsyncStorage.setItem("@Security:user", parsed);

      alert("Seu email foi atualizado com sucesso!");

      this.setState({ password: null, email: null });

      this.showPass();
      return this._onRefresh();
    }
    const response = await api.post(`/auth/update/user/${User._id}`, {
      email,
      password
    });

    const { user } = response.data;

    const parsed = JSON.stringify(user);

    await AsyncStorage.setItem("@Security:user", parsed);

    alert("O usuário foi atualizado com sucesso!");

    this.setState({ password: null, email: null });

    this.showPass();
    this._onRefresh();
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
    const { User, editable, refreshing } = this.state;
    return (
      <Container>
        <Title>Profile</Title>
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
            defaultValue={User.email}
            editable={editable}
          />
          <PasswordInput
            placeholder="Password"
            placeholderTextColor="#ccc"
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
        </ProfileScrollView>
      </Container>
    );
  }
}
