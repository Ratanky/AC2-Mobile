import React, { Component, useState, useEffect } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Button,
    TextInput,
    TouchableOpacity,
    FlatList
} from "react-native";
import * as firebase from 'firebase';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

class DashboardScreen extends Component {
    render() {
        return (
            <>
                <View style={styles.container}>
                    <View style={styles.form}>
                        <TextInput 
                            style={styles.input}
                            placeholderTextColor="#999"
                            placeholder="Item Name"
                            maxLength={40}
                        />
                        <TouchableOpacity style={styles.touchable}>
                            <Ionicons name="add-outline" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text>Lista:</Text>
                        <FlatList 
                            style={styles.flatList}
                            /*data={items}
                            keyExtractor={item => item.toString}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => <Text>{item}</Text>}*/
                        />
                    </View>
                </View>
                <Button
                    style={styles.logoutButton}
                    title="Sign Out"
                    onPress={() => firebase.auth().signOut()}//this.props.navigation.navigate('LoginScreen')
                />
            </>
        );
    }
}
export default DashboardScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 60
    }, 
    logoutButton: {
        paddingHorizontal:20,
        paddingVertical: 10,
        marginBottom: 20,
    },
    form: {
        padding: 0,
        height: 60,
        width: 375,
        justifyContent: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
        paddingBottom: 13,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#eee',
        marginTop: 30
    },
    input: {
        flex:1,
        height:40,
        backgroundColor: '#eee',
        borderRadius:4,
        paddingVertical: 5,
        paddingHorizontal:10,
        borderWidth:2,
        borderColor: '#eee'
    }, 
    touchable: {
        height:40,
        width:40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#689cf2',
        borderRadius: 4,
        marginLeft: 10
    },
    flatList: {
        flex: 1,
        marginTop:20
    }
});