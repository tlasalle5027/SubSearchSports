import React from 'react';
import { StyleSheet, Image, Button, Text, View } from 'react-native';

const styles = StyleSheet.create({
    headerStyle: {
        alignSelf: "center",
        backgroundColor: '#00FF3C',
        display: "table",
        height: '15%',
        justifyContent: "center",
        justifySelf: "center",
        margin: "10",
        overflow: "hidden",
        padding: "20px",
        position: 'fixed',
        textAlign: 'center',
        top: 0,        
        width: '100%',
    },
    listItem: {
        color: '#FF0000',
        padding: "30px",
        display: 'table-cell',
        fontWeight: 'bold',
        fontSize: '24px',
    },
    logo: {
        width: 350,
        height: 100,
        display: 'table-cell',
    },
});

const Header = () => {
    return (
        <View style={styles.headerStyle}>
            <Image style={styles.logo} source={require('../../../resources/img/SSS_Logo_Transparent.png')} />                 
            <Text style={styles.listItem}>Welcome to Sub Search Sport</Text>
            <Text style={styles.listItem}>Link One</Text>
            <Text style={styles.listItem}>Link Two</Text>
            <Button color="#FF0000" title="Log In/Sign Up" />
        </View>
    );
}

export default Header;
