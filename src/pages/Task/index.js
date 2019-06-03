import React, { Component } from "react";
import { StyleSheet, RefreshControl } from "react-native";
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
  EmailContent,
  ButtonView,
  ButtonDelete,
  ButtonDeleteText,
  ButtonUpdate,
  ButtonUpdateText,
  DescriptionListFound,
  ListFound,
  TitleListFound,
  ListText
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
    user: {},
    editable: false,
    title: null,
    description: null,
    refreshing: false
  };

  async componentDidMount() {
    this.getTaskList();
    this._onRefresh();
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.getTaskList().then(() => {
      this.setState({ refreshing: false });
    });
  };

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

  handleDeleteTask = async id => {
    await api.delete(`/task/${id}`);
    alert("Task deletada com sucesso!");
    this.setState({ refreshing: false });
    this._onRefresh();
  };

  handleUpdateTask = async id => {
    const { title, description } = this.state;
    if (title === null || description === null) {
      alert("Você não alterou os campos.");
      this.showPass();
    } else {
      await api.put(`/task/${id}`, { title, description });
      alert("Task atualizada com sucesso!");
      this.showPass();
      this.setState({ refreshing: false, title: null, description: null });
      this._onRefresh();
    }
  };

  showPass = () => {
    const { editable } = this.state;
    if (editable === false) {
      this.setState({ editable: true });
    } else if (editable === true) {
      this.setState({ editable: false });
    }
  };

  render() {
    const { tasks, user, editable, refreshing } = this.state;
    let score = tasks.map(task => {
      return (
        <ListItem key={task._id}>
          <ListText style={{ marginBottom: 3 }}>Title</ListText>
          <TitleList
            placeholder={task.title}
            editable={editable}
            onChangeText={title => this.setState({ title })}
          />
          <ListText style={{ marginTop: 5, marginBottom: 3 }}>
            Descritpion
          </ListText>
          <DescriptionList
            placeholder={task.description}
            editable={editable}
            onChangeText={description => this.setState({ description })}
          />
          <ButtonView>
            <ButtonDelete onPress={() => this.handleDeleteTask(task._id)}>
              <ButtonDeleteText>Deletar</ButtonDeleteText>
            </ButtonDelete>
            {editable ? (
              <ButtonUpdate onPress={() => this.handleUpdateTask(task._id)}>
                <ButtonUpdateText>Update</ButtonUpdateText>
              </ButtonUpdate>
            ) : (
              <ButtonUpdate onPress={this.showPass}>
                <ButtonUpdateText>Edit</ButtonUpdateText>
              </ButtonUpdate>
            )}
          </ButtonView>
        </ListItem>
      );
    });
    return (
      <Container>
        <TitleContent>Tasks of user</TitleContent>
        <EmailContent>Email: {user.email}</EmailContent>
        <Content
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
        >
          {score && (
            <>
              {score}
              <ListFound>
                <TitleListFound>Occurence not found</TitleListFound>
                <DescriptionListFound>
                  Don't you have occurrence registered, create a new back to the
                  map.
                </DescriptionListFound>
              </ListFound>
            </>
          )}
        </Content>
      </Container>
    );
  }
}
