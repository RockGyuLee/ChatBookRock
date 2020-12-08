import React, {useState, useEffect} from "react";
import Styled from 'styled-components/native';
import {View, SafeAreaView, Text, TextInput} from 'react-native';
import Input from '../../Component/Input';

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
            marginTop : 70,
            marginBottom: 15,
            borderColor: '#89B2E9', 
            borderWidth: 2 
          }}
          placeholder="제목.."
          // onChangeText = {id=>setUserId(id)} 
        />

        <View  style={{flexDirection: "row",marginTop : 15, marginBottom: 15}}>
          <View style={{flex: 0.6,   borderBottomColor: 'black', borderBottomWidth: 1, marginBottom: 7}}/>
          <View style={{flex : 0.3, }}>
           <Text style={{textAlign : 'right'}}>{nowDate()}</Text>
          </View>
        </View>

        <Input
          style={{
            marginTop : 15,
            marginBottom: 16,
            borderColor: '#89B2E9', 
            borderWidth: 2 
          }}
          height={'220px'}
          placeholder="내용을 입력하세요 :)"
          // onChangeText = {id=>setUserId(id)} 
        />
        
        </Container>
    )
}