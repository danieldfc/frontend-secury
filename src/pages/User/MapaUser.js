import React, { Component } from "react";
import { Animated } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";

import Icon from "react-native-vector-icons/MaterialIcons";

import Map from "../../components/Map";
import api from "../../services/api";

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
  state = {
    email: null
  };

  // componentDidMount() {
  //   const email = this.props.navigation.getParam("email", "Anônimo");
  //   alert(JSON.stringify(email));

  //   this.setState({ email });
  // }

  handlerRegisterTask = async () => {
    const tast = await api.post("/task/", {});
  };

  render() {
    let offset = 0;
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
    onHandlerStateChange = event => {
      if (event.nativeEvent.oldState === State.ACTIVE) {
        var opened = false;
        const { translationY } = event.nativeEvent;

        offset += translationY;

        if (translationY >= 100) {
          opened = true;
        } else {
          translateY.setValue(offset);
          translateY.setOffset(0);
          offset = 0;
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
                {/* {this.state.email.user.email && (
                  <Title>{this.state.email.user.email}</Title>
                )} */}
                <Description
                  placeholder="Descrição"
                  placeholderTextColor="#ccc"
                  autoCapitalize="none"
                  defaultValue="Help me."
                />
              </CardContent>
              <CardFooter>
                <Button onPress={this.handlerRegisterTask}>
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
