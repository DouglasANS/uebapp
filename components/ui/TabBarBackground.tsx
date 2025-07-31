// components/ui/TabBarBackground.tsx
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function TabBarBackground() {
  return <View style={styles.background} />;
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#1a1a1a', // Mesma cor do resto do app
  },
});
