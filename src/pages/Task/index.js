import React, { Component } from "react";
import { StyleSheet, RefreshControl } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-community/async-storage";
import api from "../../services/api";

import {
  ButtonDelete,
  ButtonDeleteText,
  ButtonUpdate,
  ButtonUpdateText,
  ButtonView,
  Completed,
  Container,
  Content,
  DescriptionList,
  DescriptionListFound,
  EmailContent,
  ListFound,
  ListItem,
  ListText,
  TitleContent,
  TitleList,
  TitleListFound
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
    police: {},
    option: null,
    editable: false,
    title: null,
    description: null,
    refreshing: false
  };

  async componentDidMount() {
    const police = JSON.parse(await AsyncStorage.getItem("@Security:police"));
    const user = JSON.parse(await AsyncStorage.getItem("@Security:user"));
    if (user) {
      this.setState({ user, option: "User" });
      this.getTasksListUser();
      this._onRefresh();
    }
    if (police) {
      this.setState({ police, option: "Police" });
      this.getTasksList();
      this._onRefresh();
    }
  }

  _onRefresh = () => {
    const { option } = this.state;
    this.setState({ refreshing: true });
    if (option === "User") {
      this.getTasksListUser().then(() => {
        this.setState({ refreshing: false });
      });
    } else if (option === "Police") {
      this.getTasksList().then(() => {
        this.setState({ refreshing: false });
      });
    }
  };

  getTasksList = async () => {
    try {
      const response = await api.post(`/task/list`);
      const { tasks } = response.data;

      this.setState({ tasks });
    } catch (err) {
      this.setState({ errorMessage: err.data.error });
    }
  };

  getTasksListUser = async () => {
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
    try {
      await api.delete(`/task/${id}`);

      alert("Task deletada com sucesso!");

      this.setState({ refreshing: false });

      this._onRefresh();
    } catch (err) {
      this.setState({ errorMessage: err.data.error });
    }
  };

  handleUpdateTask = async id => {
    const { title, description } = this.state;
    if (title === null || description === null) {
      alert("Você não alterou os campos.");

      this.showPass();
    } else {
      try {
        await api.put(`/task/${id}`, { title, description });

        alert("Task atualizada com sucesso!");

        this.showPass();

        this.setState({ refreshing: false, title: null, description: null });

        this._onRefresh();
      } catch (err) {
        this.setState({ errorMessage: err.data.error });
      }
    }
  };

  handleSolution = async id => {
    try {
      await api.post(`/task/${id}`);

      this._onRefresh();
    } catch (err) {
      this.setState({ errorMessage: err.data.error });
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
    const { tasks, user, police, option, editable, refreshing } = this.state;
    let scoreUser = tasks.map(task => {
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
    let scorePolice = tasks.map(task => {
      return (
        <ListItem key={task._id}>
          <ListText style={{ marginBottom: 3 }}>Title</ListText>
          <TitleList placeholder={task.title} />
          <ListText style={{ marginTop: 5, marginBottom: 3 }}>
            Descritpion
          </ListText>
          <DescriptionList placeholder={task.description} />
          <ButtonView>
            <ButtonDelete onPress={() => this.handleSolution(task._id)}>
              <ButtonDeleteText>Solucionar</ButtonDeleteText>
            </ButtonDelete>
          </ButtonView>
        </ListItem>
      );
    });
    return (
      <Container>
        <TitleContent>Tasks of {option}</TitleContent>
        <EmailContent>
          Email: {option === "Police" ? police.email : user.email}
        </EmailContent>
        <Content
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
        >
          {
            <>
              {option === "Police" ? scorePolice : scoreUser}
              <ListFound>
                <TitleListFound>Occurence not found</TitleListFound>
                <DescriptionListFound>
                  Don't you have occurrence registered, create a new back to the
                  map.
                </DescriptionListFound>
              </ListFound>
            </>
          }
        </Content>
      </Container>
    );
  }
}
