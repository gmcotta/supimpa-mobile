import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { Picker } from '@react-native-community/picker';
import { useNavigation } from '@react-navigation/native';

type IBGEStateResponse = {
  sigla: string;
  nome: string;
};

type IBGECityResponse = {
  nome: string;
};

type AppStateProps = {
  label: string;
  value: string;
};

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation();
  const [countryStates, setCountryStates] = useState<AppStateProps[]>([]);
  const [selectedCountryState, setSelectedCountryState] = useState('');
  const [cities, setCities] = useState<AppStateProps[]>();
  const [selectedCity, setSelectedCity] = useState('');

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

  useEffect(() => {
    axios
      .get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then(response => {
        const stateList = response.data.map((item: IBGEStateResponse) => ({
          label: item.nome,
          value: item.sigla,
        }));
        let orderedStateList = stateList.sort(
          (a: AppStateProps, b: AppStateProps) => {
            if (a.value > b.value) return 1;
            if (a.value < b.value) return -1;
            return 0;
          },
        );
        orderedStateList = [
          { label: 'Selecione um estado', value: '' },
          ...orderedStateList,
        ];

        setCountryStates(orderedStateList);
      });
  }, []);

  useEffect(() => {
    setCities([]);
    setSelectedCity('');

    axios
      .get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedCountryState}/municipios`,
      )
      .then(response => {
        const cityList = response.data.map((item: IBGECityResponse) => ({
          label: item.nome,
          value: item.nome,
        }));
        let orderedCityList = cityList.sort(
          (a: AppStateProps, b: AppStateProps) => {
            if (a.value > b.value) return 1;
            if (a.value < b.value) return -1;
            return 0;
          },
        );
        orderedCityList = [
          { label: 'Selecione uma cidade', value: '' },
          ...orderedCityList,
        ];
        setCities(orderedCityList);
      });
  }, [selectedCountryState]);

  return (
    <View>
      <Text>Configurações</Text>
      <Text>Selecione seu estado</Text>
      <Picker
        selectedValue={selectedCountryState}
        onValueChange={value => setSelectedCountryState(value)}
      >
        {countryStates.map(state => (
          <Picker.Item
            key={state.value}
            label={state.label}
            value={state.value}
          />
        ))}
      </Picker>
      <Text>Selecione sua cidade</Text>
      <Picker
        selectedValue={selectedCity}
        onValueChange={value => setSelectedCity(value)}
      >
        {cities?.map(state => (
          <Picker.Item
            key={state.value}
            label={state.label}
            value={state.value}
          />
        ))}
      </Picker>
      <TouchableOpacity onPress={openPopup}>
        <Text>Redefinir configurações</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;
