/* eslint-disable react-native/no-inline-styles */
import { List, ThemeSwitcher, Typography } from '@hero-design/rn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { MoneyProfile } from '../../../../src/features/my-profile/MoneyProfile';

export const ProfileScreen = () => {
  const [open, setOpen] = useState(false);

  return (
    <ThemeSwitcher>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, padding: 20 }}>
          <Typography.Title level="h3">Mimic Profile Screen</Typography.Title>
          <List.Item
            variant="card"
            style={{ marginTop: 20 }}
            onPress={() => setOpen(!open)}
            title="Organisation"
            suffix="arrow-down"
          />
          <List.Item
            variant="card"
            style={{ marginTop: 20 }}
            onPress={() => {
              AsyncStorage.clear();
            }}
            title="Clear Storage"
          />
        </View>
        <MoneyProfile onExitPasscode={() => {}} />
      </SafeAreaView>
    </ThemeSwitcher>
  );
};
