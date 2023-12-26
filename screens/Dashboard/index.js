import { StyleSheet } from "react-native";
import React from 'react';
import { SafeAreaView, View, Text, TextInput, Button, TouchableOpacity, ScrollView, Image } from 'react-native';

const Dashboard = () => {
  return <SafeAreaView style={_styles.uftybcNK}>
      <View style={_styles.AOXYQesl}>
        <TextInput placeholder="Search" style={_styles.ZQwwTfbF} />
        <Text style={_styles.QwLqfUPL}>Settings</Text>
        <Button title="Set number of visible tiles" onPress={() => {}} />
        <Button title="Show/Hide Tiles" onPress={() => {}} />
        <Button title="Set Dashboard Tiles Location" onPress={() => {}} />
        <Button title="Create New Dashboard" onPress={() => {}} />
      </View>
      <ScrollView>
        <View style={_styles.CwnIqQWz}>
          <Text style={_styles.WWPcYQAY}>Dashboard Tiles</Text>
          <View style={_styles.WTNhtZap}>
            <Text style={_styles.GhovysNw}>Driver and Device Overview</Text>
            <Text>Current Locations and Status</Text>
            <Image source={{
            uri: 'https://tinyurl.com/42evm3m3'
          }} style={_styles.RDOsTXFe} />
            <Button title="Filter Options" onPress={() => {}} />
            <Text>Real-time map showing the current locations of drivers and devices</Text>
            <Text>Quick status indicators for each driver and device</Text>
          </View>
          <View style={_styles.ANDWNJKr}>
            <Text style={_styles.GcYxNstq}>Safety Insights</Text>
            <Text>Safety Metrics</Text>
            <Image source={{
            uri: 'https://tinyurl.com/42evm3m3'
          }} style={_styles.sPxqNOWu} />
            <Button title="Filter Options" onPress={() => {}} />
            <Text>Graphs highlighting safety-critical events</Text>
            <Text>Coaching recommendations to improve driver safety</Text>
          </View>
          <View style={_styles.anWuCGmF}>
            <Text style={_styles.wjvhGlXL}>Compliance Snapshot</Text>
            <Text>Compliance Overview</Text>
            <Image source={{
            uri: 'https://tinyurl.com/42evm3m3'
          }} style={_styles.npHjItyN} />
            <Button title="Filter Options" onPress={() => {}} />
            <Text>ELD status and hours of service compliance</Text>
            <Text>Adherence to company policies</Text>
          </View>
          <View style={_styles.EpviSVnD}>
            <Text style={_styles.lIJOVDRA}>Maintenance Overview</Text>
            <Text>Vehicle Maintenance</Text>
            <Image source={{
            uri: 'https://tinyurl.com/42evm3m3'
          }} style={_styles.NzWBDdPJ} />
            <Button title="Filter Options" onPress={() => {}} />
            <Text>Preventative maintenance schedule</Text>
            <Text>DVIR status and logs</Text>
            <Text>Real-time vehicle status</Text>
          </View>
          <View style={_styles.freqfPLB}>
            <Text style={_styles.kYCPNaGZ}>Fuel and Energy Usage</Text>
            <Text>Fuel and Energy Management</Text>
            <Image source={{
            uri: 'https://tinyurl.com/42evm3m3'
          }} style={_styles.SnDugVhd} />
            <Button title="Filter Options" onPress={() => {}} />
            <Text>Fuel tax information</Text>
            <Text>Fuel spend and usage for drivers and devices</Text>
          </View>
          <View style={_styles.pSKIjFMi}>
            <Text style={_styles.vUJoQMZM}>Custom Reports</Text>
            <Text>My Reports</Text>
            <Image source={{
            uri: 'https://tinyurl.com/42evm3m3'
          }} style={_styles.JfyeqjwJ} />
            <Button title="Filter Options" onPress={() => {}} />
            <Text>A condensed view of custom reports</Text>
            <TouchableOpacity onPress={() => {}}>
              <Text style={_styles.ocVkWlAq}>Create and customize new reports</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>;
};

export default Dashboard;

const _styles = StyleSheet.create({
  uftybcNK: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  },
  AOXYQesl: {
    padding: 20
  },
  ZQwwTfbF: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10
  },
  QwLqfUPL: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20
  },
  CwnIqQWz: {
    padding: 20
  },
  WWPcYQAY: {
    fontSize: 20,
    fontWeight: "bold"
  },
  WTNhtZap: {
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20
  },
  GhovysNw: {
    fontSize: 18,
    fontWeight: "bold"
  },
  RDOsTXFe: {
    width: "100%",
    height: 200,
    marginTop: 10
  },
  ANDWNJKr: {
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20
  },
  GcYxNstq: {
    fontSize: 18,
    fontWeight: "bold"
  },
  sPxqNOWu: {
    width: "100%",
    height: 200,
    marginTop: 10
  },
  anWuCGmF: {
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20
  },
  wjvhGlXL: {
    fontSize: 18,
    fontWeight: "bold"
  },
  npHjItyN: {
    width: "100%",
    height: 200,
    marginTop: 10
  },
  EpviSVnD: {
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20
  },
  lIJOVDRA: {
    fontSize: 18,
    fontWeight: "bold"
  },
  NzWBDdPJ: {
    width: "100%",
    height: 200,
    marginTop: 10
  },
  freqfPLB: {
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20
  },
  kYCPNaGZ: {
    fontSize: 18,
    fontWeight: "bold"
  },
  SnDugVhd: {
    width: "100%",
    height: 200,
    marginTop: 10
  },
  pSKIjFMi: {
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20
  },
  vUJoQMZM: {
    fontSize: 18,
    fontWeight: "bold"
  },
  JfyeqjwJ: {
    width: "100%",
    height: 200,
    marginTop: 10
  },
  ocVkWlAq: {
    color: "blue"
  }
});