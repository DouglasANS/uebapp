import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React, { useEffect } from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { StatusBar } from 'expo-status-bar';
import * as SystemUI from 'expo-system-ui';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    if (Platform.OS === 'android') {
      SystemUI.setBackgroundColorAsync('#fff');
    }
  }, []);

  return (
    <>
      {/* Fundo para a StatusBar */} 

      {/* StatusBar do Expo */}
      <StatusBar style="light" />

      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              position: 'absolute',
            },
            default: {},
          }),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="home" size={size} color={color} />
            ),
            tabBarLabelStyle: {
              fontSize: 12,
              marginBottom: 3,
            },
            tabBarActiveTintColor: '#4EC08D',
            tabBarInactiveTintColor: '#999',
          }}
        />
        <Tabs.Screen
          name="BaixarCarteira"
          options={{
            title: 'Visualizar Carteira',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="badge" size={size} color={color} />
            ),
            tabBarLabelStyle: {
              fontSize: 12,
              marginBottom: 3,
            },
            tabBarActiveTintColor: '#4EC08D',
            tabBarInactiveTintColor: '#999',
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Informações',
            tabBarIcon: ({ color, size, focused }) => (
              <MaterialIcons
                name={focused ? 'info' : 'info-outline'}
                size={size}
                color={color}
              />
            ),
            tabBarLabelStyle: {
              fontSize: 12,
              marginBottom: 3,
            },
            tabBarActiveTintColor: '#4EC08D',
            tabBarInactiveTintColor: '#999',
          }}
        />
      </Tabs>
    </>
  );
}
 
