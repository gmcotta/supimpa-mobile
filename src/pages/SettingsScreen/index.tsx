import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { Picker } from '@react-native-community/picker';
import { useNavigation } from '@react-navigation/native';

// type IBGEStateResponse = {
//   sigla: string;
//   nome: string;
// };

// type IBGECityResponse = {
//   nome: string;
// };

// type AppStateProps = {
//   id: number;
//   label: string;
//   value: string;
// };

// type AppCityProps = {
//   id: number;
//   label: string;
//   value: string;
// };

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation();
  // const [countryStates, setCountryStates] = useState<AppStateProps[]>([]);
  // const [selectedCountryState, setSelectedCountryState] = useState<string>('');
  // const [cities, setCities] = useState<AppCityProps[]>();
  // const [selectedCity, setSelectedCity] = useState('');

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

  // useEffect(() => {
  //   axios
  //     .get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
  //     .then(response => {
  //       const stateList = response.data.map(
  //         (item: IBGEStateResponse, index: number) => ({
  //           id: index + 1,
  //           label: item.nome,
  //           value: item.sigla,
  //         }),
  //       );
  //       let orderedStateList = stateList.sort(
  //         (a: AppStateProps, b: AppStateProps) => {
  //           if (a.value > b.value) return 1;
  //           if (a.value < b.value) return -1;
  //           return 0;
  //         },
  //       );
  //       orderedStateList = [
  //         { id: 0, label: 'Selecione um estado', value: '' },
  //         ...orderedStateList,
  //       ];

  //       setCountryStates(orderedStateList);
  //     });
  // }, []);

  return (
    <View>
      {/* <Text>Configurações</Text>
      <Picker
        selectedValue="São Paulo"
        onValueChange={value => setSelectedCountryState(value)}
      >
        {countryStates?.map(countryState => (
          <Picker.Item
            key={countryState.id}
            label={countryState.label}
            value={countryState.value}
          />
        ))}
      </Picker>
      <Text>{selectedCountryState}</Text> */}
      <TouchableOpacity onPress={openPopup}>
        <Text>Redefinir configurações</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;
