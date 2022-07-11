import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { collection, getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyDVdiJTE8sR1r01ZoKEdHUvdWSUZMl_ZLo",
  authDomain: "ketoapp-204c8.firebaseapp.com",
  projectId: "ketoapp-204c8",
  storageBucket: "ketoapp-204c8.appspot.com",
  messagingSenderId: "1082564361056",
  appId: "1:1082564361056:web:fa37a4fa56315f19b43c05"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const users = collection(db, 'Users');
export {auth, users, db, app};