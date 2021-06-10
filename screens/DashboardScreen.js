import React, { Component, useState, useEffect, useReducer } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Button,
    TextInput,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
    Keyboard,
    Alert,
    LogBox
} from "react-native";
import * as firebase from 'firebase';;
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
//LogBox.ignoreAllLogs(['Warning: ...'])

var first_run = true;

export const DashboardScreen = () => {
        const [tasks, setTasks] = useState([]);
        const [newTask, setNewTask] = useState('');
        const user = firebase.auth().currentUser;
        const userName = user.displayName;
        const userUid = user.uid;
        var listSize;

        //console.log('tasks after rerun: ' + tasks);

        async function getTasks () {
            await firebase
            .database()
            .ref().child("users").child(firebase.auth().currentUser.uid).child("tasks_size")
            .once("value").then((snapshot) => {
                if(snapshot.exists()){
                    listSize = snapshot.val();
                    //console.log('list size init ' + listSize);
                } else {
                    //console.log('searching listSize');
                }
            }).catch((error) => {
                console.log(error);
            });
            
            //console.log('list size init ' + listSize);
            for(var i = 0; i <= listSize; i++){
                firebase
                .database()
                .ref().child("users").child(userUid).child("tasks").child(i)
                .once("value").then(async function (snapshot) {
                    if(snapshot.exists()){
                        const test = snapshot.val();
                        //console.log(test);
                        await tasks.push(test.name);
                    } else {
                        //console.log('No tasks');
                        listSize--;
                        //console.log(listSize+1);
                    }
                }).catch((error) => {
                    console.log(error);
                    return;
                }); 
            } 
        }
        if(first_run){
            console.log('\n\n ======= FIRST RUN ======== \n\n');
            first_run = false;
            getTasks();
        }   

        saveTasks = () => {
            var i;
            for(i = 0; i<tasks.length; i++){
                console.log('tasks length: '+ tasks.length);
                const task = tasks[i];
                console.log('task:' + task);
                firebase
                .database()
                .ref('users/' + userUid + '/tasks/' + i)
                .update({
                    name: task
                });
            }
            listSize = i-1;
            console.log(listSize);
            firebase
                .database()
                .ref('users/' + userUid)
                .update({
                    tasks_size: listSize,
                });
        };

        async function addTasks() {
            if(newTask === "") return;
            const search = tasks.filter(tasks => tasks === newTask);
            if(search != 0){
                Alert.alert("Atenção!","Tarefa já criada");
                return;
            } 
            await setTasks([...tasks, newTask]);
            setNewTask('');
            saveTasks();
            Keyboard.dismiss();
        };
        async function removeTasks (name) {
            Alert.alert(
                "Deletado",
                "Tarefa apagada com sucesso",
                [
                    {
                        text: "Ok!",
                        onPress: () => {
                            firebase
                            .database()
                            .ref().child('users/').child(userUid).child('tasks/').child(tasks.indexOf(name))
                            .remove();
                            setTasks(tasks.filter(tasks => tasks != name));
                        }
                    }
                ],{ cancelable : false }
            )
            saveTasks();
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
                            onChangeText={text => setNewTask(text)}
                            maxLength={40}
                            value={newTask}
                        />
                        <TouchableOpacity style={styles.touchable} onPress={() => {addTasks()}}>
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
                                    <Text style={styles.Text}> { item } </Text>
                                    <TouchableOpacity onPress={() => removeTasks(item)}>
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
                    onPress={
                        () => this.saveTasks(),
                        () => firebase.auth().signOut()
                    }
                />
            </>
        );
}
//export default DashboardScreen;



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
        height:50,
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
        fontSize: 25
    }
});