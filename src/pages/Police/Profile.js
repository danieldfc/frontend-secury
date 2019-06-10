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
      Police: {},
      editable: false,
      cpf: null,
      email: null,
      password: null,
      refreshing: false,
      errorMessage: null
    };
  }

  async componentDidMount() {
    const police = JSON.parse(await AsyncStorage.getItem("@Security:police"));

    this.setState({ Police: police });
  }

  handleProfile = async () => {
    const { Police, email, password, cpf } = this.state;
    try {
      if (!email && !password && !cpf) {
        alert("Você precisa alterar os campos.");

        this.setState({ password: null, email: null, cpf: null });

        this.showPass();
        return this._onRefresh();
      }

      if (!email) {
        const response = await api.post(`/auth/update/police/${Police._id}`, {
          email: Police.email,
          password,
          cpf
        });

        const { police } = response.data;

        const parsed = JSON.stringify(police);

        await AsyncStorage.setItem("@Security:police", parsed);

        alert("Sua senha e cpf foi atualizada com sucesso!");

        this.setState({ password: null, email: null, cpf: null });

        this.showPass();
        return this._onRefresh();
      }

      if (password === null) {
        const response = await api.post(`/auth/update/police/${Police._id}`, {
          email,
          cpf
        });

        const { police } = response.data;

        const parsed = JSON.stringify(police);

        await AsyncStorage.setItem("@Security:police", parsed);

        alert("Seu email e CPF foi atualizado com sucesso!");

        this.setState({ password: null, email: null });

        this.showPass();
        return this._onRefresh();
      }
      if (!cpf) {
        const response = await api.post(`/auth/update/police/${Police._id}`, {
          email,
          password,
          cpf: Police.cpf
        });

        const { police } = response.data;

        const parsed = JSON.stringify(police);

        await AsyncStorage.setItem("@Security:police", parsed);

        alert("O usuário foi atualizado com sucesso!");

        this.setState({ password: null, email: null, cpf: null });

        this.showPass();
        return this._onRefresh();
      }
      const response = await api.post(`/auth/update/police/${Police._id}`, {
        email,
        password,
        cpf
      });

      const { police } = response.data;

      const parsed = JSON.stringify(police);

      await AsyncStorage.setItem("@Security:police", parsed);

      alert("O usuário foi atualizado com sucesso!");

      this.setState({ password: null, email: null, cpf: null });

      this.showPass();
      return this._onRefresh();
    } catch (err) {
      this.setState({ errorMessage: err });
    }
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
            placeholder="CPF"
            placeholderTextColor="#999"
            onChangeText={cpf => this.setState({ cpf })}
            defaultValue={Police.cpf}
            editable={editable}
          />
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
