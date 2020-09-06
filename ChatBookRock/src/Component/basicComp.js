import React, {useState, useEffect} from "react";
import {
    SafeAreaView,
    ScrollView,
    View,
    TouchableOpacity,
    Text,
    TextInput,
    Image,
    StatusBar,
    Button
} from 'react-native';
import {styles} from "../style/stylComp";


// basic View component 
export function BView({idx, item, onPress}){

    let handlePress = onPress || undefined;

    return (
    <TouchableOpacity key={idx} style={styles.imageView} onPress={handlePress}>
        <Image source={{
        uri: item.image
        }} style={{ width: "30%", height: "95%", 
        margin : 3 ,borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10 }}></Image>
        <Text key={idx} style = {{width : "65%", height: "95%", marginLeft : 5}}>
        {item.author}{item.title}
        </Text>
    </TouchableOpacity>
    )
}