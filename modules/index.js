import { StyleSheet } from "react-native";
import React from 'react';
import { SafeAreaView, View, Text, TextInput, Button, TouchableOpacity, ScrollView, Image } from 'react-native';

const Dashboard = () => {
  return <SafeAreaView style={_styles.PfjqlYRo}>
      <View style={_styles.KTsuATFj}>
        <TextInput placeholder="Search" style={_styles.CBRSrbtM} />
        <Text style={_styles.EzaaIqOY}>Settings</Text>
        <Button title="Set number of visible tiles" onPress={() => {}} />
        <Button title="Show/Hide Tiles" onPress={() => {}} />
        <Button title="Set Dashboard Tiles Location" onPress={() => {}} />
        <Button title="Create New Dashboard" onPress={() => {}} />
      </View>
      <ScrollView>
        <View style={_styles.jLKeWaHz}>
          <Text style={_styles.tVqFGLZq}>Dashboard Tiles</Text>
          <View style={_styles.HkBEPYYJ}>
            <Text style={_styles.NIhINqmi}>Driver and Device Overview</Text>
            <Text>Current Locations and Status</Text>
            <Image source={{
            uri: 'https://tinyurl.com/42evm3m3'
          }} style={_styles.wgHxbYJd} />
            <Button title="Filter Options" onPress={() => {}} />
            <Text>Real-time map showing the current locations of drivers and devices</Text>
            <Text>Quick status indicators for each driver and device</Text>
          </View>
          <View style={_styles.TLmpRbSk}>
            <Text style={_styles.RVtSqbgu}>Safety Insights</Text>
            <Text>Safety Metrics</Text>
            <Image source={{
            uri: 'https://tinyurl.com/42evm3m3'
          }} style={_styles.qOBxoXPE} />
            <Button title="Filter Options" onPress={() => {}} />
            <Text>Graphs highlighting safety-critical events</Text>
            <Text>Coaching recommendations to improve driver safety</Text>
          </View>
          <View style={_styles.HMGRjHJJ}>
            <Text style={_styles.RgmRFUXR}>Compliance Snapshot</Text>
            <Text>Compliance Overview</Text>
            <Image source={{
            uri: 'https://tinyurl.com/42evm3m3'
          }} style={_styles.jemsABzx} />
            <Button title="Filter Options" onPress={() => {}} />
            <Text>ELD status and hours of service compliance</Text>
            <Text>Adherence to company policies</Text>
          </View>
          <View style={_styles.DdRTxngY}>
            <Text style={_styles.gIyvoJaX}>Maintenance Overview</Text>
            <Text>Vehicle Maintenance</Text>
            <Image source={{
            uri: 'https://tinyurl.com/42evm3m3'
          }} style={_styles.EgSsPoOI} />
            <Button title="Filter Options" onPress={() => {}} />
            <Text>Preventative maintenance schedule</Text>
            <Text>DVIR status and logs</Text>
            <Text>Real-time vehicle status</Text>
          </View>
          <View style={_styles.sXleENbv}>
            <Text style={_styles.rkTajAsb}>Fuel and Energy Usage</Text>
            <Text>Fuel and Energy Management</Text>
            <Image source={{
            uri: 'https://tinyurl.com/42evm3m3'
          }} style={_styles.XIzDfXjk} />
            <Button title="Filter Options" onPress={() => {}} />
            <Text>Fuel tax information</Text>
            <Text>Fuel spend and usage for drivers and devices</Text>
          </View>
          <View style={_styles.xfshGKGO}>
            <Text style={_styles.dBUqQliy}>Custom Reports</Text>
            <Text>My Reports</Text>
            <Image source={{
            uri: 'https://tinyurl.com/42evm3m3'
          }} style={_styles.JqLiGHZR} />
            <Button title="Filter Options" onPress={() => {}} />
            <Text>A condensed view of custom reports</Text>
            <TouchableOpacity onPress={() => {}}>
              <Text style={_styles.DfOxBybb}>Create and customize new reports</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>;
};

export default Dashboard;

const _styles = StyleSheet.create({
  PfjqlYRo: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  },
  KTsuATFj: {
    padding: 20
  },
  CBRSrbtM: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10
  },
  EzaaIqOY: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20
  },
  jLKeWaHz: {
    padding: 20
  },
  tVqFGLZq: {
    fontSize: 20,
    fontWeight: "bold"
  },
  HkBEPYYJ: {
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20
  },
  NIhINqmi: {
    fontSize: 18,
    fontWeight: "bold"
  },
  wgHxbYJd: {
    width: "100%",
    height: 200,
    marginTop: 10
  },
  TLmpRbSk: {
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20
  },
  RVtSqbgu: {
    fontSize: 18,
    fontWeight: "bold"
  },
  qOBxoXPE: {
    width: "100%",
    height: 200,
    marginTop: 10
  },
  HMGRjHJJ: {
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20
  },
  RgmRFUXR: {
    fontSize: 18,
    fontWeight: "bold"
  },
  jemsABzx: {
    width: "100%",
    height: 200,
    marginTop: 10
  },
  DdRTxngY: {
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20
  },
  gIyvoJaX: {
    fontSize: 18,
    fontWeight: "bold"
  },
  EgSsPoOI: {
    width: "100%",
    height: 200,
    marginTop: 10
  },
  sXleENbv: {
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20
  },
  rkTajAsb: {
    fontSize: 18,
    fontWeight: "bold"
  },
  XIzDfXjk: {
    width: "100%",
    height: 200,
    marginTop: 10
  },
  xfshGKGO: {
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20
  },
  dBUqQliy: {
    fontSize: 18,
    fontWeight: "bold"
  },
  JqLiGHZR: {
    width: "100%",
    height: 200,
    marginTop: 10
  },
  DfOxBybb: {
    color: "blue"
  }
});