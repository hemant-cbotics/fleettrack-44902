import { StyleSheet } from "react-native";
import React from 'react';
import { SafeAreaView, Text, TextInput, Button, FlatList, Picker } from 'react-native';
const users = ['User 1', 'User 2', 'User 3', 'User 4', 'User 5'];
const formats = ['HTML', 'XLS', 'CSV', 'PDF'];
const intervals = ['Hourly', 'Last 2 Hours', 'Daily', 'Weekly', 'Bi-Monthly', 'Monthly'];

const ScreenComponent = () => {
  return <SafeAreaView style={_styles.RkdNpeWY}>
      <Text style={_styles.NzzwSqdl}>Selected report title</Text>
      <Text style={_styles.MnvUcyob}>Share with organization</Text>
      <Text style={_styles.HKIqhWuf}>All users</Text>
      <Text style={_styles.fZIjUTDK}>Specific user role</Text>
      <Text style={_styles.ayrtEQlP}>Specific user- Search and select users</Text>
      <FlatList data={users} renderItem={({
      item
    }) => <Text style={_styles.JdlVVznn}>{item}</Text>} keyExtractor={item => item} />
      <Text style={_styles.YxilRPRu}>Share via Email/Phone number</Text>
      <TextInput style={_styles.IygqUBvL} placeholder="Enter multiple emails/Phone numbers" />
      <Text style={_styles.ZllMLJJB}>Report Format</Text>
      <Picker>
        {formats.map((format, index) => <Picker.Item key={index} label={format} value={format} />)}
      </Picker>
      <Text style={_styles.xeJMFXav}>Schedule</Text>
      <Text style={_styles.AOZTTKjV}>Automated Sending</Text>
      <Text style={_styles.JSydokWQ}>Enable the option for automated report sending</Text>
      <Text style={_styles.xjPGVxJE}>Interval Selection</Text>
      <Picker>
        {intervals.map((interval, index) => <Picker.Item key={index} label={interval} value={interval} />)}
      </Picker>
      <Text style={_styles.HfrBvTxl}>Day/Time Selection</Text>
      <TextInput style={_styles.fUYFMWhp} placeholder="Specify the day and time for automated report sending" />
      <Button title="Share" onPress={() => {}} />
    </SafeAreaView>;
};

export default ScreenComponent;

const _styles = StyleSheet.create({
  RkdNpeWY: {
    flex: 1,
    backgroundColor: "#fff"
  },
  NzzwSqdl: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 10
  },
  MnvUcyob: {
    fontSize: 20,
    margin: 10
  },
  HKIqhWuf: {
    fontSize: 20,
    margin: 10
  },
  fZIjUTDK: {
    fontSize: 20,
    margin: 10
  },
  ayrtEQlP: {
    fontSize: 20,
    margin: 10
  },
  JdlVVznn: {
    fontSize: 18,
    margin: 10
  },
  YxilRPRu: {
    fontSize: 20,
    margin: 10
  },
  IygqUBvL: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    margin: 10
  },
  ZllMLJJB: {
    fontSize: 20,
    margin: 10
  },
  xeJMFXav: {
    fontSize: 20,
    margin: 10
  },
  AOZTTKjV: {
    fontSize: 20,
    margin: 10
  },
  JSydokWQ: {
    fontSize: 20,
    margin: 10
  },
  xjPGVxJE: {
    fontSize: 20,
    margin: 10
  },
  HfrBvTxl: {
    fontSize: 20,
    margin: 10
  },
  fUYFMWhp: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    margin: 10
  }
});