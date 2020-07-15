import React, {useState} from "react"
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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
// import {Ionicons} from "@expo/vector-icons";

function ProfileScreen({ navigation }) {
    React.useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        alert('Screen is focused');
        // The screen is focused
        // Call any action
      });
  
      // Return the function to unsubscribe from the event so it gets removed on unmount
      return unsubscribe;
    }, []);
  
    return <View />;
  }
  
  function HomeScreen() {
    return <View />;
  }

const Tab = createBottomTabNavigator();

export function DetailsScreen() {
    return (
        <>
       
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
      </>
    //   <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //     <Text>Details Screen</Text>
    //     <Button
    //       title="Go to Details... again"
    //       onPress={()=>alert("hello")}/>
    //   </View>
    )
  }