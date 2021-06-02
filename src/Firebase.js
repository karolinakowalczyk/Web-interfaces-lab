import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyC0_GqJL2Z6Nv6H6o5B-lFd4GOeV5xiQLQ",
    authDomain: "restaurant-9023e.firebaseapp.com",
    projectId: "restaurant-9023e",
    storageBucket: "restaurant-9023e.appspot.com",
    messagingSenderId: "367776967182",
    appId: "1:367776967182:web:1b2078a4537238e1ebea5f",
    measurementId: "G-37EFCPL3X9"
  };

if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
else {
  firebase.app();
}

export const auth = firebase.auth();

export const firestore = firebase.firestore();

export const getMenu = () => {
  return firestore.collection("menu").get();
}

export const addOrder = (user, pizzaData) => {
  firestore.collection("orders").add({
    owner: user.uid,
    dateCreated: firebase.firestore.FieldValue.serverTimestamp(),
    orderList: pizzaData

  })
}
