import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';

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
    <View>
      <Text>Configurações</Text>
      <TouchableOpacity onPress={handleNavigateToLocation}>
        <Text>Redefinir localidade</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={openPopup}>
        <Text>Redefinir configurações</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;
