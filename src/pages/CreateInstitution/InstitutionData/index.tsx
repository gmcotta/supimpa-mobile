import React from 'react';
import { Switch, KeyboardAvoidingView, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';

import {
  Container,
  Title,
  Label,
  CustomInput,
  MultilineCustomInput,
  ImagesInput,
  SwitchContainer,
  NextButton,
  NextButtonText,
} from './styles';

const OrphanageData: React.FC = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
      style={{ flex: 1 }}
    >
      <Container contentContainerStyle={{ padding: 24 }}>
        <Title>Dados</Title>

        <Label>Nome</Label>
        <CustomInput />

        <Label>Sobre</Label>
        <MultilineCustomInput textAlignVertical="top" />

        <Label>Whatsapp</Label>
        <CustomInput />

        <Label>Fotos</Label>
        <ImagesInput onPress={() => {}}>
          <Feather name="plus" size={24} color="#15B6D6" />
        </ImagesInput>

        <Title>Visitação</Title>

        <Label>Instruções</Label>
        <MultilineCustomInput textAlignVertical="top" />

        <Label>Horário de visitas</Label>
        <CustomInput />

        <SwitchContainer>
          <Label>Atende final de semana?</Label>
          <Switch
            thumbColor="#fff"
            trackColor={{ false: '#ccc', true: '#39CC83' }}
          />
        </SwitchContainer>

        <NextButton onPress={() => {}}>
          <NextButtonText>Cadastrar</NextButtonText>
        </NextButton>
      </Container>
    </KeyboardAvoidingView>
  );
};

export default OrphanageData;
