import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Button, StyleSheet } from 'react-native';

const TokenScreen = () => {
  const [token, setToken] = useState('');

  const handleSubmit = () => {// handle submit
  };

  const handleResend = () => {// handle resend
  };

  const handleCancel = () => {// handle cancel
  };

  return <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Enter token</Text>
        <TextInput style={styles.input} onChangeText={setToken} value={token} keyboardType="numeric" />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Submit" onPress={handleSubmit} />
        <Button title="Re-send token" onPress={handleResend} />
        <Button title="Cancel" onPress={handleCancel} />
      </View>
    </SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#F5F5F5'
  },
  inputContainer: {
    marginBottom: 20
  },
  label: {
    fontSize: 16,
    marginBottom: 10
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
export default TokenScreen;