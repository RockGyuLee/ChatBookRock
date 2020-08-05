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
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Ionicons from "react-native-vector-icons/dist/Ionicons";
import AntDesign from "react-native-vector-icons/dist/AntDesign";

// begin 화면 import
import {ProfileScreen} from "./profile";
import {ChattingScreen} from "./chatting";
import {CalendarScreen} from "./calendar";
import {AlarmScreen} from "./alarm";
const NAVER_CliENT_ID     = "9w8zL8ya88VpwOUOEKfz";
const NAVER_CLIENT_SECRET = "VVcoPpnoo1";

const option = {
  query  :'꽃', //이미지 검색 텍스트
  start  :1, //검색 시작 위치
  display:3, //가져올 이미지 갯수
  sort   :'sim', //정렬 유형 (sim:유사도)
  filter :'small' //이미지 사이즈
}


const color = "#800";
const size = 25;

function HomeScreen( {navigation}) {
  // const [initializing, setInitializing] = useState(true);
  
  // fetch('https://reactnative.dev/movies.json')
  //   .then((response) => response.json())
  //   .then((json) => {
  //     return json.movies;
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });
  console.log("NAVER_CliENT_ID",NAVER_CliENT_ID);
  console.log("NAVER_CLIENT_SECRET",NAVER_CLIENT_SECRET);

  fetch("https://openapi.naver.com/v1/search/book?query=에너지버스&display=10",{
    method  :"GET",
    headers :{
      'X-Naver-Client-Id': NAVER_CliENT_ID,
      'X-Naver-Client-Secret': NAVER_CLIENT_SECRET,
      'Content-type': 'application/json'
    }
  })
  .then(res => {
    console.log("res.json()",res.json());
    res.json()
  })
  .catch(function(err){
    console.log("error",err);
  })

  // })
  // Handle user state changes
  // function onAuthStateChanged(user) {
  //   setUser(user);
  //   if (initializing) setInitializing(false);
  // }
  // console.log("user",user);
  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber; // unsubscribe on unmount
  // }, []);

  // if (initializing) return null;

  // if (!userObj) {
  //   return (
  //     <View>
  //       <Text>Login</Text>
  //     </View>
  //   );
  // }

  return (
    <View>
      <TextInput
          style={styles.textArea}
          placeholder="검색.."
          textAlign={'left'}
          // onChangeText = {id=>setUserId(id)}
      />
    </View>
  );
}

const Tab = createBottomTabNavigator();

export function DetailsScreen() {
  const Library = <Ionicons name="library" size={size} color={color} />;
  const ChatIcon = <Ionicons name="chatbubbles-outline" size={size} color={color}/>;
  const ProfileIcon = <AntDesign name="contacts" size={size} color={color} />;
  const CalenIcon = <AntDesign name="calendar" size={size} color={color} />;
  const AlarmIcon = <AntDesign name="bells" size={size} color={color} />;
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
    //   <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //     <Text>Details Screen</Text>
    //     <Button
    //       title="Go to Details... again"
    //       onPress={()=>alert("test")}/>
    //   </View>
    )
  }