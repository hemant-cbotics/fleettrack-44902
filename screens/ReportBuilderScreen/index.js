import { StyleSheet } from "react-native";
import React, { useState } from 'react';
import { SafeAreaView, View, TextInput, Button, Text, ScrollView, Picker, TouchableOpacity } from 'react-native';

const ScreenComponent = () => {
  const [selectedValue, setSelectedValue] = useState("vehicle");
  return <SafeAreaView style={_styles.FXpuTVNV}>
      <ScrollView>
        <View style={_styles.xzRcinzl}>
          <Text>Report name</Text>
          <TextInput style={_styles.lFKZmzHN} />

          <Text>Vehicle, Group, or Driver Selection</Text>
          <Picker selectedValue={selectedValue} onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
            <Picker.Item label="Vehicle" value="vehicle" />
            <Picker.Item label="Group" value="group" />
            <Picker.Item label="Driver" value="driver" />
          </Picker>

          <Text>Date Range Selection</Text>
          <TextInput style={_styles.KwdyQFJN} placeholder="Start Date" />
          <TextInput style={_styles.hsBGPZBP} placeholder="End Date" />

          <Text>Time Range Selection</Text>
          <TextInput style={_styles.DZrJEmcS} placeholder="Start Time" />
          <TextInput style={_styles.RUHSgbqM} placeholder="End Time" />

          <Text>Quick Date Range Selection</Text>
          <TouchableOpacity style={_styles.lORgvVzP}>
            <Text>Select Current Week</Text>
          </TouchableOpacity>
          <TouchableOpacity style={_styles.aRETCsrY}>
            <Text>Select Current Month</Text>
          </TouchableOpacity>

          <Text>List of data fields/columns</Text>
          <TextInput style={_styles.CZznadiS} placeholder="Search Data Fields" />

          <Button title="Save" onPress={() => {}} />
        </View>
      </ScrollView>
    </SafeAreaView>;
};

export default ScreenComponent;

const _styles = StyleSheet.create({
  FXpuTVNV: {
    flex: 1,
    backgroundColor: "#fff"
  },
  xzRcinzl: {
    padding: 20
  },
  lFKZmzHN: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1
  },
  KwdyQFJN: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1
  },
  hsBGPZBP: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1
  },
  DZrJEmcS: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1
  },
  RUHSgbqM: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1
  },
  lORgvVzP: {
    backgroundColor: "#ddd",
    padding: 10,
    marginVertical: 10
  },
  aRETCsrY: {
    backgroundColor: "#ddd",
    padding: 10,
    marginVertical: 10
  },
  CZznadiS: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1
  }
});