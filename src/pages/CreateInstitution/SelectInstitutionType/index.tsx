import React, { useCallback, useState } from 'react';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import retirementHome from '../../../assets/images/retirement-home.png';
import seniorCenter from '../../../assets/images/senior-center.png';

import NextButton from '../../../components/NextButton';

import {
  Container,
  Title,
  ButtonContainer,
  InstitutionTypeButton,
  InstitutionTypeButtonText,
} from './styles';

const SelectInstitutionType: React.FC = () => {
  const navigation = useNavigation();
  const [retirement_or_center, setRetirementOrCenter] = useState('');

  const handleNextStep = useCallback(() => {
    navigation.navigate('SelectMapPosition', { retirement_or_center });
  }, [navigation, retirement_or_center]);

  return (
    <Container>
      <Title>Selecione o tipo da instituição</Title>
      <ButtonContainer>
        <InstitutionTypeButton
          selected={retirement_or_center === 'retirement'}
          onPress={() => setRetirementOrCenter('retirement')}
        >
          <Image source={retirementHome} />
          <InstitutionTypeButtonText
            selected={retirement_or_center === 'retirement'}
          >
            Casa de repouso
          </InstitutionTypeButtonText>
        </InstitutionTypeButton>
        <InstitutionTypeButton
          selected={retirement_or_center === 'center'}
          onPress={() => setRetirementOrCenter('center')}
        >
          <Image source={seniorCenter} />
          <InstitutionTypeButtonText
            selected={retirement_or_center === 'center'}
          >
            Centro de convivência do idoso
          </InstitutionTypeButtonText>
        </InstitutionTypeButton>
      </ButtonContainer>
      {retirement_or_center !== '' && <NextButton onPress={handleNextStep} />}
    </Container>
  );
};

export default SelectInstitutionType;
