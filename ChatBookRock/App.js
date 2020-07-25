/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {useState,useEffect} from 'react';
import styled from 'styled-components/native';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  StatusBar,
  Button
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {DetailsScreen} from "./src/main/main_layout";
import {SignUp} from "./src/signup/signup"
import auth from "@react-native-firebase/auth"

const Container = styled.Text`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f5fcff;
`;

const MainText = styled.Text`
  font-size: 20;
  text-align: center;
  margin: 10px;
  color: red;
`;

const StyledView = styled.View`
  background-color: papayawhip;
`
const StyledTextInput = styled.TextInput`
  background-color: papayawhip;
  color: palevioletred;
  justifyContent : center;
  alignItems: center;
  borderColor: black;
  borderWidth: 1;
`

const StyledButton = styled.Button`
  color: palevioletred;
`



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




function LoginScreen({ navigation }) {

  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");

  console.log(userId,userPw);
  

  let loginExecute = (puserId, puserPw) =>{
    console.log(puserId,puserPw);
    auth()
    .signInWithEmailAndPassword(puserId, puserPw)
    .then(() => {
      console.log('User account created & signed in!');
      navigation.navigate('Main')
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }
      alert("정보가 일치하지 않습니다.");
      
    });
  }

  console.log("userId, userPw", userId,userPw);
  return (
    <View style={{ flex: 1,  justifyContent: 'center' }}>
      <TextInput
          style={styles.textArea}
          placeholder="아이디"
          textAlign={'center'}
          onChangeText = {id=>setUserId(id)}
      />
      <TextInput
        style = {styles.textArea}
        placeholder="비밀번호"
        textAlign={'center'}
        secureTextEntry={true}
        onChangeText = {pw=>setUserPw(pw)}
      />
      <View style = {{
        flexDirection : "row",
        alignItems: 'center',
        justifyContent : "center",
        }}>
        <Button
        style = {
          {padding : 100}
        }
          title="로그인"
          onPress={loginExecute.bind(null, userId,userPw)}
        />
          <StyledButton
          title="회원가입"
          color = "red"
          onPress={() => navigation.navigate('Sign')}
          />
      </View>
    </View>
  )
}

const Stack = createStackNavigator();

function App() {

  
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="Home" component={LoginScreen} options={{ title: 'Login/Sign' }}>
        </Stack.Screen>
        <Stack.Screen name="Main" component={DetailsScreen} options={{ title: 'Main' }}/>
        <Stack.Screen name="Sign" component={SignUp} options={{ title: '회원가입' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  textArea : {
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: "#20232a",
    borderRadius: 6,
    backgroundColor: "#FFFFFF",
    color: "#20232a",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold"
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
