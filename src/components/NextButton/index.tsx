import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';

import { Container, ButtonText } from './styles';

const NextButton: React.FC<RectButtonProperties> = ({ onPress }) => {
  return (
    <Container onPress={onPress}>
      <ButtonText>Próximo</ButtonText>
    </Container>
  );
};

export default NextButton;
