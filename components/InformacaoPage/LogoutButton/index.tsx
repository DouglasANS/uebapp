// Explore/LogoutButton.tsx
import { Colors } from '@/constants/Colors';
import useUserStore from '@/store/userStore';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Platform, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    // Limpa os dados do usuário com segurança
    const state = useUserStore.getState();
    if (state && state.clearUserData) {
      state.clearUserData();
    }

    if (Platform.OS === 'ios') {
      router.replace('/Login');
    } else {
      // Android: apenas navega para Login, não fecha o app
      router.replace('/Login');
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
