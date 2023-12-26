import { StyleSheet } from "react-native";
import React, { useState } from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, TextInput, Button, Image } from 'react-native';

const MessageList = () => {
  const [messages, setMessages] = useState([{
    id: '1',
    sender: 'John',
    snippet: 'Hey, how are you?',
    timestamp: '10:30 AM',
    unread: true
  }, {
    id: '2',
    sender: 'Jane',
    snippet: 'Check out this link...',
    timestamp: '9:45 AM',
    unread: false
  } // Add more messages here...
  ]);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const MessageItem = ({
    item
  }) => <TouchableOpacity onPress={() => setSelectedMessage(item)}>
      <View style={_styles.uYfDwcUu}>
        <Text style={_styles.gdFGqWkA}>{item.sender}</Text>
        <Text>{item.snippet}</Text>
        <Text>{item.timestamp}</Text>
        {item.unread && <View style={_styles.FPZBhhCq} />}
      </View>
    </TouchableOpacity>;

  return <SafeAreaView style={_styles.imdIpXxY}>
      <View style={_styles.SSNKZGzC}>
        <TextInput placeholder="Search messages..." style={_styles.oIgJNbGG} />
      </View>
      <FlatList data={messages} renderItem={MessageItem} keyExtractor={item => item.id} />
      {selectedMessage && <View style={_styles.osiUCcHU}>
          <Text style={_styles.TUSjeoOP}>{selectedMessage.sender}</Text>
          <Text>{selectedMessage.snippet}</Text>
          <TextInput placeholder="Type a message..." style={_styles.dnUkvEBW} />
          <Button title="Send as SMS" onPress={() => {}} />
          <View style={_styles.VmUjgbNv}>
            <Image source={{
          uri: 'https://tinyurl.com/42evm3m3'
        }} style={_styles.YpXNHbAX} />
            <Image source={{
          uri: 'https://tinyurl.com/42evm3m3'
        }} style={_styles.vvokYTDZ} />
            <Image source={{
          uri: 'https://tinyurl.com/42evm3m3'
        }} style={_styles.GyWUyMWE} />
          </View>
        </View>}
    </SafeAreaView>;
};

export default MessageList;

const _styles = StyleSheet.create({
  uYfDwcUu: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd"
  },
  gdFGqWkA: {
    fontWeight: "bold"
  },
  FPZBhhCq: {
    backgroundColor: "red",
    borderRadius: 5,
    width: 10,
    height: 10
  },
  imdIpXxY: {
    flex: 1,
    backgroundColor: "#fff"
  },
  SSNKZGzC: {
    padding: 10
  },
  oIgJNbGG: {
    backgroundColor: "#eee",
    borderRadius: 5,
    padding: 10
  },
  osiUCcHU: {
    padding: 10
  },
  TUSjeoOP: {
    fontWeight: "bold"
  },
  dnUkvEBW: {
    backgroundColor: "#eee",
    borderRadius: 5,
    padding: 10,
    marginTop: 10
  },
  VmUjgbNv: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10
  },
  YpXNHbAX: {
    width: 30,
    height: 30
  },
  vvokYTDZ: {
    width: 30,
    height: 30
  },
  GyWUyMWE: {
    width: 30,
    height: 30
  }
});