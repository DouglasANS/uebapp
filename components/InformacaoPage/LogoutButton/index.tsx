// Explore/LogoutButton.tsx
import { Colors } from '@/constants/Colors';
import useUserStore from '@/store/userStore';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Alert, BackHandler, Platform, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    useUserStore.getState().clearUserData();
    router.replace('/Login');

    if (Platform.OS === 'ios') {
      Alert.alert('Sair', 'Deseja realmente sair do aplicativo?', [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sair', onPress: () => BackHandler.exitApp() },
      ]);
    } else {
       router.replace('/Login');
     /*  BackHandler.exitApp(); */
    }
  };

  return (
    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
      <MaterialIcons name="exit-to-app" size={24} color="white" />
      <Text style={styles.logoutText}>Sair do Aplicativo</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.light.secondary,
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
});
