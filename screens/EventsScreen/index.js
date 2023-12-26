import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';

const GroupScreen = () => {
  const [search, setSearch] = useState("");
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [filter, setFilter] = useState({
    date: '',
    time: '',
    type: ''
  });
  const groups = [{
    id: "1",
    name: "Group 1"
  }, {
    id: "2",
    name: "Group 2"
  }];
  const devices = [{
    id: "1",
    status: "live",
    groupId: "1"
  }, {
    id: "2",
    status: "powered",
    groupId: "1"
  }];
  const events = [{
    id: "1",
    type: "Event 1",
    date: "2022-01-01",
    time: "12:00",
    details: "Event details",
    deviceId: "1"
  }];

  const renderGroup = ({
    item
  }) => <TouchableOpacity onPress={() => setSelectedGroup(item)}>
      <Text>{item.name}</Text>
    </TouchableOpacity>;

  const renderDevice = ({
    item
  }) => <TouchableOpacity onPress={() => setSelectedDevice(item)}>
      <Text>{item.id}</Text>
      <View style={{
      backgroundColor: item.status === "live" ? "green" : "orange"
    }} />
    </TouchableOpacity>;

  const renderEvent = ({
    item
  }) => <View>
      <Image source={{
      uri: "https://tinyurl.com/42evm3m3"
    }} style={styles.image} />
      <Text>{item.type}</Text>
      <Text>{item.date}</Text>
      <Text>{item.time}</Text>
      <Text>{item.details}</Text>
    </View>;

  const filteredEvents = events.filter(event => {
    return event.deviceId === selectedDevice.id && (!filter.date || event.date === filter.date) && (!filter.time || event.time === filter.time) && (!filter.type || event.type === filter.type);
  });
  return <SafeAreaView style={styles.container}>
      <TextInput value={search} onChangeText={setSearch} placeholder="Search" />
      <FlatList data={groups} renderItem={renderGroup} keyExtractor={item => item.id} />
      {selectedGroup && <FlatList data={devices.filter(device => device.groupId === selectedGroup.id)} renderItem={renderDevice} keyExtractor={item => item.id} />}
      {selectedDevice && <View>
          <TextInput value={filter.date} onChangeText={value => setFilter({ ...filter,
        date: value
      })} placeholder="Filter by Date" />
          <TextInput value={filter.time} onChangeText={value => setFilter({ ...filter,
        time: value
      })} placeholder="Filter by Time" />
          <TextInput value={filter.type} onChangeText={value => setFilter({ ...filter,
        type: value
      })} placeholder="Filter by Event Type" />
          <FlatList data={filteredEvents} renderItem={renderEvent} keyExtractor={item => item.id} />
        </View>}
    </SafeAreaView>;
};

export default GroupScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    width: 50,
    height: 50
  }
});