import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import InstitutionsMap from './pages/InstitutionsMap';

const { Navigator, Screen } = createStackNavigator();

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen name="InstitutionsMap" component={InstitutionsMap} />
      </Navigator>
    </NavigationContainer>
  );
};

export default Routes;
