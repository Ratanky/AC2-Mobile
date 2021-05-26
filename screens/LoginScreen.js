import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Button
} from "react-native";

class LoginScreen extends Component {

    signInWithGoogleAsync = async () => {
        try {
          const result = await Google.logInAsync({
            //androidClientId: YOUR_CLIENT_ID_HERE,
            behavior:'web',        
            iosClientId: '476821295329-sbg934qemfiaifehhqq6uvrj3s67o95r.apps.googleusercontent.com',
            scopes: ['profile', 'email'],
          });
      
          if (result.type === 'success') {
            return result.accessToken;
          } else {
            return { cancelled: true };
          }
        } catch (e) {
          return { error: true };
        }
      }

    render() {
        return (
            <View style={styles.container}>
                <Button 
                    title='Sign In With Google' 
                    onPress={() => this.signInWithGoogleAsync()}
                />
            </View>
        );
    }
}
export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});