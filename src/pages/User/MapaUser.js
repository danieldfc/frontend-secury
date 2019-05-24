import React, { Component } from "react";
import Map from "../../components/Map";
import { Animated, Text } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";

import Icon from "react-native-vector-icons/MaterialIcons";

import {
  Annotation,
  Button,
  ButtonText,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Container,
  Content,
  Description,
  Title
} from "./styles";

export default class Mapa extends Component {
  static navigationOptions = {
    headerTransparent: true,
    headerHintColor: "#000"
  };

  render() {
    let offset = 0;
    let opened = false;
    const translateY = new Animated.Value(0);
    const animatedEvent = Animated.event(
      [
        {
          nativeEvent: {
            translationY: translateY
          }
        }
      ],
      {
        useNativeDriver: true
      }
    );

    onHandlerStateChange = async event => {
      if (event.nativeEvent.oldState === State.ACTIVE) {
        const { translationY } = event.nativeEvent;

        offset += translationY;

        if (translationY >= 100) {
          opened = true;
        } else {
          offset = 0;
          translateY.setValue(offset);
          translateY.setOffset(0);
        }

        Animated.timing(translateY, {
          toValue: opened ? 380 : 0,
          duration: 200,
          useNativeDriver: true
        }).start(() => {
          offset = opened ? 380 : 0;
          translateY.setOffset(offset);
          translateY.setValue(0);
        });
      }
    };

    return (
      <Container>
        <Content>
          <Map translateY={translateY} />
          <PanGestureHandler
            onGestureEvent={animatedEvent}
            onHandlerStateChange={onHandlerStateChange}
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
                <Title>
                  User {opened ? <Text>{opened}</Text> : <Text>No</Text>}
                </Title>
                <Description>Descrição</Description>
              </CardContent>
              <CardFooter>
                <Button onPress={() => {}}>
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
