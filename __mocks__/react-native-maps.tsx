import React from 'react';
import { View } from 'react-native';
import type { MapMarkerProps, MapViewProps } from 'react-native-maps';
// Mock for react-native-maps

const MapView = ({ children, ...rest }: MapViewProps) => {
  return (
    <View {...rest}>
      {children}
    </View>
  )
}

export default MapView

export const PROVIDER_GOOGLE = 'google';

export type { Region, Camera } from 'react-native-maps'

export const MapMarker = ({ children, ...rest }: MapMarkerProps) => <View {...rest}></View>;