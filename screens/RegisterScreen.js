import { KeyboardAvoidingView, Alert , Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { User } from 'firebase/auth';
import {auth} from '../config/firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import {db} from '../config/firebaseConfig';
import UserInfo from '../models/userInfo';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import styles from '../config/styles';

export default function RegisterScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    
    async function registerHandler(){
      isAdded = true;
        if(email === '' || password == '' || confirmPassword == '' || name == ''|| surname == ''){
          Alert.alert(
            "Empty places",
            'You left some places empty. They are needed to register',
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          )
          isAdded = false;
          return;
        }
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log('User account created & signed in!');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            Alert.alert(
              "Invalid Email",
              'That email address is invalid!',
              [
                { text: "OK", onPress: () => console.log("OK Pressed") }
              ]
            )
            isAdded = false;
          }
      
          if (error.code === 'auth/invalid-email') {
            Alert.alert(
              "Invalid Email",
              'That email address is invalid!',
              [
                { text: "OK", onPress: () => console.log("OK Pressed") }
              ]
            )
            isAdded = false;
          }
          console.error(error);
        });
        let weight = [0, 0, 0, 0, 0];
        const data = {
            name: name,
            surname: surname,
            email:email,
            weight_last_5_days: weight
        }
        if(isAdded){
        const docRef = await addDoc(collection(db, "Users"), data);
          console.log("Document written with ID: ", docRef.id);
      }
    }

    // async function addUserToUsersCollection() {
    //     const data = {
    //         name: name,
    //         surname: surname,
    //         email:email,
    //         weigth: 0
    //     }
    //     const docRef = await addDoc(collection(db, "Users"), data);
    // }
  
    return (
        <KeyboardAvoidingView style={styles.container}>
        <View style={styles.inputContainer}>
            <TextInput
            placeholder="Name"
            value={name}
            onChangeText = {text => setName(text)} 
            style={styles.inputText}
            />
            <TextInput
            placeholder="Surname"
            value={surname}
            onChangeText = {text => setSurname(text)} 
            style={styles.inputText}
            />
            <TextInput
            placeholder="Email"
            value={email}
            onChangeText = {text => setEmail(text)} 
            style={styles.inputText}
            />
            <TextInput
            placeholder="Password"
            value={password}
            onChangeText = {text => setPassword(text)} 
            style={styles.inputText}
            secureTextEntry={true}
            />
            <TextInput
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText = {text => setConfirmPassword(text)} 
            style={styles.inputText}
            secureTextEntry={true}
            />
            <View style={styles.longerButtonContainer}>
                <TouchableOpacity
                onPress={registerHandler}
                >
                    <Text style={styles.buttonText}>Create Account</Text>
                </TouchableOpacity>
            </View>
    </View>
    </KeyboardAvoidingView>
  )
}