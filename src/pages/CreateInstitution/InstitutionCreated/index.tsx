import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';

import eldersPartying from '../../../assets/images/elders-partying.png';

import {
  Container,
  ScreenImage,
  TextSection,
  Title,
  Paragraph,
  OKButton,
  OKButtonText,
} from './styled';

const InstitutionCreated: React.FC = () => {
  const navigation = useNavigation();

  const handleNavigateToMap = useCallback(() => {
    navigation.navigate('InstitutionsMap');
  }, [navigation]);

  return (
    <Container>
      <ScreenImage source={eldersPartying} />
      <TextSection>
        <Title>Ebaaa!</Title>
        <Paragraph>
          O cadastro deu certo e foi enviado ao administrador para ser aprovado.
          Agora é só esperar :)
        </Paragraph>
      </TextSection>
      <OKButton onPress={handleNavigateToMap}>
        <OKButtonText>Ok</OKButtonText>
      </OKButton>
    </Container>
  );
};

export default InstitutionCreated;
