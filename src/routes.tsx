import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { Platform } from 'react-native';
import OnboardingScreen from './pages/OnboardingScreen';
import InstitutionsMap from './pages/InstitutionsMap';
import InstitutionDetails from './pages/InstitutionDetails';
import CheckOnboardingStatus from './pages/CheckOnboardingStatus';
import SettingsScreen from './pages/SettingsScreen';

import SelectInstitutionType from './pages/CreateInstitution/SelectInstitutionType';
import SelectMapPosition from './pages/CreateInstitution/SelectMapPosition';
import InstitutionData from './pages/CreateInstitution/InstitutionData';
import InstitutionVisitData from './pages/CreateInstitution/InstitutionVisitData';

import Header from './components/Header';

const { Navigator, Screen } = createStackNavigator();

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#f2f3f5' },
        }}
      >
        <Screen
          name="CheckOnboardingStatus"
          component={CheckOnboardingStatus}
        />
        <Screen
          name="OnboardingScreen"
          component={OnboardingScreen}
          options={{
            headerShown: Platform.OS === 'ios',
            headerTitle: '',
            headerStatusBarHeight: 1,
            cardStyle: { backgroundColor: '#d1edf2' },
          }}
        />
        <Screen
          name="InstitutionsMap"
          component={InstitutionsMap}
          options={{
            cardStyle: { backgroundColor: '#fff' },
          }}
        />
        <Screen
          name="InstitutionDetails"
          component={InstitutionDetails}
          options={{
            headerShown: true,
            header: () => <Header showCancel={false} title="Instituição" />,
          }}
        />
        <Screen
          name="SettingsScreen"
          component={SettingsScreen}
          options={{
            headerShown: true,
            header: () => <Header showCancel={false} title="Configurações" />,
          }}
        />
        <Screen
          name="SelectMapPosition"
          component={SelectMapPosition}
          options={{
            headerShown: true,
            header: () => <Header title="Adicione uma instituição" />,
          }}
        />
        <Screen
          name="SelectInstitutionType"
          component={SelectInstitutionType}
          options={{
            headerShown: true,
            header: () => <Header title="Selecione o tipo da instituição" />,
          }}
        />
        <Screen
          name="InstitutionData"
          component={InstitutionData}
          options={{
            headerShown: true,
            header: () => <Header title="Informe os dados" />,
          }}
        />
        <Screen
          name="InstitutionVisitData"
          component={InstitutionVisitData}
          options={{
            headerShown: true,
            header: () => <Header title="Informe os dados" />,
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
};

export default Routes;
