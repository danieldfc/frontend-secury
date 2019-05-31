import React, { Component } from "react";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import api from "../../services/api";

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
  state = {
    errorMessage: null
  };

  componentDidMount() {
    this.getTaskList();
  }

  getTaskList = async () => {
    try {
      const user = await AsyncStorage.getItem("@Security:user");
      const response = await api.post("/task/list", {
        email: user.email
      });
      console.log(response.data);
    } catch (err) {
      this.setState({ errorMessage: err.data.error });
      console.log(err.data.error);
    }
  };

  render() {
    return (
      <Container>
        {/**{this.state.projects.map(project => {
          <View key={project._id} style={{ marginTop: 15 }}>
            <Text style={{ fontWeight: "bold" }}>{project.title}</Text>
            <Text>{project.description}</Text>
          </View>;
        })} */}
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
