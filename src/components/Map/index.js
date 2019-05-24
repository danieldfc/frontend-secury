import React, { Fragment } from "react";
import { Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import GeoCoder from "react-native-geocoding";
import AsyncStorage from "@react-native-community/async-storage";

import api from "../../services/api";

import Directions from "../Directions";
//import Details from "../Details";

import { getPixelSize } from "../../utils";

import markerImage from "../../assets/marker.png";
import backImage from "../../assets/back.png";

import {
  Back,
  Container,
  LocationBox,
  LocationText,
  LocationTimeBox,
  LocationTimeText,
  LocationTimeTextSmall
} from "./styles";

GeoCoder.init("AIzaSyDfF05mQvmEKN863seXSJYEmyFPH_lVCIU");

export default function Map({ translateY }) {
  state = {
    region: null,
    destination: null,
    duration: null,
    location: null
  };
  async function componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        const response = await GeoCoder.from({ latitude, longitude });
        const address = response.results[0].formatted_address;
        const location = address.substring(0, address.indexOf(","));
        this.setState({
          location,
          region: {
            latitude,
            longitude,
            latitudeDelta: 0.0143,
            longitudeDelta: 0.0134
          }
        });
      }, //success
      () => {}, //error
      {
        timeout: 2000,
        enableHighAccuracy: true,
        maximumAge: 1000
      }
    );
  }

  handleAddTask = async () => {
    const user = await AsyncStorage.getItem("@Security:user");
    const { email, occurrence } = user;
    await api.post("/task/", {
      email,
      occurrence
    });

    Alert.alert("Occurrence add with success!");

    this.setState({
      destination: {
        latitude,
        longitude,
        title: data.structured_formatting.main_text
      }
    });
  };

  handleBack = () => {
    this.setState({ destination: null });
  };
  const { region, destination, duration, location } = this.state;
  return (
    <Container
      style={{
        opacity: translateY.interpolate({
          inputRange: [0, 380],
          outputRange: [0, 1],
          extrapolate: "clamp"
        })
      }}
    >
      <MapView
        style={{ flex: 1 }}
        region={region}
        showsUserLocation
        loadingEnabled
        ref={el => (this.mapView = el)}
      >
        {destination && (
          <Fragment>
            <Directions
              origin={region}
              destination={destination}
              onReady={result => {
                this.setState({ duration: Math.floor(result.duration) });
                this.mapView.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    top: getPixelSize(50),
                    right: getPixelSize(50),
                    left: getPixelSize(50),
                    bottom: getPixelSize(350)
                  }
                });
              }}
            />
            <Marker
              coordinate={destination}
              anchor={{ x: 0, y: 0 }}
              image={markerImage}
            >
              <LocationBox>
                <LocationText>{destination.title}</LocationText>
              </LocationBox>
            </Marker>

            <Marker coordinate={region} anchor={{ x: 0, y: 0 }}>
              <LocationBox>
                <LocationTimeBox>
                  <LocationTimeText>{duration}</LocationTimeText>
                  <LocationTimeTextSmall>Min</LocationTimeTextSmall>
                </LocationTimeBox>
                <LocationText>{location}</LocationText>
              </LocationBox>
            </Marker>
          </Fragment>
        )}
      </MapView>

      {/* {destination ? (
          <Fragment>
            <Back onPress={this.handleBack}>
              <Image source={backImage} />
            </Back>
            <Details />
          </Fragment>
        ) : (
          <Search onLocationSelected={this.handleAddTask} />
        )} */}
    </Container>
  );
}
