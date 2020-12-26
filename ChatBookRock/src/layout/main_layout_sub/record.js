import React, {useState, useEffect} from "react";
import Styled from 'styled-components/native';
import {View, SafeAreaView, Text, TextInput, Button} from 'react-native';
import Input from '../../Component/Input';
import {AppColor} from "../../style/stylComp";

const Container = Styled.SafeAreaView`
  flex: 1;
  background-color: white;
`;

const nowDate = () => {
  let date = new Date().getDate();
  let month = new Date().getMonth()+1;
  let year = new Date().getFullYear();
  console.log(date,month,year)
  return year+' . '+ month + ' . ' + date;
}

export function RecordSreen(props){
    //정상적으로 컴포넌트 이동 완료.
    console.log("Record Data", props.extraData.book_author, new Date);
    console.log(nowDate());
    return (
        <Container>
          <Input
          style={{
            marginTop : 30,
            marginBottom: 15,
            borderColor: '#89B2E9', 
            borderWidth: 2 
          }}
          placeholder="제목.."
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
          }}
        />

        <View 
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width : '100%',
            height : '5%',
          }}>
            <View style={{width : '49%'}}>
              <Button title={'확인'} onPress={()=>{console.log("hello")}}/>
            </View>
            <View style={{width : '49%'}}>
              <Button title={'취소'}/>
            </View>
        </View>
        
        </Container>
    )
}