import React, {useState, useEffect} from "react"
import {
    SafeAreaView,
    ScrollView,
    View,
    TouchableOpacity,
    Text,
    TextInput,
    Image,
    StatusBar,
    Button
  } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import auth from "@react-native-firebase/auth";
import {styles} from "../style/stylComp";
import Ionicons from "react-native-vector-icons/dist/Ionicons";
import AntDesign from "react-native-vector-icons/dist/AntDesign";
import { BView } from "../Component/basicComp";

import {userObj, fbcolDoc} from "../util/firestore"

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

const Library = <Ionicons name="library" size={size} color={color} />;
const ChatIcon = <Ionicons name="chatbubbles-outline" size={size} color={color}/>;
const ProfileIcon = <AntDesign name="contacts" size={size} color={color} />;
const CalenIcon = <AntDesign name="calendar" size={size} color={color} />;
const AlarmIcon = <AntDesign name="bells" size={size} color={color} />;

function SearchSreen() {

  let [bookNm, setBookNm] = useState(null);

  let[ searchBookList, setSearchBookList] = useState([]);

  let searchHandle = (pBookNm) => {
    // console.log("pbookNm",pBookNm);
    let url = `https://openapi.naver.com/v1/search/book?query=${pBookNm}&display=10`
    fetch(url,{
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
        setSearchBookList(item.items);
      });
  }

  let handleInsert = (item) => {
    alert(item.title);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style ={styles.searchTextInput}>
      <TextInput
          style={{width : "90%"}}
          placeholder="책 제목을 입력해주세요."
          textAlign={'left'}
          onChangeText = {nm=>setBookNm(nm)}
      />
      <Ionicons name="md-search-outline" size={size} color={styles.appColor.color} onPress={searchHandle.bind(null,bookNm)}/>
      </View>
      <ScrollView style={styles.scrollView}>
      {searchBookList.map((item,idx) => {
        return(
          <BView key={idx} idx={idx} item={item} onPress={handleInsert.bind(null, item)}/>
          )
        })
      }
    </ScrollView>
    </SafeAreaView>
  );
}

function BookSearchComp(props){
  let styleObj = Object.assign({},styles.panelView,{
    justifyContent: "center",alignItems: "center"});
  let navigation = props.navigation;

  
  return (
      <TouchableOpacity style={styleObj} onPress={()=> navigation.navigate('search')}>
          <View style={{
            flexDirection : "row",
            justifyContent: "center",
            alignItems: "center",
            }}>
            <Ionicons name="md-search-outline"  size={size} color={styles.appColor.color} />
          <Text style = {{
              color : styles.appColor.color
          }} >등록된 책이 없습니다.</Text>
          </View>
          
      </TouchableOpacity>
  )
}

function HomeScreen({navigation}) {

  let [bookList,setBookList] = useState([]);

  useEffect(()=>{
    fbcolDoc('user_profile',userObj.uid)
    .then(documentSnapshot => {
      // console.log("test", documentSnapshot.data().user_like_book)
      setBookList(documentSnapshot.data().user_like_book)
    })
  },[]);

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView style={styles.scrollView}>
      {bookList.length == 0 
        ? <BookSearchComp navigation={navigation}/>
        : bookList.map((item, idx)=>{

        })}
    </ScrollView>
    </SafeAreaView>
  );
}

const HomeStack = createStackNavigator();

function HomeLayout(){
  return (
      <HomeStack.Navigator>
        <HomeStack.Screen name ="Main" component = {HomeScreen} ></HomeStack.Screen>
        <HomeStack.Screen name="search" component={SearchSreen} options={{header:{visible:false}}} />
    </HomeStack.Navigator>
  )
}

const Tab = createBottomTabNavigator();

export function DetailsScreen() {
 
  return (
        <>
          <Tab.Navigator 
          initialRouteName="Feed"
          tabBarOptions={{ 
            activeTintColor: '#e91e63',
          }}>
            <Tab.Screen name="Home" component={HomeLayout}  options={{
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