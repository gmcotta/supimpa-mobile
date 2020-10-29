import React, { useCallback, useEffect } from 'react';
import {
  Image,
  View,
  Text,
  Platform,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import retirementHome from '../../assets/images/retirement-home-240.png';
import seniorCenter from '../../assets/images/senior-center-240.png';
import onboardingAnimation from '../../assets/animations/homeAnimation.json';
import onboardingImage from '../../assets/images/onboarding-1.png';

const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation();

  const onDone = useCallback(() => {
    try {
      // await AsyncStorage.setItem('@ONBOARDING/status', 'true');
      navigation.navigate('LocationScreen');
    } catch (error) {
      alert('error');
    }
  }, [navigation]);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      // await AsyncStorage.clear();
      const onboardingStatus = await AsyncStorage.getItem('@ONBOARDING/status');
      if (onboardingStatus === 'true') {
        navigation.navigate('InstitutionsMap');
      }
    };
    checkOnboardingStatus();
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#fff" />
      <Onboarding
        pages={[
          {
            backgroundColor: '#f2f3f5',
            image: (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {Platform.OS === 'ios' ? (
                  <LottieView
                    source={onboardingAnimation}
                    autoPlay
                    loop
                    style={{ height: 240 }}
                  />
                ) : (
                  <Image
                    source={onboardingImage}
                    style={{ height: 240, width: 360, resizeMode: 'contain' }}
                  />
                )}
              </View>
            ),
            title: (
              <View style={{ marginHorizontal: 32 }}>
                <Text
                  style={{
                    fontFamily: 'Montserrat_700Bold',
                    fontSize: 32,
                    textAlign: 'center',
                    color: '#0089a5',
                  }}
                >
                  Leve felicidade para o mundo
                </Text>
              </View>
            ),
            subtitle: '',
          },
          {
            backgroundColor: '#f2f3f5',
            image: (
              <Image
                source={retirementHome}
                style={{ width: 240, height: 240 }}
              />
            ),
            subtitle: '',
            title: (
              <View style={{ marginHorizontal: 32 }}>
                <Text
                  style={{
                    fontFamily: 'Montserrat_600SemiBold',
                    fontSize: 24,
                    textAlign: 'left',
                    color: '#0089a5',
                  }}
                >
                  Visite casas de repouso e alegre o dia daqueles que já fizeram
                  muito por nós
                </Text>
              </View>
            ),
          },
          {
            backgroundColor: '#f2f3f5',
            image: (
              <Image
                source={seniorCenter}
                style={{ width: 240, height: 240 }}
              />
            ),
            subtitle: '',
            title: (
              <View style={{ marginHorizontal: 32 }}>
                <Text
                  style={{
                    fontFamily: 'Montserrat_600SemiBold',
                    fontSize: 24,
                    textAlign: 'right',
                    color: '#0089a5',
                  }}
                >
                  Conheça os centros de convivência para idosos e recomende para
                  seus parentes
                </Text>
              </View>
            ),
          },
        ]}
        bottomBarColor="#d1edf2"
        onDone={onDone}
        showSkip={false}
        bottomBarHeight={Platform.OS === 'ios' ? 40 : 48}
        transitionAnimationDuration={100}
      />
    </SafeAreaView>
  );
};

export default OnboardingScreen;
