import { StyleSheet } from "react-native";
import React from 'react';
import { SafeAreaView, View, Text, TextInput, Image, TouchableOpacity, ScrollView, Picker } from 'react-native';

const ScreenComponent = () => {
  return <SafeAreaView style={_styles.TiZSlPFD}>
      <View style={_styles.LihLSnBB}>
        <Text style={_styles.uatNxbAd}>Report Title</Text>
        <TextInput style={_styles.cLNesftr} placeholder="Search..." />
        <Text style={_styles.tCxjGYSY}>Filter Options</Text>
        <Picker style={_styles.JxQPmFxK}>
          <Picker.Item label="HTML" value="html" />
          <Picker.Item label="XLS" value="xls" />
          <Picker.Item label="CSV" value="csv" />
          <Picker.Item label="PDF" value="pdf" />
        </Picker>
        <ScrollView style={_styles.raaOgupo}>
          <View style={_styles.zTTpzTca}>
            <Text style={_styles.YAlHCjpg}>Column 1</Text>
            <Text style={_styles.lAeHaOOG}>Column 2</Text>
            <Text style={_styles.xupOetOv}>Column 3</Text>
          </View>
          <View style={_styles.bmXPiNwZ}>
            <Text>Data 1</Text>
            <Text>Data 2</Text>
            <Text>Data 3</Text>
          </View>
        </ScrollView>
        <View style={_styles.eQVYuPdk}>
          <TouchableOpacity onPress={() => alert('Edit')}>
            <Image style={_styles.QOaZsYZN} source={{
            uri: 'https://tinyurl.com/42evm3m3'
          }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => alert('Remove')}>
            <Image style={_styles.vSqbMRzK} source={{
            uri: 'https://tinyurl.com/42evm3m3'
          }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => alert('Share')}>
            <Image style={_styles.WxOoJvik} source={{
            uri: 'https://tinyurl.com/42evm3m3'
          }} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>;
};

export default ScreenComponent;

const _styles = StyleSheet.create({
  TiZSlPFD: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  },
  LihLSnBB: {
    padding: 20
  },
  uatNxbAd: {
    fontSize: 24,
    fontWeight: "bold"
  },
  cLNesftr: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 20,
    borderRadius: 5
  },
  tCxjGYSY: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20
  },
  JxQPmFxK: {
    height: 50,
    width: 150
  },
  raaOgupo: {
    marginTop: 20
  },
  zTTpzTca: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10
  },
  YAlHCjpg: {
    fontSize: 16,
    fontWeight: "bold"
  },
  lAeHaOOG: {
    fontSize: 16,
    fontWeight: "bold"
  },
  xupOetOv: {
    fontSize: 16,
    fontWeight: "bold"
  },
  bmXPiNwZ: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10
  },
  eQVYuPdk: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20
  },
  QOaZsYZN: {
    width: 30,
    height: 30
  },
  vSqbMRzK: {
    width: 30,
    height: 30
  },
  WxOoJvik: {
    width: 30,
    height: 30
  }
});