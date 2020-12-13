import React from 'react';
import Styled from 'styled-components/native';

const Container = Styled.View`
  width: 100%;
  height: ${(props)=> props.height || '40px'};
  padding-left: 16px;
  padding-right: 16px;
  border-radius: 4px;
`;
const InputField = Styled.TextInput`
  flex: 1;
  color: #89B2E9;
`;

interface Props {
  placeholder?: string;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  secureTextEntry?: boolean;
  style?: Object;
  clearMode?: boolean;
  height?: Int16Array;
  onChangeText?: (text: string) => void;
}

const Input = ({
  placeholder,
  keyboardType,
  secureTextEntry,
  style,
  clearMode,
  onChangeText,
  height
}: Props) => {
  return (
    <Container style={style} height={height}>
      <InputField
        editable = {true}
        selectionColor="#FFFFFF"
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType ? keyboardType : 'default'}
        autoCapitalize="none"
        autoCorrect={false}
        allowFontScaling={false}
        placeholderTextColor="#89B2E9"
        placeholder={placeholder}
        multiline={true}
        textAlignVertical= {'top'}
        clearButtonMode={clearMode ? 'while-editing' : 'never'}
        onChangeText={onChangeText}
      />
    </Container>
  );
};

export default Input;
