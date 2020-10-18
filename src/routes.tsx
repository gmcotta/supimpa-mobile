import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import InstitutionsMap from './pages/InstitutionsMap';
import InstitutionDetails from './pages/InstitutionDetails';

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
          name="SelectMapPosition"
          component={SelectMapPosition}
          options={{
            headerShown: true,
            header: () => <Header title="Adicione uma instituição" />,
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
