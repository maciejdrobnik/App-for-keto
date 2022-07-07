import React, { useState } from "react";
import { Text, View, StyleSheet, KeyboardAvoidingView, Touchable } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../config/firebaseConfig"




export default function LoginScreen(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    function registerHandler(){
    createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      console.log('User account created & signed in!');
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }
  
      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }
  
      console.error(error);
    });
}

    return(
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                placeholder="Email"
                value={email }
                onChangeText = {text => setEmail(text)} 
                style={styles.inputText}
                />
                <TextInput
                placeholder="password"
                value={password}
                onChangeText = {text => setPassword(text)} 
                style={styles.inputText}
                secureTextEntry={true}
                />
            </View>
            <View>
                <TouchableOpacity
                style={styles.buttonContainer}
                //onPress={}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity
                style={styles.buttonContainer}
                onPress={registerHandler}
                >
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    },
    inputContainer:{
        width:'80%',

    },
    inputText:{

    },
    buttonContainer:{

    },
    buttonText:{

    }

})