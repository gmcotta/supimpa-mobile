import React, { useCallback } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import retirementHome from '../../assets/images/retirement-home.png';

import {
  Container,
  Map,
  CalloutContainer,
  CalloutText,
  Footer,
  FooterText,
  CreateInstitutionButton,
} from './styles';

const styles = StyleSheet.create({
  footer: {
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      height: 3,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
});

const InstitutionsMap: React.FC = () => {
  const navigation = useNavigation();
  const handleNavigateToInstitutionDetails = useCallback(() => {
    navigation.navigate('InstitutionDetails');
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
        <Marker
          icon={retirementHome}
          coordinate={{
            latitude: -23.4439484,
            longitude: -46.5257722,
          }}
          calloutAnchor={{
            x: 2.2,
            y: 0.8,
          }}
        >
          <Callout tooltip onPress={handleNavigateToInstitutionDetails}>
            <CalloutContainer>
              <CalloutText>Oi</CalloutText>
            </CalloutContainer>
          </Callout>
        </Marker>
      </Map>
      <Footer style={styles.footer}>
        <FooterText>2 instituições encontradas</FooterText>
        <CreateInstitutionButton>
          <Feather name="plus" size={20} color="#fff" />
        </CreateInstitutionButton>
      </Footer>
    </Container>
  );
};

export default InstitutionsMap;
