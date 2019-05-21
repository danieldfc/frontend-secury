import React, { Component } from "react";
import Map from "../../../components/Map";

export default class Mapa extends Component {
  static navigationOptions = {
    headerTransparent: true
  };
  render() {
    return <Map />;
  }
}
