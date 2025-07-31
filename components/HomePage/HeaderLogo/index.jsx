import { Colors } from '@/constants/Colors';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function HeaderLogo() {
  return (
    <View style={styles.headerContainer}>
      <Image
        source={require('@/assets/images/icon.png')}
        style={styles.logo}
      />
      <View style={styles.textWrapper}>
        {/* <Text style={styles.titulo}>UEB </Text> */}
        <Text style={styles.subtitulo}>UEB – Carteirinha de estudante</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 0,
    marginTop: 12,
    marginHorizontal: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    borderRadius: 10,
    marginRight: 12,
  },
  textWrapper: {
    flex: 1,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.secondary,
  },
  subtitulo: {
    fontSize: 14,
    color: '#555',
  },
});
