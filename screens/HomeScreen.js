import { getAuth } from "firebase/auth";
import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { app, users } from "../config/firebaseConfig";
import { getFirestore } from "firebase/firestore";
import UserInfo from "../models/userInfo";
import { Dimensions } from "react-native";
import {LineChart} from "react-native-chart-kit";

function getUserInfo(){
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [weight_last_5_days, setWeight] = useState([]);
    const auth = getAuth(app); 
    const user = auth.currentUser;
    const db = getFirestore(app);
    const q = query(collection(db, "Users"), where("email", "==", user.email));
    onSnapshot(q, (querySnapshot) => {
    querySnapshot.forEach((doc) => {
        setName(doc.data().name);
        setSurname(doc.data().surname)  
        setWeight(doc.data().weight_last_5_days)
    });
});
let userInfo = new UserInfo(name, surname, user.email, weight_last_5_days);
return userInfo;
}
function presentWeight(weight){
    const data = {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        datasets: [
          {
            data: weight,
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
            strokeWidth: 2 // optional
          }
        ],
        legend: ["Rainy Days"] // optional
      };
      return data;
}
export default function HomeScreen(){
    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
      };
    const screenWidth = Dimensions.get("window").width;
    let user  = getUserInfo();
    const data = presentWeight(user.weight)
    return(
        <View>
           <LineChart
            data={data}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig}
            />
        </View>
    )
}