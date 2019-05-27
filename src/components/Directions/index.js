import React from "react";
import MapViewDirections from "react-native-maps-directions";

const Directions = ({ destination, origin, onReady }) => (
  <MapViewDirections
    destination={destination}
    origin={origin}
    onReady={onReady}
    apikey="AIzaSyB0dW7p8Av78L8snUn4MRufW9ptZEANM6M"
    strokeWidth={3}
    strokeColor="#222"
  />
);

export default Directions;
