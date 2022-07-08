import React, { useState } from "react";
import { ImageBackground, Text, View, StyleSheet, KeyboardAvoidingView, Touchable } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, User } from "firebase/auth";
import auth from "../config/firebaseConfig";
import users  from "../config/firebaseConfig";

const image = require("../assets/background_food.jpg");
export default function LoginScreen({navigation}){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {user, setUser} = useState<User>(undefined);

    function loginHandler(){
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            setUser(userCredential.user);
            console.log(user);
    })
    .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    });
    }

    function registerHandler(){
    navigation.navigate('Register');
}

    return(
        <KeyboardAvoidingView style={styles.container}>
            {/* Not needed for now. I don't have any ideas for image */}
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

    },
    image: {
        flex: 1,
        justifyContent: "center"
      },

})