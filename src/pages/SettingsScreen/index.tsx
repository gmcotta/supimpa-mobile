import React, { useCallback } from 'react';
import { Text, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import { Container, DefaultButton, DefaultButtonText } from './styles';

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleNavigateToLocation = useCallback(() => {
    navigation.navigate('SettingsLocationScreen');
  }, [navigation]);

  const resetSettings = useCallback(async () => {
    await AsyncStorage.clear();
    Alert.alert(
      'Redefinir Configurações',
      'Configurações redefinidas com sucesso.',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('CheckOnboardingStatus'),
        },
      ],
    );
  }, [navigation]);

  const openPopup = useCallback(() => {
    Alert.alert(
      'Redefinir Configurações',
      'Deseja redefinir as configurações do aplicativo?',
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim',
          style: 'default',
          onPress: () => resetSettings(),
        },
      ],
      { cancelable: true },
    );
  }, [resetSettings]);

  return (
    <Container>
      <DefaultButton onPress={handleNavigateToLocation}>
        <Feather name="map-pin" size={20} color="#0089a5" />
        <DefaultButtonText>Redefinir localidade</DefaultButtonText>
      </DefaultButton>
      <DefaultButton onPress={openPopup}>
        <Feather name="x-octagon" size={20} color="#0089a5" />
        <DefaultButtonText>Redefinir configurações</DefaultButtonText>
      </DefaultButton>
    </Container>
  );
};

export default SettingsScreen;
