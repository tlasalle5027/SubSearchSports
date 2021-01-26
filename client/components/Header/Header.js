import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';

const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: '#00FF3C',
        height: '50%',
        textAlign: 'left',
    },
    logo: {
        width: 250,
        height: 100,
    },
});

const Header = () => {
    return (
        <View style={styles.headerStyle}>
            <Image style={styles.logo} source={require('../../../resources/img/SSS_Logo_Transparent.png')} />
            <Text>Welcome to Sub Search Sport</Text>
        </View>
    );

}

export default Header;
