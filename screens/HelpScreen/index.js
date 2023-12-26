import { StyleSheet } from "react-native";
import React, { useState } from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, FlatList, Linking } from 'react-native';
import { Video } from 'expo-av';

const DocumentScreen = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const videos = [{
    id: '1',
    title: 'Video 1',
    description: 'This is video 1'
  }, {
    id: '2',
    title: 'Video 2',
    description: 'This is video 2'
  } // Add more videos as needed
  ];
  return <SafeAreaView style={_styles.mOYtqPIy}>
      <View style={_styles.tAQXfPYg}>
        <Text style={_styles.NoJbExUa}>Document Section</Text>
        <Text>A document or user manual providing detailed instructions and information</Text>
        <TouchableOpacity onPress={() => Linking.openURL('https://tinyurl.com/42evm3m3')}>
          <Text style={_styles.xbrdrZcn}>Click to view- pdf</Text>
        </TouchableOpacity>
      </View>

      <View style={_styles.ptMxNHnf}>
        <Text style={_styles.yjGrfqUv}>Video List Section</Text>
        <FlatList data={videos} keyExtractor={item => item.id} renderItem={({
        item
      }) => <TouchableOpacity onPress={() => setSelectedVideo(item)}>
              <Text style={_styles.WTrkxuNV}>{item.title}</Text>
              <Text>{item.description}</Text>
              <Image source={{
          uri: 'https://tinyurl.com/42evm3m3'
        }} style={_styles.XMzOTLQc} />
            </TouchableOpacity>} />
      </View>

      {selectedVideo && <View style={_styles.moWEQUsu}>
          <Text style={_styles.JaUrUmiw}>Video Player Section</Text>
          <Video source={{
        uri: 'https://tinyurl.com/42evm3m3'
      }} rate={1.0} volume={1.0} isMuted={false} resizeMode="cover" shouldPlay useNativeControls style={_styles.GzNoqbcW} />
        </View>}

      <View style={_styles.yzqnPQop}>
        <Text style={_styles.LvqdXnlq}>Contact Details Section</Text>
        <Text>Phone number for customer support: +1234567890</Text>
        <Text>Email address for customer support: support@example.com</Text>
      </View>
    </SafeAreaView>;
};

export default DocumentScreen;

const _styles = StyleSheet.create({
  mOYtqPIy: {
    flex: 1,
    backgroundColor: "#fff"
  },
  tAQXfPYg: {
    padding: 20
  },
  NoJbExUa: {
    fontSize: 24,
    fontWeight: "bold"
  },
  xbrdrZcn: {
    color: "blue"
  },
  ptMxNHnf: {
    padding: 20
  },
  yjGrfqUv: {
    fontSize: 24,
    fontWeight: "bold"
  },
  WTrkxuNV: {
    fontSize: 18,
    fontWeight: "bold"
  },
  XMzOTLQc: {
    width: "100%",
    height: 200
  },
  moWEQUsu: {
    padding: 20
  },
  JaUrUmiw: {
    fontSize: 24,
    fontWeight: "bold"
  },
  GzNoqbcW: {
    width: "100%",
    height: 300
  },
  yzqnPQop: {
    padding: 20
  },
  LvqdXnlq: {
    fontSize: 24,
    fontWeight: "bold"
  }
});