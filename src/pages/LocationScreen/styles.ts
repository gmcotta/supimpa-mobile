import styled from 'styled-components/native';
import { Picker } from '@react-native-community/picker';

export const Container = styled.SafeAreaView`
  flex: 1;
  margin: 32px;
  margin-top: 80px;
`;

export const Title = styled.Text`
  font-family: 'Montserrat_700Bold';
  font-size: 24px;
  text-align: center;
  color: #0089a5;
  margin-bottom: 48px;
`;

export const PickerLabel = styled.Text`
  font-family: 'Montserrat_700Bold';
  font-size: 16px;
  color: #0089a5;
  margin-top: 16px;
`;

export const CustomPicker = styled(Picker)``;

export const ConfirmButton = styled.TouchableOpacity`
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
