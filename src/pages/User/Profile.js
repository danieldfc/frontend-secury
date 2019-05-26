import React, { Component } from "react";
import { StyleSheet } from "react-native";

import { Container, Title } from "./styles";

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
  render() {
    return (
      <Container style={{ alignItems: "center", justifyContent: "center" }}>
        <Title>Profile</Title>
      </Container>
    );
  }
}
