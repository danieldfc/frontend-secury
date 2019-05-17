import React, { Component } from "react";
import Map from "../../../components/Map";

export default class Mapa extends Component {
  static navigationOptions = {
    headerTransparent: true,
    headerTintColor: "#000"
  };
  render() {
    return <Map />;
  }
}
