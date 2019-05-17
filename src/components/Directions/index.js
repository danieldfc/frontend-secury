import React from "react";
import MapViewDirections from "react-native-maps-directions";

const Directions = ({ destination, origin, onReady }) => (
  <MapViewDirections
    destination={destination}
    origin={origin}
    onReady={onReady}
    apikey="AIzaSyDfF05mQvmEKN863seXSJYEmyFPH_lVCIU"
    strokeWidth={3}
    strokeColor="#222"
  />
);

export default Directions;
