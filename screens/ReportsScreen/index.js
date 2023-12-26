import { StyleSheet } from "react-native";
import React from 'react';
import { SafeAreaView, View, Text, Button, Image, FlatList, TouchableOpacity } from 'react-native';
const reports = [{
  id: '1',
  title: 'Report 1',
  format: 'HTML'
}, {
  id: '2',
  title: 'Report 2',
  format: 'XLS'
} // add more reports here
];

const ReportScreen = ({
  navigation
}) => {
  return <SafeAreaView style={_styles.dzfhbIFb}>
      <View style={_styles.WvTjqgFC}>
        <Text style={_styles.EhdpQruD}>Default Reports</Text>
        <FlatList data={reports} keyExtractor={item => item.id} renderItem={({
        item
      }) => <View style={_styles.pluRUDBL}>
              <TouchableOpacity onPress={() => navigation.navigate('ViewReportScreen', {
          reportId: item.id
        })}>
                <Text style={_styles.RsNHJHna}>{item.title}</Text>
              </TouchableOpacity>
              <View style={_styles.OYmzTfvb}>
                <Text style={_styles.rTRrpeFz}>{item.format}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('EditReportScreen', {
            reportId: item.id
          })}>
                  <Image source={{
              uri: 'https://tinyurl.com/42evm3m3'
            }} style={_styles.YguxWrJS} />
                </TouchableOpacity>
              </View>
            </View>} />
        <Button title="Create New Report" onPress={() => navigation.navigate('ReportBuilderScreen')} />
      </View>
    </SafeAreaView>;
};

export default ReportScreen;

const _styles = StyleSheet.create({
  dzfhbIFb: {
    flex: 1,
    backgroundColor: "#fff"
  },
  WvTjqgFC: {
    padding: 20
  },
  EhdpQruD: {
    fontSize: 24,
    fontWeight: "bold"
  },
  pluRUDBL: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20
  },
  RsNHJHna: {
    fontSize: 18
  },
  OYmzTfvb: {
    flexDirection: "row",
    alignItems: "center"
  },
  rTRrpeFz: {
    marginRight: 10
  },
  YguxWrJS: {
    width: 20,
    height: 20
  }
});