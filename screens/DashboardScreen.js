import React, { Component, useState, useEffect, useReducer } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Button,
    TextInput,
    TouchableOpacity,
    FlatList,
    SafeAreaView
} from "react-native";
import * as firebase from 'firebase';;
import { Ionicons, MaterialIcons } from '@expo/vector-icons';



class DashboardScreen extends Component {
    /*UselessTextInput = () => {
        const [text, setText] = useState('');
    }*/
    render() {
        const user = firebase.auth().currentUser;
        const userName = user.displayName;
        const userUid = user.uid;

        firebase.database().ref().child("users").child(userUid).child("tasks").once("value")
        .then((snapshot) => {
            if(snapshot.exists()){
                console.log(snapshot.val());
                console.log('snapshot printed');
            } else {
                console.log('Data not available');
            }
        }).catch((error) => {
            console.log(error);
        });
        console.log('Done.1');

        
        var tasks = [
            {id:'0', name: 'task0'},
            {id:'1', name: 'task1'},
            {id:'2', name: 'task2'},
            {id:'3', name: 'task3'},
            {id:'4', name: 'task4'}
        ];
        saveTasks = (tasks) => {
            tasks.forEach(task => {
                console.log('task:' + task);
                //if(taskDBContainsTask){
                firebase
                .database()
                .ref('users/' + userUid + '/tasks/' + task.id)
                .update({
                    name: task.name
                });
                /*} else {
                    firebase
                    .database()
                    .ref('users/' + userUid + '/tasks/' + task.id)
                    .update({
                        name: task.name
                    });
                }*/
            });
            console.log('Done.2')
        };
        
        return (
            <>
                <View style={styles.container}>
                    <View>
                        <Text>Olá, {userName}!</Text>
                    </View>
                    <View style={styles.form}>
                        <TextInput 
                            style={styles.input}
                            placeholderTextColor="#999"
                            placeholder="Insert Task Name Here"
                            
                            maxLength={40}
                        />
                        <TouchableOpacity style={styles.touchable} onPress={() => {saveTasks(tasks)}}>
                            <Ionicons name="add-outline" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    <SafeAreaView style={{flex:1}}>
                        <FlatList 
                            style={styles.flatList}
                            data={tasks}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={item => item}
                            renderItem={({ item }) => (
                                <View style={styles.containerView}>
                                    <Text style={styles.Text}> { item.name } </Text>
                                    <TouchableOpacity onPress={() => console.log(item.id)}>
                                        <MaterialIcons
                                            name="delete-forever"
                                            size={25}
                                            color="#f64c75"
                                            marginLeft="200"
                                        />
                                    </TouchableOpacity>
                                </View>
                            )}
                            
                        />
                    </SafeAreaView>
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
        backgroundColor: '#ddd',
        borderRadius: 4,
        borderWidth:0.5,
        marginLeft: 10
    },
    flatList: {
        flex: 1,
        marginTop:20
    }, 
    containerView:{
        height:100,
        width: 375,
        marginBottom: 50,
        borderBottomWidth:1,
        borderColor: '#eee',
        borderRadius: 4,
        justifyContent:"center",
        alignSelf: "center",
        flex:1,
        flexDirection:"row",
        
    },
    Text: {
        flex:1,
        textTransform: "capitalize",
        fontSize: 40
    }
});