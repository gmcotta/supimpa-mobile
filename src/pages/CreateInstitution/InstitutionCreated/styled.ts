import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 48px;
`;

export const ScreenImage = styled.Image`
  width: 100%;
  height: 240px;
  resize-mode: contain;
`;

export const TextSection = styled.View`
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 40px;
  color: #fff;
  font-family: 'Montserrat_700Bold';
`;

export const Paragraph = styled.Text`
  font-size: 24px;
  color: #fff;
  margin-top: 16px;
  text-align: center;
  font-family: 'Montserrat_600SemiBold';
`;

export const OKButton = styled.TouchableOpacity`
  background-color: #19c06d;
  color: #fff;
  padding: 16px 48px;
  border-radius: 8px;
  margin-top: 24px;
`;

export const OKButtonText = styled.Text`
  font-size: 16px;
  color: #fff;
  font-family: 'Montserrat_700Bold';
`;
