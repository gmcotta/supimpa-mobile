import React, { useEffect } from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';

import retirementHome from './src/assets/images/retirement-home.png';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -23.4439484,
          longitude: -46.5257722,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
        provider={PROVIDER_GOOGLE}
      >
        <Marker
          icon={retirementHome}
          coordinate={{
            latitude: -23.4439484,
            longitude: -46.5257722,
          }}
          calloutAnchor={{
            x: 2.2,
            y: 0.8,
          }}
        >
          <Callout tooltip onPress={() => alert('Oi')}>
            <View style={styles.calloutContainer}>
              <Text style={styles.calloutText}>Oi</Text>
            </View>
          </Callout>
        </Marker>
      </MapView>
      <View style={styles.footer}>
        <Text style={styles.footerText}>2 instituições encontradas</Text>
        <TouchableOpacity style={styles.createInstitutionButton}>
          <Feather name="plus" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    justifyContent: 'center',
  },
  calloutText: {
    color: '#0089a5',
    fontSize: 14,
  },
  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,
    backgroundColor: '#fff',
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      height: 3,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  footerText: {
    color: '#8fa7b3',
  },
  createInstitutionButton: {
    width: 56,
    height: 56,
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
