import React, {useState, useEffect,useReducer} from "react"
import Styled from 'styled-components/native';
import Input from "../Component/Input";
import Button from "../Component/Button";
import {fbcolDoc} from "../util/firestore";
import{
  View,
  Image,
  Text
} from "react-native";
import auth from "@react-native-firebase/auth";
import firebase from "@react-native-firebase/app";
import firestore from "@react-native-firebase/firestore"


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

const email_pattern = /[@]/gi;

export function SignUp(props){
  // email 정규식 패턴
  let navigation = props.navigation;
  console.log("navigation",navigation);
  const [bUI, setBUI ] = useState({});

  let [state, dispatch] = useReducer(reducer,initialState);

  //불일치한 PW 상태 Hook
  let [discordanceEmail, setDiscordanceEmail] = useState(false);
  let [discordancePW, setDiscordancePW] = useState(false);
  let [discordanceState, setDiscordanceState] = useState(false);

  useEffect(()=>{
    fbcolDoc('user','basic_user_info')
    .then(documentSnapshot => {
      setBUI(documentSnapshot.data());
    })
  },[])

  const updateState = (type,data) => {
    if(data  == ""){
      data = undefined;
    }
    dispatch({type, data})
  }

  const joinMember = () => {


    if(!(email_pattern.test(state.email))){
      console.log("email_pattern")
      setDiscordanceEmail(true);
      return
    }

    if(!(state.firstPW == state.secondPW) || state.firstPW.length < 6){
      setDiscordancePW(true);
      return;
    }

    if(!(state.email) || !(state.firstPW) || !(state.name) ){
      setDiscordanceState(true);
      return;
    }

    setDiscordanceEmail(false);
    setDiscordancePW(false);
    setDiscordanceState(false);

    firebase.auth().createUserWithEmailAndPassword(state.email,state.firstPW)
    .then((userObj)=> {
      console.log("state")
      firestore()
      .collection('user_profile')
      .doc(userObj.user.uid)
      .set(Object.assign({},bUI,{
        user_nm : state.name,
        user_email : state.email,
        user_img : userObj.photoURL
      }));
      navigation.goBack();
    })
    .catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.message;
      alert("회원가입 에러");
      console.log(errorCode,errorMessage);
    })

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
            marginBottom: 5,
            borderColor: '#89B2E9', 
            borderWidth: 1 
          }}
          placeholder="이메일"
          onChangeText = {updateState.bind(state,"email")}
      />
      {
        discordanceEmail
        ? <Text style={{
          color : 'red',
          marginBottom: 15,
        }}>이메일형식을 다시 확인해주세요.</Text>
        : <View style={{marginBottom: 15,}}/>
      }
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
        ?<>
         <Text style={{
          color : 'red',
          marginBottom: 15,
        }}>비밀번호가 일치하지 않거나 비밀번호가 너무 짧습니다.</Text>
        <Text style={{color : 'red'}}>비밀번호는 6글자 이상입니다.</Text>
        </>
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