import { StyleSheet } from "react-native";
import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';

const GroupScreen = () => {
  const [groups, setGroups] = useState(['Group 1', 'Group 2', 'Group 3']);
  const [devices, setDevices] = useState([{
    id: 'Device 1',
    status: 'live'
  }, {
    id: 'Device 2',
    status: 'powered'
  }, {
    id: 'Device 3',
    status: 'off'
  }]);

  const handleEditGroup = index => {// handle edit group
  };

  const handleRemoveGroup = index => {// handle remove group
  };

  const handleDeviceClick = device => {// handle device click
  };

  return <SafeAreaView style={_styles.hgdxHqWo}>
      <TextInput placeholder="Search" style={_styles.bhSlUAsd} />
      <FlatList data={groups} renderItem={({
      item,
      index
    }) => <View>
            <Text>{item}</Text>
            <Button title="Edit" onPress={() => handleEditGroup(index)} />
            <Button title="Remove" onPress={() => handleRemoveGroup(index)} />
          </View>} />
      <FlatList data={devices} renderItem={({
      item
    }) => <TouchableOpacity onPress={() => handleDeviceClick(item)}>
            <Text>{item.id}</Text>
            <View style={{
        height: 10,
        width: 10,
        backgroundColor: item.status === 'live' ? 'green' : item.status === 'powered' ? 'orange' : 'gray'
      }} />
          </TouchableOpacity>} />
    </SafeAreaView>;
};

export default GroupScreen;

const _styles = StyleSheet.create({
  hgdxHqWo: {
    flex: 1,
    backgroundColor: "#fff"
  },
  bhSlUAsd: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1
  }
});