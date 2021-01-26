import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
    adContainer: {
        backgroundColor: '#ff8700',
        height: '50%',
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 24,
    }
});

const Ad = () => {
    return (
        <View style={styles.adContainer} >
            <Text style={styles.titleText}>Test Title</Text>
            <a href="#">Test User</a>
        </View>
    );

}

export default Ad;