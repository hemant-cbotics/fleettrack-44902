import { StyleSheet } from "react-native";
import React, { useState } from 'react';
import { SafeAreaView, View, Text, Button, TextInput, FlatList, Image, TouchableOpacity, Picker } from 'react-native';

const MapDisplayScreen = () => {
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [selectedMapType, setSelectedMapType] = useState('road');
  const [selectedException, setSelectedException] = useState('');
  const [selectedTrip, setSelectedTrip] = useState('');
  const [selectedTimezone, setSelectedTimezone] = useState('');
  const [autoRefresh, setAutoRefresh] = useState(false);
  const dummyData = {
    vehicles: ['Vehicle 1', 'Vehicle 2', 'Vehicle 3'],
    mapTypes: ['road', 'satellite', 'terrain', 'hybrid'],
    exceptions: ['idling', 'speeding', 'traffic', 'weather'],
    trips: ['Trip 1', 'Trip 2', 'Trip 3'],
    timezones: ['EST', 'CST', 'MST', 'PST']
  };
  return <SafeAreaView style={_styles.MeanBJSg}>
      <View style={_styles.UcTLDCnS}>
        <Picker selectedValue={selectedVehicle} onValueChange={itemValue => setSelectedVehicle(itemValue)}>
          {dummyData.vehicles.map(vehicle => <Picker.Item key={vehicle} label={vehicle} value={vehicle} />)}
        </Picker>
        <Picker selectedValue={selectedMapType} onValueChange={itemValue => setSelectedMapType(itemValue)}>
          {dummyData.mapTypes.map(mapType => <Picker.Item key={mapType} label={mapType} value={mapType} />)}
        </Picker>
        <Picker selectedValue={selectedException} onValueChange={itemValue => setSelectedException(itemValue)}>
          {dummyData.exceptions.map(exception => <Picker.Item key={exception} label={exception} value={exception} />)}
        </Picker>
        <TextInput placeholder="Find address" />
        <Button title="Manage Geozone" onPress={() => {}} />
        <Button title={autoRefresh ? 'Stop Auto Refresh' : 'Start Auto Refresh'} onPress={() => setAutoRefresh(!autoRefresh)} />
        <Picker selectedValue={selectedTimezone} onValueChange={itemValue => setSelectedTimezone(itemValue)}>
          {dummyData.timezones.map(timezone => <Picker.Item key={timezone} label={timezone} value={timezone} />)}
        </Picker>
        <Button title="Refresh Map" onPress={() => {}} />
        <FlatList data={dummyData.trips} renderItem={({
        item
      }) => <TouchableOpacity onPress={() => setSelectedTrip(item)}>
              <Text>{item}</Text>
            </TouchableOpacity>} keyExtractor={item => item} />
        <Image style={_styles.npVboUlP} source={{
        uri: 'https://tinyurl.com/42evm3m3'
      }} />
      </View>
    </SafeAreaView>;
};

export default MapDisplayScreen;

const _styles = StyleSheet.create({
  MeanBJSg: {
    flex: 1,
    backgroundColor: "#fff"
  },
  UcTLDCnS: {
    flex: 1,
    padding: 20
  },
  npVboUlP: {
    width: "100%",
    height: 200
  }
});