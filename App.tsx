import React from 'react';
import { useFonts } from 'expo-font';
import {
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
} from '@expo-google-fonts/montserrat';

import Routes from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
  });
  if (!fontsLoaded) {
    return null;
  }

  return <Routes />;
}
