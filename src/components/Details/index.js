import React, { Component } from "react";

import {
  Container,
  TypeTitle,
  TypeDescription,
  TypeImage,
  RequestButton,
  RequestButtonText
} from "./styles";

import image from "../../assets/uberx.png";

export default class Details extends Component {
  render() {
    return (
      <Container>
        <TypeTitle>Popular</TypeTitle>
        <TypeDescription>Viagens baratas para o dia-a-dia</TypeDescription>
        <TypeImage source={image} />
        <TypeTitle>Security Total</TypeTitle>
        <TypeDescription>R$ 6,00</TypeDescription>

        <RequestButton onPress={() => {}}>
          <RequestButtonText>Solicitar</RequestButtonText>
        </RequestButton>
      </Container>
    );
  }
}
