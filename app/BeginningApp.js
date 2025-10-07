import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import useUserStore from '../store/userStore';

import { Colors } from '@/constants/Colors';


const { width, height } = Dimensions.get('window');
const CIRCLE_SIZE = width * 0.9;

export default function BeginningApp() {

   const router = useRouter();

  const navigation = useNavigation();
  const scaleAnim = useRef(new Animated.Value(1.5)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  const userData = useUserStore((state) => state.userData);

  useEffect(() => {

    console.log(Colors)
    // Inicia o zoom
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();

    // Inicia a opacidade após 1 segundo
    const fadeTimeout = setTimeout(() => {
      Animated.timing(opacityAnim, {
        toValue: 0.3,
        duration: 2000,
        useNativeDriver: true,
      }).start();
    }, 1000);

    // Redireciona após 3 segundos (tempo do zoom)
    const redirectTimeout = setTimeout(() => {
      if (userData?.cpf) {
        router.push('/(tabs)/');
      } else {
        navigation.replace('Login');
      }
      // Altere "Home" para o nome da tela desejada
    }, 2500);

    return () => {
      clearTimeout(fadeTimeout);
      clearTimeout(redirectTimeout);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Círculo superior direito */}
      <View style={styles.topRightCircle} />

      {/* Logo animada */}
      <Animated.View
        style={[
          styles.logoContainer,
          {
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
          },
        ]}
      >
        <Image
          source={require('../assets/images/splash-icon.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>

      {/* Círculo inferior esquerdo */}
      <View style={styles.bottomLeftCircle} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topRightCircle: {
    position: 'absolute',
    top: -CIRCLE_SIZE * 0.3,
    right: -CIRCLE_SIZE * 0.3,
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    backgroundColor: Colors.light.primary,
    borderRadius: CIRCLE_SIZE,
  },
  bottomLeftCircle: {
    position: 'absolute',
    bottom: -CIRCLE_SIZE * 0.3,
    left: -CIRCLE_SIZE * 0.3,
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    backgroundColor: Colors.light.secondary,
    borderRadius: CIRCLE_SIZE,
  },
  logoContainer: {
    zIndex: 1,
  },
  logo: {
    width: width * 0.6,
    height: height * 0.3,
  },
});
