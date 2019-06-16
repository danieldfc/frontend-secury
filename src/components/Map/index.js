import React, { Component } from "react";
import MapView, { Marker } from "react-native-maps";
import GeoCoder from "react-native-geocoding";
import AsyncStorage from "@react-native-community/async-storage";

import api from "../../services/api";
import { getPixelSize } from "../../utils";

import Directions from "../Directions";
// import Details from "../Details";
// import Search from "../Search";

import markerImage from "../../assets/marker.png";
import { baseUrl } from "../../config/auth.json";

import {
  Container,
  LocationBox,
  LocationText,
  LocationTimeBox,
  LocationTimeText,
  LocationTimeTextSmall
} from "./styles";

GeoCoder.init("AIzaSyB0dW7p8Av78L8snUn4MRufW9ptZEANM6M");

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: null,
      destination: null,
      location: null,
      duration: null,
      errorMessage: null,
      task: {}
    };
  }

  async componentDidMount() {
    const { option } = this.props;

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
        const optionID = await AsyncStorage.getItem(`@Security:${option}`);
        const parsed = JSON.parse(optionID);
        await api.post(`/auth/update/${option}/${parsed._id}`, {
          location
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

  handleLocationDestination = (data, { geometry }) => {
    const {
      location: { lat: latitude, lng: longitude }
    } = geometry;
    this.state({
      destination: {
        latitude,
        longitude,
        title: data.structured_formatting.main_text
      }
    });
  };

  render() {
    const { region, destination, duration, location } = this.state;
    return (
      <Container>
        <MapView
          style={{ flex: 1 }}
          region={region}
          showsUserLocation
          loadingEnabled
          ref={el => (this.mapView = el)}
        >
          {destination && (
            <>
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
            </>
          )}
        </MapView>

        {destination ? (
          <>
            <Back onPress={this.handleBack}>
              <Image source={backImage} />
            </Back>
            <Details />
          </>
        ) : // <Search onLocationSelected={this.handleLocationDestination} />
        null}
      </Container>
    );
  }
}
