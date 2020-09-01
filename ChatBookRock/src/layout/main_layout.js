import React, {useState, useEffect} from "react"
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TextInput,
    StatusBar,
    Button
  } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import auth from "@react-native-firebase/auth";
import {styles} from "../style/stylComp";
import Ionicons from "react-native-vector-icons/dist/Ionicons";
import AntDesign from "react-native-vector-icons/dist/AntDesign";

// begin 화면 import
import {ProfileScreen} from "./profile";
import {ChattingScreen} from "./chatting";
import {CalendarScreen} from "./calendar";
import {AlarmScreen} from "./alarm";
//end 화면 import

const NAVER_CliENT_ID     = "9w8zL8ya88VpwOUOEKfz";
const NAVER_CLIENT_SECRET = "VVcoPpnoo1";

const color = "#800";
const size = 25;

function HomeScreen({navigation}) {

  let [bookList,setBookList] = useState([]);

  useEffect(()=>{
      fetch("https://openapi.naver.com/v1/search/book?query=All&display=10&d_publ=쌤앤파커스",{
      method  :"GET",
      headers :{
        'X-Naver-Client-Id': NAVER_CliENT_ID,
        'X-Naver-Client-Secret': NAVER_CLIENT_SECRET,
        "Content-Type": "application/json; charset=utf-8"
        }
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        let item = myJson;
        console.log(item);
        setBookList(item.items);
      });
  },[]);

  return (
    <View>
      <TextInput
          style={styles.textArea}
          placeholder="검색.."
          textAlign={'left'}
          // onChangeText = {id=>setUserId(id)}
      />
      {bookList.map((item,idx) => {
        {console.log("item",item)}
      return(
        <Text key={idx}>
          {item.author}{item.title}
          </Text>
          ) 
      })}
    </View>
  );
}

const Tab = createBottomTabNavigator();

const Library = <Ionicons name="library" size={size} color={color} />;
const ChatIcon = <Ionicons name="chatbubbles-outline" size={size} color={color}/>;
const ProfileIcon = <AntDesign name="contacts" size={size} color={color} />;
const CalenIcon = <AntDesign name="calendar" size={size} color={color} />;
const AlarmIcon = <AntDesign name="bells" size={size} color={color} />;

export function DetailsScreen() {
 
  return (
        <>
          <Tab.Navigator 
          initialRouteName="Feed"
          tabBarOptions={{ 
            activeTintColor: '#e91e63',
          }}>
            <Tab.Screen name="Home" component={HomeScreen}  options={{
              tabBarLabel : "Home",
              tabBarIcon : () => (Library)
            }}/>
            <Tab.Screen name="Chat" component={ChattingScreen}  options={{
              tabBarLabel : "Chat",
              tabBarIcon : () => (ChatIcon)
            }}/>
            <Tab.Screen name="Profile" component={ProfileScreen}  options={{
              tabBarLabel : "Profile",
              tabBarIcon : () => (ProfileIcon)
            }}/>
            <Tab.Screen name="Calendar" component={CalendarScreen}  options={{
              tabBarLabel : "Profile",
              tabBarIcon : () => (CalenIcon)
            }}/>
            <Tab.Screen name="Alarm" component={AlarmScreen}  options={{
              tabBarLabel : "Profile",
              tabBarIcon : () => (AlarmIcon)
            }}/>
          </Tab.Navigator>
      </>
    )
  }