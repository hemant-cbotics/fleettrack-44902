import { StyleSheet } from "react-native";
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, Image, Button, TouchableOpacity } from 'react-native';

const WeatherScreen = () => {
  const [unit, setUnit] = useState('Celsius');
  const dummyData = [{
    date: 'Today',
    dayTemp: 25,
    nightTemp: 15,
    dayIcon: 'https://tinyurl.com/42evm3m3',
    nightIcon: 'https://tinyurl.com/42evm3m3',
    precipitation: 20,
    humidity: 60,
    wind: 10,
    uvIndex: 5,
    sunrise: '6:00 AM',
    sunset: '6:00 PM'
  } // More data...
  ];

  const toggleUnit = () => {
    setUnit(unit === 'Celsius' ? 'Fahrenheit' : 'Celsius');
  };

  return <SafeAreaView style={_styles.plVhWZZw}>
      <ScrollView>
        {dummyData.map((data, index) => <View key={index} style={_styles.yhjSpOkk}>
            <Text>{data.date}</Text>
            <View style={_styles.KDlVoJgb}>
              <View>
                <Text>Day: {data.dayTemp}°{unit}</Text>
                <Image source={{
              uri: data.dayIcon
            }} style={_styles.HvsTfFhC} />
              </View>
              <View>
                <Text>Night: {data.nightTemp}°{unit}</Text>
                <Image source={{
              uri: data.nightIcon
            }} style={_styles.ZDxXtSOM} />
              </View>
            </View>
            <Text>Precipitation: {data.precipitation}%</Text>
            <Text>Humidity: {data.humidity}%</Text>
            <Text>Wind: {data.wind} km/h</Text>
            <Text>UV Index: {data.uvIndex}</Text>
            <Text>Sunrise: {data.sunrise}</Text>
            <Text>Sunset: {data.sunset}</Text>
          </View>)}
      </ScrollView>
      <View style={_styles.zdWTKLwn}>
        <Button title="Refresh" onPress={() => {}} />
        <TouchableOpacity onPress={toggleUnit}>
          <Text>Switch to {unit === 'Celsius' ? 'Fahrenheit' : 'Celsius'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>;
};

export default WeatherScreen;

const _styles = StyleSheet.create({
  plVhWZZw: {
    flex: 1,
    backgroundColor: "#fff"
  },
  yhjSpOkk: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd"
  },
  KDlVoJgb: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  HvsTfFhC: {
    width: 50,
    height: 50
  },
  ZDxXtSOM: {
    width: 50,
    height: 50
  },
  zdWTKLwn: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20
  }
});