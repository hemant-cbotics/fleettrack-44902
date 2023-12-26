import { StyleSheet } from "react-native";
import React from 'react';
import { SafeAreaView, View, Text, Image, Button, TouchableOpacity } from 'react-native';

const StreetViewScreen = () => {
  const vehicleData = {
    id: 'VH001',
    speed: '60 km/h',
    direction: 'North',
    status: 'Moving',
    coordinates: {
      latitude: '37.7749° N',
      longitude: '122.4194° W'
    },
    location: 'San Francisco, CA',
    lastUpdated: 'Just now'
  };
  return <SafeAreaView style={_styles.HUPLiYdU}>
      <View style={_styles.CpirtHGL}>
        <Image style={_styles.hKXYUnTU} source={{
        uri: 'https://tinyurl.com/42evm3m3'
      }} />

        <View style={_styles.ipeasmYp}>
          <Text style={_styles.QeUEmTDI}>Vehicle Information</Text>
          <Text>ID: {vehicleData.id}</Text>
          <Text>Speed: {vehicleData.speed}</Text>
          <Text>Direction: {vehicleData.direction}</Text>
          <Text>Status: {vehicleData.status}</Text>
        </View>

        <View style={_styles.utgCdYFI}>
          <Text style={_styles.CIKDhuCA}>Location Details</Text>
          <Text>Coordinates: {vehicleData.coordinates.latitude}, {vehicleData.coordinates.longitude}</Text>
          <Text>Location: {vehicleData.location}</Text>
          <Text>Last Updated: {vehicleData.lastUpdated}</Text>
        </View>

        <View style={_styles.wRNBFOYb}>
          <TouchableOpacity style={_styles.FmnxdPmM}>
            <Text>Toggle Satellite View</Text>
          </TouchableOpacity>
          <TouchableOpacity style={_styles.SuXyapzI}>
            <Text>Center Map</Text>
          </TouchableOpacity>
          <TouchableOpacity style={_styles.rjDQTlcf}>
            <Text>Switch Map View</Text>
          </TouchableOpacity>
        </View>

        <Button title="Close" onPress={() => {}} />
      </View>
    </SafeAreaView>;
};

export default StreetViewScreen;

const _styles = StyleSheet.create({
  HUPLiYdU: {
    flex: 1,
    backgroundColor: "#fff"
  },
  CpirtHGL: {
    flex: 1
  },
  hKXYUnTU: {
    width: "100%",
    height: "50%"
  },
  ipeasmYp: {
    padding: 20
  },
  QeUEmTDI: {
    fontSize: 24,
    fontWeight: "bold"
  },
  utgCdYFI: {
    padding: 20
  },
  CIKDhuCA: {
    fontSize: 24,
    fontWeight: "bold"
  },
  wRNBFOYb: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20
  },
  FmnxdPmM: {
    backgroundColor: "#ddd",
    padding: 10
  },
  SuXyapzI: {
    backgroundColor: "#ddd",
    padding: 10
  },
  rjDQTlcf: {
    backgroundColor: "#ddd",
    padding: 10
  }
});