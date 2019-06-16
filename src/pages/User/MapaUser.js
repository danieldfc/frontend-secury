import React, { Component } from "react";
import { Animated, StyleSheet, Text } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-community/async-storage";

import api from "../../services/api";

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

import Map from "../../components/Map";

const tabBarIcon = name => ({ tintColor }) => {
  <Icon
    style={{ backgroundColor: "transparent" }}
    name={name}
    color={tintColor}
    size={24}
  />;
};

export default class MapaUser extends Component {
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
    occurrence: [],
    errorMessage: null,
    destination: null,
    location: null
  };

  async componentDidMount() {
    const user = await AsyncStorage.getItem("@Security:user");
    const parsed = JSON.parse(user);

    this.setState({ email: parsed.email });
  }

  handlerRegisterTask = async () => {
    try {
      const { title, description } = this.state;
      const user = await AsyncStorage.getItem("@Security:user");
      const parsed = JSON.parse(user);
      const { email } = parsed;
      await api.post("/task", {
        email,
        occurrence: [
          {
            title,
            description
          }
        ]
      });
      alert("Occurrence add with success!");
      this.setState({
        destination: {
          latitude,
          longitude,
          title: data.structured_formatting.main_text
        }
      });
    } catch (err) {
      this.setState({ errorMessage: err });
    }
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
          <Map translateY={translateY} option={"user"} />
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
