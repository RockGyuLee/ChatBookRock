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
import { BView, MView } from "../Component/basicComp";
import { fbcolDoc} from "../util/firestore"
import firestore from "@react-native-firebase/firestore"
import firebase from "@react-native-firebase/app";

//secret
import {NAVER_CliENT_ID, NAVER_CLIENT_SECRET} from "../secret";

// begin 화면 import
import {ProfileScreen} from "./profile";
import {ChattingScreen} from "./chatting";
import {CalendarScreen} from "./calendar";
import {AlarmScreen} from "./alarm";
import {RecordSreen} from "./main_layout_sub/record"
//end 화면 import

const color = "#800";
const size = 25;

const Library = <Ionicons name="library" size={size} color={color} />;
const ChatIcon = <Ionicons name="chatbubbles-outline" size={size} color={color}/>;
const ProfileIcon = <AntDesign name="contacts" size={size} color={color} />;
const CalenIcon = <AntDesign name="calendar" size={size} color={color} />;
const AlarmIcon = <AntDesign name="bells" size={size} color={color} />;

function SearchSreen() {

  let userObj = auth().currentUser;

  let [bookNm, setBookNm] = useState(null);
  let [searchBookList, setSearchBookList] = useState([]);
  //bookInfo
  let [bI, setBI] = useState({});

  useEffect(()=>{
    fbcolDoc('user','book_info')
    .then(documentSnapshot => {
      setBI(documentSnapshot.data());
    })
  },[])

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
        setSearchBookList(item.items);
      });
  }

  let handleInsert = (items,state,setState) => {
    setState(!state);
    
    //좋아요 버튼 초기값이 false 값인게 맞다면
    // false => true
    if(!state){
      let book = Object.assign(bI,{
          book_author : items.author,
          book_img : items.image,
          book_isbn : items.isbn,
          book_nm : items.title,
        })
      firestore()
      .collection('user_profile')
      .doc(userObj.uid)
      .update({
        'user_like_book' : firebase.firestore.FieldValue.arrayUnion(book)
        })
      .then(() => {
        alert("저장되었습니다.")
      });
    }
    //
    // true => false
    else{
      fbcolDoc('user_profile',userObj.uid)
      .then(documentSnapshot => {
        let likeBookList = documentSnapshot.data().user_like_book;
        let findBookIndex =  likeBookList.findIndex(data => {
          return data.book_isbn == items.isbn;
        });
        likeBookList.splice(findBookIndex,1);
        firestore().collection('user_profile').doc(userObj.uid)
        .update({'user_like_book' :likeBookList})
      });
    }
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
          }} >{props.text}</Text>
          </View>
          
      </TouchableOpacity>
  )
}

function onError(error) {
  console.error(error);
}

function HomeScreen({navigation, ...props}) {

  let userObj = auth().currentUser;

  let [bookList,setBookList] = useState([]);

  useEffect(()=>{
    let mounted = true;
     firestore()
    .collection('user_profile').doc(userObj.uid)
    .onSnapshot((QuerySnapshot)=>{
      if(mounted){
        setBookList(QuerySnapshot.data().user_like_book)
      }
    },onError);
    return ()=> {mounted = false}
  },[userObj.uid])


  const handleDelete = (items) => {
    let checkBookIndex = bookList.findIndex( (v) =>  v.book_isbn == items.book_isbn);
    let removeBookList = bookList;
    removeBookList.splice(checkBookIndex,1);
    firestore()
    .collection('user_profile')
    .doc(userObj.uid)
    .update({
      'user_like_book' :removeBookList
    })
    .then((res) => {
      setBookList(removeBookList);
      alert("삭제했습니다..")
    });
  }

  const handleRecord = (idx, itemList) => {
    let propData = {
      idx,
      itemList
    };

    //click한 책 정보를 찾아온다.
    props.extraData(propData);
    //화면 정상적으로 넘어감.
    //record Component 생성 후 화면 이동.
    navigation.navigate('record');
  }
  return (
    <SafeAreaView key = {"scrollSuper"} style={styles.container}>
      <ScrollView key = {"scroll"} style={styles.scrollView}>
        {bookList.length == 0 
          ? <BookSearchComp key={"Search"} text = {'등록된 책이 없습니다.'} navigation={navigation}/>
          : bookList.map((item, idx)=>{
            if(bookList.length - 1 == idx) {
              return (
                <>
                  <MView key={idx+item.book_isbn} idx={idx} itemList={bookList} item={item} onRecordPress={handleRecord.bind(null,idx)} onDeletePress={handleDelete.bind(null, item)}/>
                  <BookSearchComp key={idx+"Search"} idx={idx+1} text = {'책을 추가합니다.'} navigation={navigation}/>
                </>
              )
            }
            return(
              <MView key={idx+item.book_isbn} idx={idx} itemList={bookList} item={item} onRecordPress={handleRecord.bind(null,idx)} onDeletePress={handleDelete.bind(null, item)}/>
            )
          })
        }
      </ScrollView>
    </SafeAreaView>
  );
}

const HomeStack = createStackNavigator();

function HomeLayout(props){
  //처음 render 될 때는 책정보가 undefined
  const [selectedBookInfo, setSelectedBookInfo] = useState(undefined);

  // 상단부 Layout에서 state를 Main컴포넌트 props로 보낸다.

  const handleUpdate4BookInfo = (evt) => {
    setSelectedBookInfo(evt);
    //책정보를 업데이트한다.
  }

  return (
      <HomeStack.Navigator>
        <HomeStack.Screen name ="Main">
          {props => <HomeScreen key={"1"} {...props} extraData={handleUpdate4BookInfo}/>}
        </HomeStack.Screen>
        <HomeStack.Screen name="search" component={SearchSreen} options={{header:{visible:false}}} />
        <HomeStack.Screen name="record"  options={{header:{visible:false}}} >
          {props => <RecordSreen key={"1-1"} extraData={selectedBookInfo}/>}
        </HomeStack.Screen>
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