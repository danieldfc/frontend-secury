import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-community/async-storage";
import api from "../../services/api";

import {
  Container,
  Content,
  DescriptionList,
  ListItem,
  TitleList
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
  state = {
    errorMessage: null,
    tasks: []
  };

  async componentDidMount() {
    this.getTaskList();
  }

  getTaskList = async () => {
    try {
      const user = JSON.parse(await AsyncStorage.getItem("@Security:user"));
      const response = await api.post(`/task/list/${user._id}`);
      const { tasks } = response.data;
      console.log(
        tasks.map(task => {
          task.title;
        })
      );

      this.setState({ tasks });
    } catch (err) {
      console.log(err);
      this.setState({ errorMessage: err.data.error });
    }
  };

  render() {
    const { tasks } = this.state;
    return (
      <Container>
        <Content>
          {tasks.map(task => {
            <ListItem key={task._id}>
              <TitleList>{task.title}</TitleList>
              <DescriptionList>{task.description}</DescriptionList>
            </ListItem>;
          })}
        </Content>
      </Container>
    );
  }
}
