import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default class App extends Component {
  static navigationOptions = {
    title: "Home",
    backgroundColor: null
  };

  signIn = async () => {};

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Secuty Total!</Text>
        <TouchableOpacity style={styles.button} onPress={this.signIn}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
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
