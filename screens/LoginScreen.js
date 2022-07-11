import React, { useState } from "react";
import { ImageBackground, Text, View, StyleSheet, KeyboardAvoidingView, Touchable } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native";
import {signInWithEmailAndPassword, getAuth} from "firebase/auth";
import app from "../config/firebaseConfig";
import styles from "../config/styles";


// const image = require("../assets/background_food.jpg");
export default function LoginScreen({navigation}){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const auth = getAuth(app);
    function loginHandler(){
        console.log(email);
        console.log(password);
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            navigation.navigate('Home');
    })
    .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    });
    }

    function registerHandler(){
    navigation.navigate('Register');
    }

    return(
        <KeyboardAvoidingView style={styles.container}>
            {/* Not needed for now. I don't have any ideas for image 16:9 would be perfect */}
            <ImageBackground  resizeMode="cover" style={styles.image}>
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
                onPress={loginHandler}
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
            </ImageBackground>
        </KeyboardAvoidingView>
    )
}
