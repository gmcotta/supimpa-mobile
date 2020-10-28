import React, { useCallback, useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

import { useInstitutionContext } from '../../../context/createInstitution';

import {
  Container,
  Title,
  Label,
  CustomInput,
  MultilineCustomInput,
  ImagesInput,
  NextButton,
  NextButtonText,
  UploadedImagesContainer,
  UploadedImage,
} from './styles';

const InstitutionData: React.FC = () => {
  const { setInstitution } = useInstitutionContext();

  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [phone, setPhone] = useState('');
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

  const handleNextStep = useCallback(async () => {
    setInstitution(oldValues => ({
      ...oldValues,
      name,
      about,
      phone,
      images,
    }));
    navigation.navigate('InstitutionVisitData');
  }, [name, about, phone, images, navigation, setInstitution]);

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
        <CustomInput
          value={phone}
          onChangeText={handlePhoneChange}
          keyboardType="phone-pad"
        />

        <Label>Fotos</Label>
        <UploadedImagesContainer>
          {images.map(image => (
            <UploadedImage key={image} source={{ uri: image }} />
          ))}
        </UploadedImagesContainer>
        <ImagesInput onPress={handleSelectImage}>
          <Feather name="plus" size={24} color="#15b6d6" />
        </ImagesInput>

        <NextButton onPress={handleNextStep}>
          <NextButtonText>Próximo</NextButtonText>
        </NextButton>
      </Container>
    </KeyboardAvoidingView>
  );
};

export default InstitutionData;
