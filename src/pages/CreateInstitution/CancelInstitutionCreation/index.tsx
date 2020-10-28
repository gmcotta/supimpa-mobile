import React, { useCallback } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import {
  Container,
  CancelIcon,
  TextSection,
  Title,
  Paragraph,
  ButtonSection,
  NoButton,
  ButtonText,
  YesButton,
} from './styles';

const CancelInstitutionCreation: React.FC = () => {
  const navigation = useNavigation();

  const handleNavigateToMap = useCallback(() => {
    navigation.navigate('InstitutionsMap');
  }, [navigation]);

  return (
    <Container>
      <CancelIcon>
        <Feather name="x" size={32} color="#ff669d" />
      </CancelIcon>
      <TextSection>
        <Title>Cancelar cadastro</Title>
        <Paragraph>Tem certeza que quer cancelar esse cadastro?</Paragraph>
      </TextSection>
      <ButtonSection>
        <NoButton>
          <ButtonText onPress={navigation.goBack}>Não</ButtonText>
        </NoButton>
        <YesButton>
          <ButtonText onPress={handleNavigateToMap}>Sim</ButtonText>
        </YesButton>
      </ButtonSection>
    </Container>
  );
};

export default CancelInstitutionCreation;
