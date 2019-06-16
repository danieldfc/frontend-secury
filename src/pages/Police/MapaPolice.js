import React, { Component } from "react";
import { Animated, StyleSheet, Text } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-community/async-storage";
import socket from "socket.io-client";

import Map from "../../components/Map";
import api from "../../services/api";
import { BaseUrl } from "../../config/auth.json";

import {
  Button,
  ButtonText,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardHeaderTitle,
  ContainerMapa,
  Content,
  Description,
  TitleTask,
  TitleTaskDesc
} from "./styles";

const tabBarIcon = name => ({ tintColor }) => {
  <Icon
    style={{ backgroundColor: "transparent" }}
    name={name}
    color={tintColor}
    size={24}
  />;
};

export default class MapaPolice extends Component {
  static navigationOptions = {
    title: "Mapa",
    headerTransparent: true,
    headerTintColor: "#fff",
    barStyle: {
      backgroundColor: "#059",
      borderTopWidth: StyleSheet.hairlineWidth,
      borderStyle: "solid",
      borderColor: "#d0cfd0",
      tabBarIcon: tabBarIcon("map")
    }
  };
  state = {
    email: null,
    title: null,
    description: null,
    task: {},
    errorMessage: null,
    destination: null,
    location: null
  };

  async componentDidMount() {
    this.subscribeToNewTask();

    const task = this.props.navigation.getParam("task", "anonimo");
    const parsed = JSON.parse(task);
    this.setState({ task: parsed });
    // const police = await AsyncStorage.getItem("@Security:police");
    // const parsed = JSON.parse(police);

    // this.setState({ email: parsed.email });
  }

  subscribeToNewTask = () => {
    const io = socket(BaseUrl);

    io.on("task", task => {
      this.setState({ task: [task, ...this.state.task] });
    });
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
        let opened = false;
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
    const { errorMessage } = this.state;
    return (
      <ContainerMapa>
        <Content>
          <Map translateY={translateY} option={"police"} />
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
                <CardHeaderTitle>Task</CardHeaderTitle>
                <Icon name="assignment" size={28} color="#666" />
              </CardHeader>
              <CardContent>
                {errorMessage && <Text>{errorMessage}</Text>}
                <TitleTaskDesc>Coloque seu título</TitleTaskDesc>
                <TitleTask
                  placeholder="Title"
                  placeholderTextColor="#ccc"
                  onChangeText={title => this.setState({ title })}
                />
                <TitleTaskDesc>Coloque sua descrição</TitleTaskDesc>
                <Description
                  placeholder="Descrição"
                  placeholderTextColor="#ccc"
                  autoCapitalize="none"
                  onChangeText={description => this.setState({ description })}
                />
              </CardContent>
              <CardFooter>
                <Button onPress={this.handlerRegisterTask}>
                  <ButtonText>Solicitar</ButtonText>
                </Button>
              </CardFooter>
            </Card>
          </PanGestureHandler>
        </Content>
      </ContainerMapa>
    );
  }
}
