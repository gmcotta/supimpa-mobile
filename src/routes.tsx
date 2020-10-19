import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import InstitutionsMap from './pages/InstitutionsMap';
import InstitutionDetails from './pages/InstitutionDetails';
import SettingsScreen from './pages/SettingsScreen';

import SelectInstitutionType from './pages/CreateInstitution/SelectInstitutionType';
import SelectMapPosition from './pages/CreateInstitution/SelectMapPosition';
import InstitutionData from './pages/CreateInstitution/InstitutionData';

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
      </Navigator>
    </NavigationContainer>
  );
};

export default Routes;
