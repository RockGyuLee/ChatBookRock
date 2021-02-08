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
  
  export function ChattingScreen({navigation}){
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