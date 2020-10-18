import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import InstitutionsMap from './pages/InstitutionsMap';
import InstitutionDetails from './pages/InstitutionDetails';

import SelectMapPosition from './pages/CreateInstitution/SelectMapPosition';
import InstitutionData from './pages/CreateInstitution/InstitutionData';

const { Navigator, Screen } = createStackNavigator();

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="InstitutionsMap" component={InstitutionsMap} />
        <Screen name="InstitutionDetails" component={InstitutionDetails} />
        <Screen name="SelectMapPosition" component={SelectMapPosition} />
        <Screen name="InstitutionData" component={InstitutionData} />
      </Navigator>
    </NavigationContainer>
  );
};

export default Routes;
