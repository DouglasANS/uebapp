import { Colors } from '@/constants/Colors';
import { formatarPrimeiraPalavra } from '@/hooks/utils';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function CardInfoInit({ nome }) {
  return (
    <LinearGradient
      colors={[Colors.light.secondary, Colors.light.primary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.card}
    >
      <View style={styles.textContainer}>
        <Text style={styles.title}>Bem-vindo! {formatarPrimeiraPalavra(nome)}</Text>
        <Text style={styles.subtitle}>
          Sua plataforma de acesso à carteira estudantil digital da UEB
        </Text>
      </View>

      <View style={styles.estudanteContainer}>
        <Image
          source={require('../../../assets/images/estudante.png')}
          style={styles.estudanteImage}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    marginTop: 20,
    marginBottom: 20,
    overflow: 'hidden', // importante para o borderRadius cortar a imagem
  },
  textContainer: {
    width: '65%',
    padding: 20, // padding só no texto
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 12,
    fontWeight: '500',
  },
  estudanteContainer: {
    width: '35%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // Removido display:flex e padding/margin
  },
  estudanteImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Para tocar nas bordas e preencher área
  },
});
