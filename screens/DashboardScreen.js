import React, { Component, useState, useEffect } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Button
} from "react-native";
import * as firebase from 'firebase';

class DashboardScreen extends Component {
    render() {
        return (
            <>
                <View style={styles.container}>
                    <Text style={styles.text}>
                        Ola
                    </Text>
                </View>
                <Button
                    style={styles.logoutButton}
                    title="Sign Out"
                    onPress={() => firebase.auth().signOut()}
                />
            </>
        );
    }
}
export default DashboardScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding:20,
        alignContent: 'center',
        alignItems: 'center',
        
    }, 
    text: {
        flex:1,
        paddingVertical:350,
        fontSize: 50,
        color: "#222",
        fontWeight: "bold", 
        textAlign: 'center'
    },
    logoutButton: {
        flex: 1,
        marginBottom: 5
    }
});