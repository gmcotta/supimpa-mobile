import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Linking, ScrollView } from 'react-native';
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';

import retirementHome from '../../assets/images/retirement-home.png';
import seniorCenter from '../../assets/images/senior-center.png';

import {
  Loading,
  Container,
  ImagesContainer,
  CustomImage,
  DetailsContainer,
  Title,
  Description,
  MapContainer,
  Map,
  RoutesContainer,
  RoutesText,
  Separator,
  ScheduleContainer,
  ScheduleItemBlue,
  ScheduleTextBlue,
  ScheduleItemGreen,
  ScheduleTextGreen,
  ScheduleItemRed,
  ScheduleTextRed,
  ContactButton,
  ContactButtonText,
} from './styles';
import api from '../../services/api';

type InstitutionDetailsRouteParams = {
  id: number;
};

type InstitutionData = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  retirement_or_center: string;
  about: string;
  phone: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: Array<{
    id: number;
    url: string;
  }>;
};

const InstitutionDetails: React.FC = () => {
  const route = useRoute();
  const params = route.params as InstitutionDetailsRouteParams;

  const [institution, setInstitution] = useState<InstitutionData>();

  const handleOpenGoogleMapRoutes = useCallback(() => {
    if (institution) {
      Linking.openURL(
        `https://maps.google.com/?q=${institution.latitude},${institution.longitude}`,
      );
    }
  }, [institution]);

  const handleOpenWhatsappWeb = useCallback(() => {
    if (institution) {
      const formattedPhone = institution.phone.replace(/[\s-]/g, '');
      Linking.openURL(
        `https://api.whatsapp.com/send?phone=+55${formattedPhone}`,
      );
    }
  }, [institution]);

  useEffect(() => {
    api.get(`institutions/${params.id}`).then(response => {
      setInstitution(response.data);
    });
  }, [params.id]);

  if (!institution) {
    return (
      <Loading>
        <ActivityIndicator size="large" />
      </Loading>
    );
  }

  return (
    <Container>
      <ImagesContainer>
        <ScrollView horizontal pagingEnabled>
          {institution.images.map(image => (
            <CustomImage
              key={image.id}
              source={{
                uri: image.url,
              }}
            />
          ))}
        </ScrollView>
      </ImagesContainer>

      <DetailsContainer>
        <Title>{institution.name}</Title>
        <Description>{institution.about}</Description>

        <MapContainer>
          <Map
            initialRegion={{
              latitude: institution.latitude,
              longitude: institution.longitude,
              latitudeDelta: 0.008,
              longitudeDelta: 0.008,
            }}
            zoomEnabled={false}
            pitchEnabled={false}
            scrollEnabled={false}
            rotateEnabled={false}
            provider={PROVIDER_GOOGLE}
          >
            <Marker
              icon={
                institution.retirement_or_center === 'retirement'
                  ? retirementHome
                  : seniorCenter
              }
              coordinate={{
                latitude: institution.latitude,
                longitude: institution.longitude,
              }}
            />
          </Map>

          <RoutesContainer onPress={handleOpenGoogleMapRoutes}>
            <RoutesText>Ver rotas no Google Maps</RoutesText>
          </RoutesContainer>
        </MapContainer>

        <Separator />

        <Title>Instruções para visita</Title>
        <Description>{institution.instructions}</Description>

        <ScheduleContainer>
          <ScheduleItemBlue>
            <Feather name="clock" size={40} color="#2ab5d1" />
            <ScheduleTextBlue>{`Segunda à Sexta ${institution.opening_hours}`}</ScheduleTextBlue>
          </ScheduleItemBlue>
          {institution.open_on_weekends ? (
            <ScheduleItemGreen>
              <Feather name="info" size={40} color="#39cc83" />
              <ScheduleTextGreen>Atendemos no fim de semana</ScheduleTextGreen>
            </ScheduleItemGreen>
          ) : (
            <ScheduleItemRed>
              <Feather name="info" size={40} color="#ff669d" />
              <ScheduleTextRed>Não atendemos no fim de semana</ScheduleTextRed>
            </ScheduleItemRed>
          )}
        </ScheduleContainer>

        <ContactButton onPress={handleOpenWhatsappWeb}>
          <FontAwesome name="whatsapp" size={24} color="#fff" />
          <ContactButtonText>Entrar em contato</ContactButtonText>
        </ContactButton>
      </DetailsContainer>
    </Container>
  );
};

export default InstitutionDetails;
