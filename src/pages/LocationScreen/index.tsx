import React, { useState, useEffect, useCallback } from 'react';
import { StatusBar, View } from 'react-native';
import { Picker } from '@react-native-community/picker';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';

import {
  Container,
  Title,
  PickerLabel,
  CustomPicker,
  ConfirmButton,
  ButtonText,
} from './styles';

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

const LocationScreen: React.FC = () => {
  const navigation = useNavigation();
  const [countryStates, setCountryStates] = useState<AppStateProps[]>([]);
  const [selectedCountryState, setSelectedCountryState] = useState('');
  const [cities, setCities] = useState<AppStateProps[]>();
  const [selectedCity, setSelectedCity] = useState('');

  const handleFinishOnboarding = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?key=4110b2b9c08743f7ae81570caad8a7e1&q=${selectedCity},%20${selectedCountryState}&pretty=1&limit=1`,
      );
      const { lat, lng } = response.data.results[0].geometry;
      await AsyncStorage.setItem(
        '@SUPIMPA:location',
        JSON.stringify({ latitude: lat, longitude: lng }),
      );
      await AsyncStorage.setItem('@SUPIMPA:onboarding/finished', 'true');
      navigation.navigate('InstitutionsMap');
    } catch (error) {
      alert(error);
    }
  }, [selectedCity, selectedCountryState, navigation]);

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
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#f2f3f5" />
      <Title>Antes de começarmos, por favor, escolha sua localidade</Title>
      <View>
        <PickerLabel>Selecione seu estado</PickerLabel>
        <CustomPicker
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
        </CustomPicker>
        <PickerLabel>Selecione sua cidade</PickerLabel>
        <CustomPicker
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
        </CustomPicker>
      </View>

      {!!selectedCountryState && !!selectedCity && (
        <ConfirmButton onPress={handleFinishOnboarding}>
          <ButtonText>Confirmar localidade</ButtonText>
        </ConfirmButton>
      )}
    </Container>
  );
};

export default LocationScreen;
