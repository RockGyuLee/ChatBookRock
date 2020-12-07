import React, {useState, useEffect} from "react";
import {View, Text} from 'react-native';

export function RecordSreen(props){
    //정상적으로 컴포넌트 이동 완료.
    console.log("Record Data", props);
    return (
        <View>
          <Text>{"받아온 데이터를 표시해보자."+props.extraData.book_author}</Text>
        </View>
    )
}