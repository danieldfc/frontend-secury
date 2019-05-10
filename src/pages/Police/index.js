import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

export default class App extends Component {
  static navigationOptions = {
    title: "Police",
    headerTransparent: true,
    headerTintColor: "#fff"
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to police!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#059"
  }
});
