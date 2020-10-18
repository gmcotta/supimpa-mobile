import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  background-color: #15c3d6;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  height: 56px;
  position: absolute;
  left: 24px;
  right: 24px;
  bottom: 40px;
`;

export const ButtonText = styled.Text`
  font-family: 'Montserrat_800ExtraBold';
  font-size: 16px;
  color: #fff;
`;
