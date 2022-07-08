import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { User } from 'firebase/auth';
import {auth} from '../config/firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import {db} from '../config/firebaseConfig';
import UserInfo from '../models/userInfo';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function RegisterScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    
    async function registerHandler(){
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
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
        const data = {
            name: name,
            surname: surname,
            email:email,
            weigth: 0
        }
        const docRef = await addDoc(collection(db, "Users"), data);
          console.log("Document written with ID: ", docRef.id);
    }

    async function addUserToUsersCollection() {
        const data = {
            name: name,
            surname: surname,
            email:email,
            weigth: 0
        }
        const docRef = await addDoc(collection(db, "Users"), data);
          console.log("Document written with ID: ", docRef.id);
        // setDoc(users, data)
        // .then(() => {
        //     console.log('Document has been added successfully');
        // })
        // .catch(error => {
        //     console.log(error);
        // });
    }
  
    return (
        <KeyboardAvoidingView style={styles.container}>
        <View style={styles.inputContainer}>
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
            <View>
                <TouchableOpacity
                style={styles.buttonContainer}
                onPress={registerHandler}
                >
                    <Text style={styles.buttonText}>Create Account</Text>
                </TouchableOpacity>
            </View>
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
})