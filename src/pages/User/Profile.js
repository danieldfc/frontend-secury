import React, { Component } from "react";

import { Container, Title } from "./styles";

export default class Profile extends Component {
  render() {
    return (
      <Container style={{ alignItems: "center", justifyContent: "center" }}>
        <Title>Profile</Title>
      </Container>
    );
  }
}
