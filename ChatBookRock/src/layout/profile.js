import React, {useState, useEffect} from "react"
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TextInput,
    StatusBar,
    Button,
    Image
  } from 'react-native';
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore"

 export function ProfileScreen({navigation}) {

    const [user, setUser] = useState();
  
    let userObj = auth().currentUser;

    console.log("userObj",userObj)

    const userDocument =firestore()
    .collection('user_profile')
    .doc(userObj.uid)
    .get()
    .then(documentSnapshot => {
      console.log('User exists: ', documentSnapshot.exists);
  
      if (documentSnapshot.exists) {
        console.log('User data: ', documentSnapshot.data().user_nm);
        setUser(documentSnapshot.data().user_nm);
      }
    });

    console.log("userDocument",userDocument);
  
    return (
      <View style={{
        width : "100%",
        height : "100%",
        alignItems : "center",
        justifyContent : "center"
    }}>
        <Image 
          source={require("../../images/ic_develop.png")}
        />
    </View>
    )
  }