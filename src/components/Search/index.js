import React, { Component } from "react";

import { Animated } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";

import Icon from "react-native-vector-icons/MaterialIcons";

import {
  Container,
  Button,
  Content,
  ButtonText,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
  Title,
  Description,
  Annotation
} from "./styles";

const offset = 0;
const translateY = new Animated.Value(0);
const animatedEvent = Animated.event(
  [
    {
      nativeEvent: {
        translateY: translateY
      }
    }
  ],
  {
    useNativeDriver: true
  }
);
const { onLocationSelected } = this.props;

export default class Search extends Component {
  onHandlerStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
    }
  };

  render() {
    return (
      <Container>
        <Content>
          <PanGestureHandler
            onGestureEvent={animatedEvent}
            onHandlerStateChange={this.onHandlerStateChange}
          >
            <Card
              style={{
                transform: [
                  {
                    translateY: translateY.interpolate({
                      inputRange: [-350, 0, 380],
                      outputRange: [-50, 0, 380],
                      extrapolate: "clamp"
                    })
                  }
                ]
              }}
            >
              <CardHeader>
                <Icon name="attach-money" size={28} color="#666" />
                <Icon name="visibility-off" size={28} color="#666" />
              </CardHeader>
              <CardContent>
                <Title>User</Title>
                <Description>Descrição</Description>
              </CardContent>
              <CardFooter>
                <Button
                  onPress={() => {
                    Alert.alert("oi");
                  }}
                >
                  <ButtonText>Solicitar</ButtonText>
                </Button>
                <Annotation>Essa é a seção de criação de ocorrência</Annotation>
              </CardFooter>
            </Card>
          </PanGestureHandler>
        </Content>
      </Container>
    );
  }
}
