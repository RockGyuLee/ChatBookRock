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
import {styles, AppColor} from "../style/stylComp";
import AntDesign from "react-native-vector-icons/dist/AntDesign";
import Feather from "react-native-vector-icons/dist/Feather";
import SimpleLineIcons from "react-native-vector-icons/dist/SimpleLineIcons";

const size = 25;
// basic View component 
export function BView({idx, item, onPress}){

    let [clickable, setClickAble] = useState(false);
    let handlePress = onPress;

    return (
    <TouchableOpacity key={idx} style={styles.imageView} onPress={handlePress.bind(null,clickable,setClickAble)}>
        <Image source={{
        uri: item.image
        }} style={{ width: "30%", height: "95%", 
        margin : 3 ,borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10 }}></Image>
        <View style={{ flexDirection: "column", width : "65%", height: "80%",  marginLeft : 5}}>
            <View style={{ flexDirection: "column", width : "100%", height: "25%", alignItems : "flex-end"}}>
                {clickable 
                ? <AntDesign name="heart" size={size} color={AppColor.like} />
                :<AntDesign name="hearto" size={size} color={AppColor.unlike} />}
            </View>
            <View style={{ flexDirection: "column", width : "100%", height: "20%"}}>
                <Text key={idx}>
                {item.author}{item.title}
                </Text>
            </View>
        </View>
    </TouchableOpacity>
    )
}


export function MView({idx, item, onDeletePress, onRecordPress}){

    let [clickable, setClickAble] = useState(false);
    let handleDeletePress = onDeletePress;

    return (
    <View key={idx} style={styles.imageView}>
        <Image source={{
        uri: item.book_img
        }} style={{ width: "30%", height: "95%", 
        margin : 3 ,borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10 }}></Image>
        <View style={{ flexDirection: "column", width : "65%", height: "80%",  marginLeft : 5}}>
            <View style = {{flexDirection: "row-reverse"}}>
                <TouchableOpacity style={{ width : size }} onPress={onDeletePress.bind(null,clickable,setClickAble)}>
                    <Feather name="x-circle" size={size} color={AppColor.unlike} />
                </TouchableOpacity>
                <TouchableOpacity style={{ width : size , marginRight : 15}} onPress={onRecordPress.bind(null,item)}>
                    <SimpleLineIcons name="pencil" size={size} color={AppColor.unlike} />
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "column", width : "100%", height: "20%"}}>
                <Text>
                {item.book_author}{item.book_nm}
                </Text>
            </View>
        </View>
    </View>
    )
}