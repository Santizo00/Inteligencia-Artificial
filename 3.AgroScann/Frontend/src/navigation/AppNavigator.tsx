import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from '../screens/HomeScreen';
import PhotoPreviewScreen from '../screens/PhotoPreviewScreen';

export type RootStackParamList = {
  Home: undefined;
  PhotoPreview: { imageUri: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="PhotoPreview" component={PhotoPreviewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
