import React, {useState, useEffect,useReducer} from "react"
import Styled from 'styled-components/native';
import Input from "../Component/Input";
import Button from "../Component/Button";
import{
  View,
  Image,
  Text
} from "react-native"

const Container = Styled.SafeAreaView`
  flex: 1;
  background-color: white;
`;

function reducer(state, action){
  switch (action.type) {
    case "email":
      return {
        ...state,
        email : action.data
      };
    case "firstPW" :
      return {
        ...state,
        firstPW : action.data
      };
    case "secondPW" :
      return {
        ...state,
        secondPW : action.data
      };
    case "name" :
      return {
        ...state,
        name : action.data
      };
    default:
      break;
  }
}

const initialState = {
  email : undefined,
  firstPW : "",
  secondPW : "",
  name : undefined
}


export function SignUp(){
  // email 정규식 패턴
  let email_pattern = /[@]/gi;

  let [state, dispatch] = useReducer(reducer,initialState);

  //불일치한 PW 상태 Hook
  let [discordancePW, setDiscordancePW] = useState(false);
  let [discordanceState, setDiscordanceState] = useState(false);

  const updateState = (type,data) => {
    if(data  == ""){
      data = undefined;
    }
    dispatch({type, data})
  }

  const joinMember = () => {

    console.log("email_pattern",email_pattern.test(state.email))

    if(!(state.firstPW == state.secondPW)){
      setDiscordancePW(true);
      return;
    }

    if(!(state.email) || !(state.firstPW) || !(state.name) ){
      setDiscordanceState(true);
    }
    setDiscordancePW(false);
    setDiscordanceState(false);

  }
  return (
    <Container>
      <View style={{
        alignItems : "center",
        justifyContent : "center",
      }}>
        <Image 
          source={require("../../images/ic_launcher_rom.png")}
        />
      </View>
      <Input
          style={{
            marginTop : 20,
            marginBottom: 15,
            borderColor: '#89B2E9', 
            borderWidth: 1 
          }}
          placeholder="이메일"
          onChangeText = {updateState.bind(state,"email")}
      />
      <Input
          style={{
            marginBottom: 15,
            borderColor: '#89B2E9', 
            borderWidth: 1 
          }}
          secureTextEntry={true}
          placeholder="비밀번호"
          onChangeText = {updateState.bind(state,"firstPW")}
      />
      <Input
          style={{
            marginBottom: 5,
            borderColor: '#89B2E9', 
            borderWidth: 1 
          }}
          secureTextEntry={true}
          placeholder="비밀번호 확인"
          onChangeText = {updateState.bind(state,"secondPW")}
      />
      {
        discordancePW 
        ? <Text style={{
          color : 'red',
          marginBottom: 15,
        }}>비밀번호가 일치하지 않습니다. 다시 확인해주세요.</Text>
        :<View style={{marginBottom: 15,}}/>
      }
      <Input
          style={{
            marginBottom: 50,
            borderColor: '#89B2E9', 
            borderWidth: 1 
          }}
          placeholder="이름"
          onChangeText = {updateState.bind(state,"name")}
      />
      <Button
         label="회원가입"
         onPress={joinMember}
      />
      {
        discordanceState
        ? <Text style={{
          marginTop: 10,
          color : 'red',
        }}>항목을 다 입력해주세요.</Text>
        :<></>
      }
    </Container>
  )
}