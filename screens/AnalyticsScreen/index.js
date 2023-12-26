import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, FlatList, Button, Picker, StyleSheet } from 'react-native';

const GroupScreen = () => {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [date, setDate] = useState(new Date());
  const groups = ["Group 1", "Group 2", "Group 3"];
  const devices = ["Device 1", "Device 2", "Device 3"];
  const reports = ["Aggressive Driver", "Speeding Report", "Geofence Report"];
  return <SafeAreaView style={styles.container}>
      <TextInput placeholder="Search" style={styles.searchInput} />
      <FlatList data={groups} renderItem={({
      item
    }) => <TouchableOpacity onPress={() => setSelectedGroup(item)}>
            <Text>{item}</Text>
          </TouchableOpacity>} />
      {selectedGroup && <View>
          <Text>{selectedGroup}</Text>
          <Button title="Edit" onPress={() => {}} />
          <Button title="Remove" onPress={() => {}} />
          <FlatList data={devices} renderItem={({
        item
      }) => <TouchableOpacity onPress={() => setSelectedDevice(item)}>
                <Text>{item}</Text>
              </TouchableOpacity>} />
        </View>}
      {selectedDevice && <View>
          <Text>{selectedDevice}</Text>
          <Picker selectedValue={date} onValueChange={itemValue => setDate(itemValue)}>
            <Picker.Item label="Today" value={new Date()} />
            <Picker.Item label="Yesterday" value={new Date().setDate(new Date().getDate() - 1)} />
          </Picker>
          <FlatList data={reports} renderItem={({
        item
      }) => <TouchableOpacity onPress={() => setSelectedReport(item)}>
                <Text>{item}</Text>
              </TouchableOpacity>} />
        </View>}
      {selectedReport && <View>
          <Text>{selectedReport}</Text>
          <Button title="Export" onPress={() => {}} />
          <FlatList data={devices} renderItem={({
        item
      }) => <View>
                <Text>{item}</Text>
                <Text>Distance: 100 mi</Text>
                <Text>Max Speed: 60 mi</Text>
                <Text>Speed Alarms: 5</Text>
                <Text>Dangerous Driving Alarms: 2</Text>
                <Text>GeoFence Alarms: 1</Text>
              </View>} />
        </View>}
    </SafeAreaView>;
};

export default GroupScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
  }
});