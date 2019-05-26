import React, { Component } from "react";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import {
  Container,
  Content,
  ListItem,
  TitleList,
  DescriptionList
} from "./styles";

const tabBarIcon = name => ({ tintColor }) => {
  <Icon
    style={{ backgroundColor: "transparent" }}
    name={name}
    color={tintColor}
    size={24}
  />;
};

export default class Task extends Component {
  static navigationOptions = {
    title: "Task",
    headerTransparent: true,
    headerTintColor: "#fff",
    barStyle: {
      backgroundColor: "#059",
      borderTopWidth: StyleSheet.hairlineWidth,
      borderStyle: "solid",
      borderColor: "#d0cfd0",
      tabBarIcon: tabBarIcon("photo-album")
    }
  };
  render() {
    return (
      <Container>
        <Content>
          <ListItem>
            <TitleList>Olá</TitleList>
            <DescriptionList>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque
              velit deserunt quis placeat veritatis commodi, delectus quidem
              quibusdam numquam, eaque eligendi molestiae incidunt nostrum enim.
              Repellendus similique saepe quam culpa?
            </DescriptionList>
          </ListItem>
        </Content>
      </Container>
    );
  }
}
