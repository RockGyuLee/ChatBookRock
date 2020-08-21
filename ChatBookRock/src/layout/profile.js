import React, {useState, useEffect} from "react"
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TextInput,
    StatusBar,
    Button
  } from 'react-native';
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore"

 export function ProfileScreen({navigation}) {
    const [user, setUser] = useState();
  
    let userObj = auth().currentUser;

    const userDocument =firestore()
    .collection('user')
    .doc('01099185994')
    .get()
    .then(documentSnapshot => {
      console.log('User exists: ', documentSnapshot.exists);
  
      if (documentSnapshot.exists) {
        console.log('User data: ', documentSnapshot.data().user_nm);
        setUser(documentSnapshot.data().user_nm);
      }
    });

    console.log("userDocument",userDocument);
  
    if(userObj != null){
      userObj.providerData.forEach(function(profile){
        console.log("Sign-in provider: " + profile.providerId);
        console.log("  Provider-specific UID: " + profile.uid);
        console.log("  Name: " + profile.displayName);
        console.log("  Email: " + profile.email);
        console.log("  Photo URL: " + profile.photoURL);
      });
    }
    return (
    <View>
      <Text>{user}</Text>
    </View>
    )
  }