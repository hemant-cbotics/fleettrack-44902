import { StyleSheet } from "react-native";
import React from 'react';
import { SafeAreaView, View, Text, Button, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
const dummyData = [{
  id: '1',
  name: 'Group 1',
  devices: [{
    id: '1',
    name: 'Device 1',
    imei: '1234567890',
    lastConnected: '2021-09-01',
    status: 'Online',
    health: 'Good'
  }, {
    id: '2',
    name: 'Device 2',
    imei: '0987654321',
    lastConnected: '2021-09-02',
    status: 'Offline',
    health: 'Bad'
  }],
  reports: [{
    id: '1',
    title: 'Camera Health Report',
    shareIcon: 'https://tinyurl.com/42evm3m3',
    downloadButton: 'Download as CSV'
  }, {
    id: '2',
    title: 'GPS Health Report',
    shareIcon: 'https://tinyurl.com/42evm3m3',
    downloadButton: 'Download as CSV'
  }, {
    id: '3',
    title: 'Alarm Report',
    shareIcon: 'https://tinyurl.com/42evm3m3',
    downloadButton: 'Download as CSV'
  }]
} // More groups...
];

const ScreenComponent = () => {
  return <SafeAreaView style={_styles.LakbBHLO}>
      <TextInput placeholder="Search" style={_styles.lOfRvXND} />
      <FlatList data={dummyData} keyExtractor={item => item.id} renderItem={({
      item
    }) => <View>
            <Text>{item.name}</Text>
            <Button title="Edit" onPress={() => {}} />
            <Button title="Remove" onPress={() => {}} />
            <TouchableOpacity onPress={() => {}}>
              <Text>View Devices</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <Text>View Reports</Text>
            </TouchableOpacity>
            {item.reports.map(report => <View key={report.id}>
                <Text>{report.title}</Text>
                <Image source={{
          uri: report.shareIcon
        }} style={_styles.dlFHRmbv} />
                <Button title={report.downloadButton} onPress={() => {}} />
              </View>)}
          </View>} />
    </SafeAreaView>;
};

export default ScreenComponent;

const _styles = StyleSheet.create({
  LakbBHLO: {
    flex: 1,
    backgroundColor: "#fff"
  },
  lOfRvXND: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1
  },
  dlFHRmbv: {
    width: 50,
    height: 50
  }
});