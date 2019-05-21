import React, { Component } from "react";
import { Container, Button, ButtonText } from "./styles";
import { Alert } from "react-native";

export default class Search extends Component {
  state = {
    searchFocused: false
  };

  render() {
    const { onLocationSelected } = this.props;
    const { searchFocused } = this.state;

    return (
      <Container>
        <Button
          onPress={() => {
            Alert.alert("oi");
          }}
        >
          <ButtonText>Solicitar</ButtonText>
        </Button>
      </Container>
    );
  }
}
