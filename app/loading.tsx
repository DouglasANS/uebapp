import { router } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default function LoadingScreen() {
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace('/BeginningApp');
    }, 2000); // 2 segundos de splash

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Carregando --- App...</Text>
      <ActivityIndicator size="large" color="#1e90ff" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  text: {
    marginBottom: 16,
    fontSize: 18,
  },
});
