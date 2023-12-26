import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TextInput, Button, Image, Text } from 'react-native';

const SetupScreen = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  return <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={{
      uri: 'https://tinyurl.com/42evm3m3'
    }} />
      <Text style={styles.title}>Setup your account</Text>
      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} onChangeText={setName} value={name} placeholder="Enter your name" />
      <Text style={styles.label}>Password</Text>
      <TextInput style={styles.input} onChangeText={setPassword} value={password} placeholder="Enter your password" secureTextEntry />
      <Text style={styles.label}>Confirm Password</Text>
      <TextInput style={styles.input} onChangeText={setConfirmPassword} value={confirmPassword} placeholder="Confirm your password" secureTextEntry />
      <Button title="Continue" onPress={() => console.log('Go to Dashboard')} />
    </SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  label: {
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    fontSize: 16
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 20,
    paddingLeft: 10
  }
});
export default SetupScreen;