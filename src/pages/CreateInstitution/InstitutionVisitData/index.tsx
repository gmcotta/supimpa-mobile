import React, { useCallback, useState } from 'react';
import { Switch, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useInstitutionContext } from '../../../context/createInstitution';

import {
  Container,
  Title,
  Label,
  CustomInput,
  MultilineCustomInput,
  SwitchContainer,
  NextButton,
  NextButtonText,
} from './styles';
import api from '../../../services/api';

const InstitutionVisitData: React.FC = () => {
  const { institution } = useInstitutionContext();

  const navigation = useNavigation();

  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(false);

  const handleCreateOrphanage = useCallback(async () => {
    const data = new FormData();
    data.append('name', institution.name);
    data.append('about', institution.about);
    data.append('retirement_or_center', institution.retirement_or_center);
    data.append('latitude', String(institution.latitude));
    data.append('longitude', String(institution.longitude));
    data.append('phone', institution.phone);
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));
    data.append('accepted', String(false));
    institution.images.forEach((image, index) => {
      data.append('images', {
        name: `image_${index}.jpg`,
        type: 'image/jpg',
        uri: image,
      } as any);
    });

    await api.post('/institutions', data);
    navigation.navigate('InstitutionsMap');
  }, [institution, instructions, opening_hours, open_on_weekends, navigation]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
      style={{ flex: 1 }}
    >
      <Container contentContainerStyle={{ padding: 24 }}>
        <Title>Visitação</Title>

        <Label>Instruções</Label>
        <MultilineCustomInput
          textAlignVertical="top"
          value={instructions}
          onChangeText={setInstructions}
        />

        <Label>Horário de visitas</Label>
        <CustomInput value={opening_hours} onChangeText={setOpeningHours} />

        <SwitchContainer>
          <Label>Atende final de semana?</Label>
          <Switch
            thumbColor="#fff"
            trackColor={{ false: '#ccc', true: '#39cc83' }}
            value={open_on_weekends}
            onValueChange={setOpenOnWeekends}
          />
        </SwitchContainer>

        <NextButton onPress={handleCreateOrphanage}>
          <NextButtonText>Cadastrar</NextButtonText>
        </NextButton>
      </Container>
    </KeyboardAvoidingView>
  );
};

export default InstitutionVisitData;
