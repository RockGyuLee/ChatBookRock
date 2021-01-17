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

export const nowDate = () => {
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
  let {idx, itemList, navigation} = props.extraData;
  console.log("propr",navigation);
  const [title, setTitle] = useState(itemList[idx].book_title);
  const [contents, setContents] = useState(itemList[idx].book_content);
  const [imageUri, setImageUri] = useState(itemList[idx].update_book_uri);

  console.log("title :",title,"contents :",contents);


  const handleGalleryOrCamera = () => {
    launchCamera(imagePickerOption, (data)=>{
      if(data.didCancel){
        return
      }
      let urlLength = imageUri.concat(data.uri).length;
      if(urlLength > 3){
        return alert("3개 이상은 저장할 수 없습니다.");
      }
      setImageUri(imageUri.concat(data.uri))
    });
  }

  const handleUpdate4BookUri = () => {
    let updateUserBookList = itemList[idx];
    let copyAndRemoveItemList = itemList.slice();

    copyAndRemoveItemList.splice(idx,1);
    
    let objAssignBookItem = Object.assign({},updateUserBookList,{
      'book_title' : title,
      'book_content' : contents,
      'update_book_uri' : imageUri
    });
    
    copyAndRemoveItemList.splice(idx,0,objAssignBookItem)
    firestore()
    .collection('user_profile')
    .doc(userObj.uid)
    .update({
      'user_like_book' : copyAndRemoveItemList
    })
    navigation.goBack()
  }

  const handleDelete4BookUri = () => {
    console.log("사진 삭제")
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
        value={title}
        placeholder={`${itemList[idx].book_title}`}
        onChangeText = {title=>setTitle(title)} 
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
        value={contents}
        placeholder="내용을 입력하세요 :)"
        onChangeText = {contents=>setContents(contents)} 
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
        {
          imageUri.map((data, idx) => {
            if(imageUri.length - 1 == idx){
              return (
                <>
                  <TouchableOpacity
                    style={{
                    margin : 5,
                    borderColor : AppColor.color,
                    borderWidth : 2,
                    width : "22.5%",
                    height: 100,
                    }} 
                    onPress={handleDelete4BookUri}
                  >
                    <Image 
                      key={idx}
                      style={{
                        width : "100%",
                        height: "100%",
                      }} 
                      source={{uri:data}}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    key={"camera"}
                    style={{
                      margin : 5,
                      paddingTop : 35,
                      paddingLeft : 35,
                      borderColor : AppColor.color,
                      borderWidth : 2,
                      width : "22.5%",
                      height: 100,
                    }}
                    onPress={handleGalleryOrCamera}
                  >
                    <AntDesign name={"camerao"} size={20} color={AppColor.color}/>
                  </TouchableOpacity>
                </>
              )
            }
            return(
              <TouchableOpacity
                style={{
                margin : 5,
                borderColor : AppColor.color,
                borderWidth : 2,
                width : "22.5%",
                height: 100,
                }} 
              >
                <Image 
                  key={idx}
                  style={{
                    width : "100%",
                    height: "100%",
                    }} 
                  source={{uri:data}}
                />
              </TouchableOpacity>
            )
          })
        }
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
            <Button title={'취소'} onPress={()=>{navigation.goBack()}}/>
          </View>
      </View>
      
      </Container>
  )
}