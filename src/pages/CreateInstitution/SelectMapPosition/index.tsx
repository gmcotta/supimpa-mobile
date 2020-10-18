import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import mapMarkerImg from '../../../assets/images/grandma.png';

import { Container, Map, NextButton, NextButtonText } from './styles';

const SelectMapPosition: React.FC = () => {
  const navigation = useNavigation();

  function handleNextStep() {
    navigation.navigate('InstitutionData');
  }

  return (
    <Container>
      <Map
        initialRegion={{
          latitude: -27.2092052,
          longitude: -49.6401092,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
        provider={PROVIDER_GOOGLE}
      >
        <Marker
          icon={mapMarkerImg}
          coordinate={{ latitude: -27.2092052, longitude: -49.6401092 }}
        />
      </Map>

      <NextButton onPress={handleNextStep}>
        <NextButtonText>Próximo</NextButtonText>
      </NextButton>
    </Container>
  );
};

export default SelectMapPosition;
