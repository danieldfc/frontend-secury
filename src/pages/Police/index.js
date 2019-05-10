import React, { Component } from "react";
import { Container, Title } from "./styles";

export default class App extends Component {
  static navigationOptions = {
    title: "Police",
    headerTransparent: true,
    headerTintColor: "#fff"
  };
  render() {
    return (
      <Container style={styles.container}>
        <Title style={styles.welcome}>Welcome to police!</Title>
      </Container>
    );
  }
}
