import { StyleSheet } from "react-native";
import React, { useState } from 'react';
import { SafeAreaView, View, TextInput, Button, Text, FlatList, Image, TouchableOpacity } from 'react-native';

const DashboardScreen = () => {
  const [dashboardName, setDashboardName] = useState('');
  const [search, setSearch] = useState('');
  const [selectedKPIs, setSelectedKPIs] = useState([]);
  const KPIs = ['KPI1', 'KPI2', 'KPI3', 'KPI4', 'KPI5'];
  const reports = ['Report1', 'Report2', 'Report3', 'Report4', 'Report5'];
  return <SafeAreaView style={_styles.sjbMtTdF}>
      <View style={_styles.dOfUuTds}>
        <TextInput style={_styles.VjWxKykt} onChangeText={text => setDashboardName(text)} value={dashboardName} placeholder="Dashboard Name" />
        <TextInput style={_styles.vVbbpAlb} onChangeText={text => setSearch(text)} value={search} placeholder="Search" />
        <Text style={_styles.EyOwKsZo}>List of all KPIs</Text>
        {KPIs.map((kpi, index) => <TouchableOpacity key={index} onPress={() => setSelectedKPIs([...selectedKPIs, kpi])}>
            <Text>{kpi}</Text>
          </TouchableOpacity>)}
        <Text style={_styles.rSrFsAYh}>Use a report to create a Tile/Dashboard</Text>
        <FlatList data={reports} renderItem={({
        item
      }) => <Text>{item}</Text>} keyExtractor={item => item} />
        <Text style={_styles.AZtFeHIT}>Layout Options:</Text>
        <Image style={_styles.cnYpwzHE} source={{
        uri: 'https://tinyurl.com/42evm3m3'
      }} />
        <Text style={_styles.BnQIYphN}>Dashboard view</Text>
        <Text>{dashboardName}</Text>
        <Button title="Delete" onPress={() => setDashboardName('')} />
        <Button title="Save" onPress={() => alert('Dashboard Saved')} />
      </View>
    </SafeAreaView>;
};

export default DashboardScreen;

const _styles = StyleSheet.create({
  sjbMtTdF: {
    flex: 1,
    backgroundColor: "#fff"
  },
  dOfUuTds: {
    padding: 20
  },
  VjWxKykt: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1
  },
  vVbbpAlb: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 20
  },
  EyOwKsZo: {
    fontSize: 20,
    marginTop: 20
  },
  rSrFsAYh: {
    fontSize: 20,
    marginTop: 20
  },
  AZtFeHIT: {
    fontSize: 20,
    marginTop: 20
  },
  cnYpwzHE: {
    width: 50,
    height: 50
  },
  BnQIYphN: {
    fontSize: 20,
    marginTop: 20
  }
});