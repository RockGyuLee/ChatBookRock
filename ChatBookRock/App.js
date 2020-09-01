/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {useState,useEffect} from 'react';
import Styled from 'styled-components/native';

import { 
  View, 
  Text,
  TouchableOpacity,
} from "react-native";

import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {DetailsScreen} from "./src/layout/main_layout";
import {SignUp} from "./src/signup/signup"
import auth from "@react-native-firebase/auth"
import Button from './src/Component/Button';
import Input from './src/Component/Input';
import SplashScreen from 'react-native-splash-screen';

import Entypo from "react-native-vector-icons/dist/Entypo";
import { updateIf } from 'typescript';
import {LoginManager,AccessToken} from "react-native-fbsdk"

const Container = Styled.SafeAreaView`
  flex: 1;
  background-color: #a0bdb4;
  align-items: center;
  justify-content: center;
`;

const SignUpButton = Styled.Text`
  width: 100%;
  font-size: 15px;
  color: ${props=> props.color || "#FFFFFF"} ;
`;


const MainText = Styled.Text`
  font-size: 20;
  text-align: center;
  margin: 10px;
  color: red;
`;

const StyledView = Styled.View`
  background-color: papayawhip;
`
const StyledTextInput = Styled.TextInput`
  background-color: papayawhip;
  color: palevioletred;
  justifyContent : center;
  alignItems: center;
  borderColor: black;
  borderWidth: 1;
`

const StyledButton = Styled.Button`
  color: palevioletred;
`
const FormContainer = Styled.View`
  width: 100%;
  padding: 40px;
`;
/*
  소문자로 시작 
  ex ) javascript 
  var a this => global variable 전역변수 
  let b this => local variable 지역변수, 
  const C 상수, 
  
  react component는 대문자로 시작!!!!!
  function Abc () {} => react component
  function bca () {} => javascript function
  
*/

const BrandColor = {
  FaceBook : "#3b5998"
}

function LoginScreen({ navigation }) {

  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  
  useEffect(() => {
    SplashScreen.hide();
  }, []);


  let loginExecute = (puserId, puserPw) => {
    console.log("loginExecute",puserId,puserPw);
    if(puserId == "" || puserPw == "") {
      alert("아이디와 패스워드를 입력해주세요.")
    }else{
      auth()
      .signInWithEmailAndPassword(puserId, puserPw)
      .then(() => {
        console.log("login")
        console.log(navigation.navigate("Main"))
        navigation.navigate('Main')
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
      });
    }
  }

  let handlerFaceLogin = () => {
    onFacebookButtonPress().then(() => {
      console.log("facebook Login")
      navigation.navigate('Main')
    })
  }

  async function onFacebookButtonPress() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
  
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
  
    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();
  
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }
  
    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
  
    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  }

  return (
    <Container>
      <FormContainer>
        <Input
          style={{marginBottom: 16}}
          placeholder="아이디"
          onChangeText = {id=>setUserId(id)} 
        />
        <Input
          style={{marginBottom: 16}}
          placeholder="비밀번호"
          secureTextEntry={true}
          onChangeText = {pw=>setUserPw(pw)}
        />
        <Button
          style={{marginBottom: 24}}
          label="로그인"
          onPress={loginExecute.bind(null, userId,userPw)}
        />
        <TouchableOpacity style={{
          flexDirection : "row",
          backgroundColor : BrandColor.FaceBook,
          alignItems : "center",
          justifyContent : "flex-start",
          height : 40,
          borderRadius : 3
        }}
         onPress={handlerFaceLogin}
        >
          <Entypo 
          name ="facebook" 
          size={25}
          style={{
            paddingLeft:10
          }}
          color="white"/>
          <SignUpButton color={"white"} style={{paddingLeft:20}}>페이스북 아이디로 로그인</SignUpButton>
        </TouchableOpacity>
        {/* <SignUpButton
          onPress={() => navigation.navigate('Sign')}
        >
          비밀번호 재설정
        </SignUpButton> */}
      </FormContainer>
    </Container>
  );
};

const Stack = createStackNavigator();

function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="Home" component={LoginScreen} options={{ title: 'Login/Sign' }}>
        </Stack.Screen>
        <Stack.Screen name="Main" component={DetailsScreen}/>
        <Stack.Screen name="Sign" component={SignUp} options={{ title: '회원가입' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;