import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 40px;
`;

export const CancelIcon = styled.View`
  width: 64px;
  height: 64px;
  border-radius: 16px;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

export const TextSection = styled.View`
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 40px;
  margin-top: 32px;
  text-align: center;
  color: #fff;
  font-family: 'Montserrat_700Bold';
`;

export const Paragraph = styled.Text`
  font-size: 24px;
  color: #fff;
  margin-top: 32px;
  text-align: center;
  font-family: 'Montserrat_600SemiBold';
`;

export const ButtonSection = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const NoButton = styled.TouchableOpacity`
  background-color: transparent;
  border: 3px solid #d6487b;
  padding: 16px 48px;
  border-radius: 8px;
  margin-top: 24px;
`;

export const ButtonText = styled.Text`
  font-size: 16px;
  color: #fff;
  font-family: 'Montserrat_700Bold';
`;

export const YesButton = styled.TouchableOpacity`
  background-color: #d6487b;
  padding: 16px 48px;
  border-radius: 8px;
  margin-top: 24px;
`;
