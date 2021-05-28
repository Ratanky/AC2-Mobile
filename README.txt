A ideia original do app era fazer um TO-DO List para android.

A interface grafica foi facil, ficou pronta bem rapida.
O sistema de login usei o firebase com o google para logar.
O firebase também salva as informações do usuário, como e-mail, 
nome e quando foi criado.

No app tive alguns problemas usando useState em uma das screen,
o react acusa Invalid Hook Call, mas nao consegui achar uma solucao a tempo.

A ultima tentativa do To-Do estava como a seguir:

class DashboardScreen extends Component {

    ToDo = () => {
        const [task, updateTask] = useState('');
        const [tasks, updateTasks] = useState(['test1', 'test2'])
        
        const handleAdd = () => {
            updateTasks([... tasks, task]);
            updateTask('');
        }
    }
    
    render() {
        return (
            <>
            <KeyboardAvoidingView
                keyboardVerticalOffset={0}
                behavior="padding"
                style={{ flex: 1}}
                enabled={Platform.OS == "ios"}
            >
                <View style={styles.container}>
                    <View style={styles.body}>
                        <Text>Lista:</Text>
                        <FlatList 
                            style={styles.flatList}
                            data={ToDo().tasks}
                            keyExtractor={item => item}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <View style={styles.containerView}>
                                    <Text style={styles.Text}> { item } </Text>
                                    <TouchableOpacity >
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
                    </View>
                    <View style={styles.form}>
                        <TextInput 
                            style={styles.input}
                            placeholderTextColor="#999"
                            placeholder="Item Name"
                            maxLength={50}
                            onChangeText={text => ToDo().updateTask(text)}
                            value={this.ToDo().task}
                        />
                        <TouchableOpacity style={styles.touchable} onPress={() => ToDo().handleAdd}>
                            <Ionicons name="add-outline" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
                <Button
                    style={styles.logoutButton}
                    title="Sign Out"
                    onPress={() => firebase.auth().signOut()}
                />
            </KeyboardAvoidingView>
            </>
        );
    }
}
export default DashboardScreen;

const Items = ["Task1", "Task2", "Task3"];
const setItem ='';
const newItem = "";
const setNewItem = '';

