import { StyleSheet } from "react-native";
import React, { useState } from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, TextInput, FlatList } from 'react-native';

const MapDisplay = () => {
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const devices = [{
    id: '1',
    type: 'vehicle',
    status: 'active',
    location: 'New York',
    gps: '40.7128° N, 74.0060° W',
    ignitionStatus: 'on',
    dateTime: '2022-01-01 12:00:00'
  } // More devices here...
  ];

  const renderDevice = ({
    item
  }) => <TouchableOpacity onPress={() => setSelectedDevice(item)}>
      <Text>{item.type}</Text>
      <Text>{item.location}</Text>
      <Text>{item.status}</Text>
    </TouchableOpacity>;

  return <SafeAreaView style={_styles.YpTObvln}>
      <View style={_styles.SGQrTZbP}>
        <View style={_styles.GCRkNtkp}>
          <Image source={{
          uri: 'https://tinyurl.com/42evm3m3'
        }} style={_styles.VOzRQMJr} />
        </View>
        <View style={_styles.SGUmBiUt}>
          <FlatList data={devices} renderItem={renderDevice} keyExtractor={item => item.id} />
        </View>
      </View>
      {selectedDevice && <View>
          <Text>{selectedDevice.id}</Text>
          <Text>{selectedDevice.gps}</Text>
          <TextInput placeholder="Phone number" value={phoneNumber} onChangeText={setPhoneNumber} />
          <TouchableOpacity>
            <Text>Send</Text>
          </TouchableOpacity>
          <TextInput placeholder="Message" value={message} onChangeText={setMessage} />
          <TouchableOpacity>
            <Text>Send</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>View Street</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Weather Forecast</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Request video</Text>
          </TouchableOpacity>
        </View>}
    </SafeAreaView>;
};

export default MapDisplay;

const _styles = StyleSheet.create({
  YpTObvln: {
    flex: 1
  },
  SGQrTZbP: {
    flex: 1,
    flexDirection: "row"
  },
  GCRkNtkp: {
    flex: 3
  },
  VOzRQMJr: {
    width: "100%",
    height: "100%"
  },
  SGUmBiUt: {
    flex: 2
  }
});