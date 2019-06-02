import React, { Component } from "react";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-community/async-storage";
import api from "../../services/api";

import {
  Completed,
  Container,
  Content,
  DescriptionList,
  ListItem,
  TitleList,
  TitleContent,
  EmailContent
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
    tasks: [],
    user: {}
  };

  async componentDidMount() {
    this.getTaskList();
  }

  getTaskList = async () => {
    try {
      const user = JSON.parse(await AsyncStorage.getItem("@Security:user"));
      const response = await api.post(`/task/list/${user._id}`);
      const { tasks } = response.data;

      this.setState({ tasks, user });
    } catch (err) {
      this.setState({ errorMessage: err.data.error });
    }
  };

  render() {
    const { tasks, user } = this.state;
    let score = tasks.map((item, index) => {
      return (
        <ListItem key={index}>
          <TitleList>Title: {item.title}</TitleList>
          <DescriptionList>Description: {item.description}</DescriptionList>
        </ListItem>
      );
    });
    return (
      <Container>
        <TitleContent>Task of user</TitleContent>
        <EmailContent>Email: {user.email}</EmailContent>
        <Content>{score}</Content>
      </Container>
    );
  }
}
