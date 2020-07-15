import React, {useState} from "react"

import{
    TextInput,
    View
} from "react-native"

export function SignUp(){
  return (
    <View style={{ flex: 1,  justifyContent: 'center' }}>
      <TextInput
          placeholder="아이디"
          textAlign={'center'}
      />
      <TextInput
        placeholder="비밀번호"
        textAlign={'center'}
        secureTextEntry={true}
      />
      </View>
  )
    
}