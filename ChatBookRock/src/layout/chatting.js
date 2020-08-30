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

import AntDesign from "react-native-vector-icons/dist/AntDesign";
import Entypo from "react-native-vector-icons/dist/Entypo";
import Icon from "react-native-vector-icons/dist/Ionicons";
  
  export function ChattingScreen({navigation}){
    return (
        <View>
          <Text>{"채팅화면입니다."}</Text>
          <View>
          {/* <ProfileIcon/> */}
          <Icon name ="ios-menu" size={30} color="black"/>
          <Entypo name ="facebook" size={30} color="black"/>
          </View>
        </View>
        )
  }