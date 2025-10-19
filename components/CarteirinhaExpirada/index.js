import { useRouter } from 'expo-router';
import { Alert, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CarteirinhaExpirada() {
  const router = useRouter();

  const handleRenovar = async () => {
    const phone = '+5531996092454'; // número no formato internacional
    const message = encodeURIComponent('Olá! Gostaria de renovar minha carteirinha.');
    const url = `https://wa.me/${phone}?text=${message}`;

    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Erro', 'Não foi possível abrir o WhatsApp.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um problema ao tentar abrir o WhatsApp.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.iconWrapper}>
          <Image
            source={require('../../assets/images/greenAlert.png')} 
            style={styles.alertIcon}
          />
        </View>

        <Text style={styles.title}>Carteirinha Expirada!</Text>
        <Text style={styles.subtitle}>
          Sua carteirinha não é válida para o ano atual.{"\n"}
          Renove para continuar utilizando os serviços.
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleRenovar}>
          <Text style={styles.buttonText}>Renovar Agora!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9F6F1',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
  },
  iconWrapper: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#E8FFF4',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#4EC08D',
    marginBottom: 20,
  },
  alertIcon: {
    width: 60,
    height: 60,
    tintColor: '#4EC08D',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2E6651',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#4B5563',
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 22,
    width: '100%',
  },
  button: {
    backgroundColor: '#4EC08D',
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 12,
    shadowColor: '#4EC08D',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
