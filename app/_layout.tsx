import { useColorScheme } from '@/hooks/useColorScheme';
import useUserStore from '@/store/userStore';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SystemUI from 'expo-system-ui'; // Adicionei esta importação
import { useEffect, useState } from 'react';
import { ActivityIndicator, Platform, StatusBar as RNStatusBar, View } from 'react-native';
import 'react-native-reanimated';

const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#1a1a1a',
    card: '#2a2a2a',
    text: '#ffffff',
    border: '#333333',
    primary: '#df832e',
  },
};

const styles = {
  statusBarBackground: {
    height: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
    backgroundColor: '#1a1a1a',
  },
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const router = useRouter();
  const segments = useSegments();
  const { userData, termosAceitos  } = useUserStore();
  const [isNavigationReady, setIsNavigationReady] = useState(false);

  // Configuração do background da StatusBar para Android
  useEffect(() => {
    if (Platform.OS === 'android') {
      SystemUI.setBackgroundColorAsync('#1a1a1a');
    }
  }, []);

 useEffect(() => {
  if (!loaded || !isNavigationReady) return;
  console.log(userData, termosAceitos)
  if (!userData) {
    router.replace('/Login');
  }  else if (segments[0] === 'Login' || segments[0] === 'BeginningApp') {
    router.replace('/(tabs)');
  }
}, [userData, termosAceitos, segments, loaded, isNavigationReady]);

  if (!loaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1a1a1a' }}>
        <ActivityIndicator size="large" color="#df832e" />
      </View>
    );
  }

  return (
    <>
      {/* View para a StatusBar no Android */}
      {Platform.OS === 'android' && (
        <View style={styles.statusBarBackground} />
      )}
      
      <ThemeProvider value={colorScheme === 'dark' ? CustomDarkTheme : DefaultTheme}>
        <Stack
          screenListeners={{
            state: () => {
              setIsNavigationReady(true);
              return {};
            },
          }}
          screenOptions={{
            contentStyle: {
              backgroundColor: '#1a1a1a',
            },
          }}
        >
          <Stack.Screen 
            name="BeginningApp" 
            options={{ 
              headerShown: false,
              contentStyle: { backgroundColor: '#1a1a1a' }
            }} 
          />
          <Stack.Screen 
            name="index" 
            options={{ 
              headerShown: false,
              contentStyle: { backgroundColor: '#1a1a1a' }
            }} 
          />
          
          <Stack.Screen 
            name="Login" 
            options={{ 
              headerShown: false,
              gestureEnabled: !userData,
              contentStyle: { backgroundColor: '#1a1a1a' }
            }} 
          />
          <Stack.Screen 
            name="(tabs)" 
            options={{ 
              headerShown: false,
              gestureEnabled: !userData,
              contentStyle: { backgroundColor: '#1a1a1a' }
            }} 
          />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="light" />
      </ThemeProvider>
    </>
  );
}

