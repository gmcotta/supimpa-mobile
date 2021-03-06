import React from 'react';
import { useFonts } from 'expo-font';
import {
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
} from '@expo-google-fonts/montserrat';

import { InstitutionProvider } from './src/context/createInstitution';

import Routes from './src/routes';

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <InstitutionProvider>
      <Routes />
    </InstitutionProvider>
  );
};

export default App;
