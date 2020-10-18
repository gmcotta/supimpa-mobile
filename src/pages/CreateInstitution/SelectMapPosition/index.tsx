import React, { useCallback, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MapEvent, Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import retirementHome from '../../../assets/images/retirement-home.png';
import seniorCenter from '../../../assets/images/senior-center.png';

import { Container, Map, NextButton, NextButtonText } from './styles';

type SelectMapPositionRouteParams = {
  retirement_or_center: string;
};

const SelectMapPosition: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const params = route.params as SelectMapPositionRouteParams;

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  const handleNextStep = useCallback(() => {
    navigation.navigate('InstitutionData', { position });
  }, [navigation, position]);

  const handleSelectMapPosition = useCallback((event: MapEvent) => {
    setPosition(event.nativeEvent.coordinate);
  }, []);

  return (
    <Container>
      <Map
        initialRegion={{
          latitude: -23.4439484,
          longitude: -46.5258909,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
        provider={PROVIDER_GOOGLE}
        onPress={handleSelectMapPosition}
      >
        {position.latitude !== 0 && (
          <Marker
            icon={
              params.retirement_or_center === 'retirement'
                ? retirementHome
                : seniorCenter
            }
            coordinate={{
              latitude: position.latitude,
              longitude: position.longitude,
            }}
          />
        )}
      </Map>

      {position.latitude !== 0 && (
        <NextButton onPress={handleNextStep}>
          <NextButtonText>Próximo</NextButtonText>
        </NextButton>
      )}
    </Container>
  );
};

export default SelectMapPosition;
