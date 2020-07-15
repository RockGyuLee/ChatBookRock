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
import {DetailsScreen} from "./src/main/main_layout"

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


function HomeScreen({ navigation }) {
  const [text, setText] = useState('');
  return (
    <View style={{ flex: 1,  justifyContent: 'center' }}>
      <TextInput
          style={styles.textArea}
          placeholder="아이디"
          textAlign={'center'}
      />
      <TextInput
        style = {styles.textArea}
        placeholder="비밀번호"
        textAlign={'center'}
        secureTextEntry={true}
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
          onPress={() => navigation.navigate('Main')}
        />
          <StyledButton
          title="회원가입"
          color = "red"
          onPress={() => navigation.navigate('Details')}
          />
      </View>      
    </View>
  )
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Login/Sign' }}>
        </Stack.Screen>
        <Stack.Screen name="Main" component={DetailsScreen} options={{ title: 'Main' }}/>
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
