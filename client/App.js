import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Ad from './components/Ads/Ads';

export default function App() {
  return (
    <div>
      <View style={styles.container}>      
        <Text>Hello World!</Text>
        <StatusBar style="auto" />
      </View>
      <View>
        <Ad />
      </View>
    </div>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
