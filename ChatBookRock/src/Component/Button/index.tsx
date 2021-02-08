import React from 'react';
import Styled from 'styled-components/native';

const StyleButton = Styled.TouchableOpacity`
  width: 100%;
  height: 40px;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  border: 1px;
  border-color: #89B2E9;
  backgroundColor : #89B2E9;
  back
`;
const Label = Styled.Text`
  color: white;
`;

interface Props {
  label: string;
  style?: Object;
  onPress?: () => void;
}

const Button = ({label, style, onPress}: Props) => {
  return (
    <StyleButton style={style} onPress={onPress}>
      <Label>{label}</Label>
    </StyleButton>
  );
};

export default Button;
