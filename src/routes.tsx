import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Platform, View } from 'react-native';

import OnboardingScreen from './pages/OnboardingScreen';
import InstitutionsMap from './pages/InstitutionsMap';
import InstitutionDetails from './pages/InstitutionDetails';
import CheckOnboardingStatus from './pages/CheckOnboardingStatus';
import SettingsScreen from './pages/SettingsScreen';
import LocationScreen from './pages/LocationScreen';
import SettingsLocationScreen from './pages/SettingsScreen/LocationScreen';

import SelectInstitutionType from './pages/CreateInstitution/SelectInstitutionType';
import SelectMapPosition from './pages/CreateInstitution/SelectMapPosition';
import InstitutionData from './pages/CreateInstitution/InstitutionData';
import InstitutionVisitData from './pages/CreateInstitution/InstitutionVisitData';
import InstitutionCreated from './pages/CreateInstitution/InstitutionCreated';
import CancelInstitutionCreation from './pages/CreateInstitution/CancelInstitutionCreation';

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
            headerTitle: 'Oi',
            header: () => (
              <View style={{ backgroundColor: '#f2f3f5', height: 48 }} />
            ),
            cardStyle: { backgroundColor: '#d1edf2' },
          }}
        />
        <Screen name="LocationScreen" component={LocationScreen} />
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
          name="SettingsLocationScreen"
          component={SettingsLocationScreen}
          options={{
            headerShown: true,
            header: () => <Header showCancel={false} title="Localidade" />,
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
        <Screen
          name="InstitutionCreated"
          component={InstitutionCreated}
          options={{
            headerShown: false,
            cardStyle: { backgroundColor: '#37c77f' },
          }}
        />
        <Screen
          name="CancelInstitutionCreation"
          component={CancelInstitutionCreation}
          options={{
            headerShown: false,
            cardStyle: { backgroundColor: '#ff669d' },
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
};

export default Routes;
