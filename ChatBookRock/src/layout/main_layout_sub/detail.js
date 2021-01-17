import React, {useState, useEffect} from "react";
import Styled from 'styled-components/native';
import {View, TouchableOpacity, Text, TextInput, Button, Image} from 'react-native';
import Input from '../../Component/Input';
import {AppColor} from "../../style/stylComp";
import AntDesign from "react-native-vector-icons/dist/AntDesign";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import firebase from "@react-native-firebase/app";

import Carousel from "../../Component/Carousel/index"
import {nowDate} from "./record";

const Container = Styled.SafeAreaView`
  flex: 1;
  background-color: white;
`;


export function DetailScreen(props){
    let {idx, itemList, navigation} = props.extraData;

    let  {
        book_author, 
        book_content,
        book_img,
        book_isbn,
        book_nm,
        book_title
    } = itemList[idx];


    let bookUrl = itemList[idx].book_img;
    let imageUrl = itemList[idx].update_book_uri;


    return (
        <Container>
            <Carousel align={"horizontal"} scrollHeight={260} imageHeight={250} imageUri={[bookUrl].concat(imageUrl)}/>
           {/* <Image
            style={{
                width : "100%",
                height: "45%",
            }} 
            source={{uri:bookUrl}}
           /> */}
           <View style={{
               flexDirection : "row", marginTop : 20, marginLeft : 30
            }}>
                <AntDesign name="calendar" size={25} color={"gray"} />
                <Text style={{marginLeft : 10, color : "gray"}}>{nowDate()} </Text>
                <AntDesign name="user" size={25} color={"gray"} />
                <Text style={{marginLeft : 10, color : "gray"}}>{book_author}</Text>
           </View>

           <Text style={{fontSize : 25, marginTop : 5, marginLeft : 30}}>
               {book_title}
            </Text>

            <Text style={{ marginTop : 5, marginLeft : 30}}>
               {book_content}
            </Text>
           
        </Container>
        )
}