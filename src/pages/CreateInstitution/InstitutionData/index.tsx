import React, { useCallback, useState } from 'react';
import { Switch, KeyboardAvoidingView, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

import {
  Container,
  Title,
  Label,
  CustomInput,
  MultilineCustomInput,
  ImagesInput,
  SwitchContainer,
  NextButton,
  NextButtonText,
  UploadedImagesContainer,
  UploadedImage,
} from './styles';
import api from '../../../services/api';

type InstitutionDataRouteParams = {
  position: {
    latitude: number;
    longitude: number;
  };
};

const InstitutionData: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as InstitutionDataRouteParams;

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [phone, setPhone] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const handlePhoneChange = useCallback(value => {
    const maskedPhone = value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1 $2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
      .replace(/(-\d{4})\d+?$/, '$1');
    setPhone(maskedPhone);
  }, []);

  const handleSelectImage = useCallback(async () => {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();

    if (status !== 'granted') {
      alert('Precisamos do acesso às suas fotos para terminar o cadastro.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    if (result.cancelled) {
      return;
    }

    const { uri: image } = result;
    setImages([...images, image]);
  }, [images]);

  const handleCreateOrphanage = useCallback(async () => {
    const { latitude, longitude } = params.position;

    const data = new FormData();
    data.append('name', name);
    data.append('about', about);
    data.append('retirement_or_center', 'retirement');
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('phone', phone);
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));
    images.forEach((image, index) => {
      data.append('images', {
        name: `image_${index}.jpg`,
        type: 'image/jpg',
        uri: image,
      } as any);
    });

    await api.post('/institutions', data);
    navigation.navigate('InstitutionsMap');
  }, [
    params,
    name,
    about,
    instructions,
    opening_hours,
    open_on_weekends,
    images,
    navigation,
  ]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
      style={{ flex: 1 }}
    >
      <Container contentContainerStyle={{ padding: 24 }}>
        <Title>Dados</Title>

        <Label>Nome</Label>
        <CustomInput value={name} onChangeText={setName} />

        <Label>Sobre</Label>
        <MultilineCustomInput
          textAlignVertical="top"
          value={about}
          onChangeText={setAbout}
        />

        <Label>Whatsapp</Label>
        <CustomInput value={phone} onChangeText={handlePhoneChange} />

        <Label>Fotos</Label>
        <UploadedImagesContainer>
          {images.map(image => (
            <UploadedImage key={image} source={{ uri: image }} />
          ))}
        </UploadedImagesContainer>
        <ImagesInput onPress={handleSelectImage}>
          <Feather name="plus" size={24} color="#15b6d6" />
        </ImagesInput>

        <Title>Visitação</Title>

        <Label>Instruções</Label>
        <MultilineCustomInput
          textAlignVertical="top"
          value={instructions}
          onChangeText={setInstructions}
        />

        <Label>Horário de visitas</Label>
        <CustomInput value={opening_hours} onChangeText={setOpeningHours} />

        <SwitchContainer>
          <Label>Atende final de semana?</Label>
          <Switch
            thumbColor="#fff"
            trackColor={{ false: '#ccc', true: '#39cc83' }}
            value={open_on_weekends}
            onValueChange={setOpenOnWeekends}
          />
        </SwitchContainer>

        <NextButton onPress={handleCreateOrphanage}>
          <NextButtonText>Cadastrar</NextButtonText>
        </NextButton>
      </Container>
    </KeyboardAvoidingView>
  );
};

export default InstitutionData;
