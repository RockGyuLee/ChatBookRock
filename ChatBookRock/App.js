/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
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

function HomeScreen() {
  return (
    <View style={ {flex : 1, alignItems : 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
    </View>
  )
}

const Stack = createStackNavigator();

// const App: () => React$Node = () => {
//   const [text, setText] = useState('');
//   return (
//     <>
//       {/* <View style={ styles.container}>
//       <TextInput
//         style={{justifyContent: 'center', alignItems: 'center' , borderColor: 'black', borderWidth: 1, margin : 20}}
//         placeholder="아이디"
//         textAlign={'center'}
//         onChangeText={text => setText(text)}
//         defaultValue={text}
//       />

//       <TextInput
//         style={{justifyContent: 'center', alignItems: 'center' , borderColor: 'black', borderWidth: 1, margin : 20}}
//         placeholder="비밀번호"
//         textAlign={'center'}
//         onChangeText={text => setText(text)}
//         defaultValue={text}
//       />

//       <Button
//         // onPress={onPressLearnMore}
//         title="로그인"
//         color="#841584"
//         accessibilityLabel="Learn more about this purple button"
//       />
      

//       <Text style={{padding: 10, fontSize: 42}}>
//             {text}
//       </Text>
//     </View> */}
//       {/* <StatusBar barStyle="dark-content" />
//       <SafeAreaView>
//         <ScrollView
//           contentInsetAdjustmentBehavior="automatic"
//           style={styles.scrollView}>
//           <Header />
//           {global.HermesInternal == null ? null : (
//             <View style={styles.engine}>
//               <Text style={styles.footer}>Engine: Hermes</Text>
//             </View>
//           )}
//           <View style={styles.body}>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Step One</Text>
//               <Text style={styles.sectionDescription}>
//                 Edit <Text style={styles.highlight}>App.js</Text> to change this
//                 screen and then come back to see your edits.
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>See Your Changes</Text>
//               <Text style={styles.sectionDescription}>
//                 <ReloadInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Debug</Text>
//               <Text style={styles.sectionDescription}>
//                 <DebugInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Learn More</Text>
//               <Text style={styles.sectionDescription}>
//                 Read the docs to discover what to do next:
//               </Text>
//             </View>
//             <LearnMoreLinks />
//           </View>
//         </ScrollView>
//       </SafeAreaView> */}
//     </>
//   );
// };

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}>
        </Stack.Screen>
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
