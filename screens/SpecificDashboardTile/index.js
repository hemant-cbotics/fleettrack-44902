import React from 'react';
import { SafeAreaView, View, Text, Image, Button, StyleSheet } from 'react-native';

const DashboardScreen = () => {
  const dashboardTileName = 'My Dashboard';
  const filterOptions = ['Option 1', 'Option 2', 'Option 3'];
  const dashboardView = 'Graphical View';
  return <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{dashboardTileName}</Text>
      <View style={styles.filterContainer}>
        {filterOptions.map((option, index) => <Button key={index} title={option} onPress={() => {}} />)}
      </View>
      <Text style={styles.viewTitle}>{dashboardView}</Text>
      <Image style={styles.image} source={{
      uri: 'https://tinyurl.com/42evm3m3'
    }} />
      <View style={styles.buttonContainer}>
        <Button title="Print" onPress={() => {}} />
        <Button title="Edit" onPress={() => {}} />
      </View>
    </SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  viewTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20
  }
});
export default DashboardScreen;