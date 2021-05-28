import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Button
} from "react-native";
import * as firebase from "firebase";
import * as Google from 'expo-google-app-auth';

class LoginScreen extends Component {

  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
            providerData[i].uid === googleUser.user.id) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }

  onSignIn = (googleUser) => {
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!this.isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken
        );
  
        // Sign in with credential from the Google user.
        firebase.auth().signInWithCredential(credential).then(function(result) { 
          console.log('user signed in ');
          console.log(result)
          if (result.additionalUserInfo.isNewUser){
            console.log('setting');
            firebase
              .database()
              .ref('users/' + result.user.uid)
              .set({
                email: result.additionalUserInfo.profile.email,
                first_name: result.additionalUserInfo.profile.given_name,
                last_name: result.additionalUserInfo.profile.family_name,
                created_at: Date.now(),
                last_time_logged: Date.now()
              });
              console.log('setting done');
          } else {
            firebase
              .database()
              .ref('/users/' + result.user.uid)
              .update({
                last_time_logged: Date.now()
              });
          }
        }).catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
      } else {
        console.log('User already signed-in Firebase.');
        this.props.navigation.navigate('DashboardScreen');
      }
    });
  }

    async signInWithGoogleAsync() {
      try {
        const result = await Google.logInAsync({
          androidClientId: '476821295329-sjt4s51mmhe63cuk5tal9vgmkght2qsl.apps.googleusercontent.com',
          //iosClientId: ID,
          scopes: ['profile', 'email']
        });
        if (result.type === 'success') {
          this.onSignIn(result);
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
              <Text style={styles.Text}>
                Greetings App
              </Text>
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
    },
    Text: {
      flex:0.1,
        paddingVertical:50,
        fontSize: 50,
        color: "#100cdd",
        fontWeight: "bold", 
        textAlign: 'center'
    }
});