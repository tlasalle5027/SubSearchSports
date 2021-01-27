import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AdList from './components/AdList/AdList';
import Header from './components/Header/Header';

export default function App() {
  return (
    <div>
      <View>
        <Header />
      </View>
      <View style={styles.container}>
        <AdList />
        <StatusBar style="auto" />
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
    top: '125px',
  },
});
