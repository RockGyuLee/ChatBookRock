import React, {useState, useEffect} from "react";
import Styled from 'styled-components/native';
import {View, TouchableOpacity, Text, TextInput, Button, Image} from 'react-native';
import Input from '../../Component/Input';
import {AppColor} from "../../style/stylComp";
import AntDesign from "react-native-vector-icons/dist/AntDesign";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import firebase from "@react-native-firebase/app";
//이미지 picker library
import {launchCamera, launchImageLibrary} from "react-native-image-picker"

const Container = Styled.SafeAreaView`
  flex: 1;
  background-color: white;
`;

const nowDate = () => {
  let date = new Date().getDate();
  let month = new Date().getMonth()+1;
  let year = new Date().getFullYear();
  return year+' . '+ month + ' . ' + date;
}

const imagePickerOption = {
  title : "사진|앨범",
  mediaType : "photo"
}

export function RecordSreen(props){
  let userObj = auth().currentUser;
  let {idx, itemList} = props.extraData;

  const [imageUri, setImageUri] = useState(itemList[idx].update_book_uri);


  const handleGalleryOrCamera = () => {
    launchCamera(imagePickerOption, (data)=>{
      console.log(data)
      setImageUri([].concat(data.uri))
    });
  }


  const handleUpdate4BookUri = () => {
    let updateUserBookList = itemList[idx];
    let copyAndRemoveItemList = itemList.slice();

    copyAndRemoveItemList.splice(idx,1);
    
    let objAssignBookItem = Object.assign({},updateUserBookList,{update_book_uri : imageUri});
    
    copyAndRemoveItemList.splice(idx,0,objAssignBookItem)
    firestore()
    .collection('user_profile')
    .doc(userObj.uid)
    .update({
      'user_like_book' : copyAndRemoveItemList
    })
  }

  return (
      <Container>
        <Input
        style={{
          marginTop : 30,
          marginBottom: 15,
          borderColor: '#89B2E9', 
          borderWidth: 2 
        }}
        placeholder={`${itemList[idx].book_title}`}
        // onChangeText = {id=>setUserId(id)} 
      />

      <View  style={{flexDirection: "row",marginTop : 15, marginBottom: 15}}>
        <View style={{flex: 0.6,   borderBottomColor: '#FF4001', borderBottomWidth: 1, marginBottom: 7}}/>
        <View style={{flex : 0.3, }}>
          <Text style={{textAlign : 'right', color: '#FF4001'}}>{nowDate()}</Text>
        </View>
      </View>

      <Input
        style={{
          marginTop : 15,
          marginBottom: 10,
          borderColor: '#89B2E9', 
          borderWidth: 2 
        }}
        height={'220px'}
        placeholder="내용을 입력하세요 :)"
      />

      <View  style={{flexDirection: "row",marginTop : 15, marginBottom: 15}}>
        <View style={{flex: 0.6,   borderBottomColor: '#FF4001', borderBottomWidth: 1, marginBottom: 7}}/>
        <View style={{flex : 0.3, }}>
          <Text style={{textAlign : 'right', color: '#FF4001'}}>사진</Text>
        </View>
      </View>

      <View
        style={{
          marginTop : 15,
          marginBottom: 5,
          borderColor : AppColor.color,
          borderWidth : 2,
          height: 150,
          flexDirection: "row",
        }}
      >
        
        <Image 
          style={{
            margin : 5,
            borderColor : AppColor.color,
            borderWidth : 2,
            width : 100,
            height: 100,
            }} 
          source={{uri:imageUri[0]}}/>
        <TouchableOpacity
          style={{
            margin : 5,
            paddingTop : 35,
            paddingLeft : 35,
            borderColor : AppColor.color,
            borderWidth : 2,
            width : 100,
            height: 100,
          }}
          onPress={handleGalleryOrCamera}
        >
          <AntDesign name={"camerao"} size={20} color={AppColor.color}/>
        </TouchableOpacity>
      </View>

      <View 
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width : '100%',
          height : '5%',
        }}>
          <View style={{width : '49%'}}>
            <Button title={'확인'} onPress={handleUpdate4BookUri}/>
          </View>
          <View style={{width : '49%'}}>
            <Button title={'취소'}/>
          </View>
      </View>
      
      </Container>
  )
}