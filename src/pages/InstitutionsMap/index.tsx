import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import retirementHome from '../../assets/images/retirement-home.png';
import seniorCenter from '../../assets/images/senior-center.png';

import api from '../../services/api';

import {
  Container,
  Map,
  CalloutContainer,
  CalloutText,
  Footer,
  FooterText,
  CreateInstitutionButton,
} from './styles';

type InstitutionData = {
  id: number;
  name: string;
  retirement_or_center: string;
  latitude: number;
  longitude: number;
};

const InstitutionsMap: React.FC = () => {
  const navigation = useNavigation();

  const [institutions, setInstitutions] = useState<InstitutionData[]>([]);
  const [institutionQuantityText, setInstitutionQuantityText] = useState<
    string
  >('');

  useFocusEffect(
    useCallback(() => {
      api.get('/institutions').then(response => {
        setInstitutions(response.data);
      });
    }, []),
  );

  useEffect(() => {
    if (institutions.length <= 0)
      setInstitutionQuantityText('Nenhuma instituição encontrada');
    if (institutions.length === 1)
      setInstitutionQuantityText('1 instituição encontrada');
    else
      setInstitutionQuantityText(
        `${institutions.length} instituições encontradas`,
      );
  }, [institutions]);

  const handleNavigateToInstitutionDetails = useCallback(
    (id: number) => {
      navigation.navigate('InstitutionDetails', { id });
    },
    [navigation],
  );

  const handleNavigateToSelectMapPosition = useCallback(() => {
    navigation.navigate('SelectMapPosition');
  }, [navigation]);

  return (
    <Container>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Map
        initialRegion={{
          latitude: -23.4439484,
          longitude: -46.5257722,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
        provider={PROVIDER_GOOGLE}
      >
        {institutions.map(institution => (
          <Marker
            key={institution.id}
            icon={
              institution.retirement_or_center === 'retirement'
                ? retirementHome
                : seniorCenter
            }
            coordinate={{
              latitude: institution.latitude,
              longitude: institution.longitude,
            }}
            calloutAnchor={{
              x: 2.8,
              y: 0.9,
            }}
          >
            <Callout
              tooltip
              onPress={() => handleNavigateToInstitutionDetails(institution.id)}
            >
              <CalloutContainer>
                <CalloutText>{institution.name}</CalloutText>
              </CalloutContainer>
            </Callout>
          </Marker>
        ))}
      </Map>
      <Footer>
        <FooterText>{institutionQuantityText}</FooterText>
        <CreateInstitutionButton onPress={handleNavigateToSelectMapPosition}>
          <Feather name="plus" size={20} color="#fff" />
        </CreateInstitutionButton>
      </Footer>
    </Container>
  );
};

export default InstitutionsMap;
