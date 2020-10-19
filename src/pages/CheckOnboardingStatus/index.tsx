import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const CheckOnboardingStatus: React.FC = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      // await AsyncStorage.clear();
      const onboardingStatus = await AsyncStorage.getItem('@ONBOARDING/status');
      if (onboardingStatus === 'true') {
        navigation.navigate('InstitutionsMap');
      } else {
        navigation.navigate('OnboardingScreen');
      }
    };
    checkOnboardingStatus();
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <LinearGradient
        colors={['#2ab5d1', '#00c7c7']}
        start={[0, 0]}
        end={[1, 1]}
        style={{
          position: 'absolute',
          top: 0,
          height: '100%',
          width: '100%',
        }}
      />
      <ActivityIndicator size="large" />
    </View>
  );
};

export default CheckOnboardingStatus;
