import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import InstitutionsMap from './pages/InstitutionsMap';
import InstitutionDetails from './pages/InstitutionDetails';

const { Navigator, Screen } = createStackNavigator();

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="InstitutionsMap" component={InstitutionsMap} />
        <Screen name="InstitutionDetails" component={InstitutionDetails} />
      </Navigator>
    </NavigationContainer>
  );
};

export default Routes;
