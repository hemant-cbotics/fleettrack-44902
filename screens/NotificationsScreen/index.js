import React, { useState } from 'react';
import { SafeAreaView, View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState([{
    id: '1',
    title: 'Notification 1',
    read: false
  }, {
    id: '2',
    title: 'Notification 2',
    read: false
  }, {
    id: '3',
    title: 'Notification 3',
    read: false
  }]);

  const markAsRead = id => {
    setNotifications(notifications.map(notification => notification.id === id ? { ...notification,
      read: true
    } : notification));
  };

  const renderItem = ({
    item
  }) => <View style={styles.item}>
      <Image style={styles.image} source={{
      uri: 'https://tinyurl.com/42evm3m3'
    }} />
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <TouchableOpacity onPress={() => markAsRead(item.id)}>
          <Text style={styles.buttonText}>Mark as read</Text>
        </TouchableOpacity>
      </View>
    </View>;

  return <SafeAreaView style={styles.container}>
      <Text style={styles.header}>List of all notifications</Text>
      <FlatList data={notifications} renderItem={renderItem} keyExtractor={item => item.id} />
    </SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5'
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 20
  },
  item: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0'
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 20
  },
  content: {
    flex: 1
  },
  title: {
    fontSize: 18,
    marginBottom: 10
  },
  buttonText: {
    color: '#007BFF'
  }
});
export default NotificationScreen;