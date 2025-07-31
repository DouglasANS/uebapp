// components/FooterLegalInfo.tsx
import { Linking, StyleSheet, Text, View } from 'react-native';

export default function FooterLegalInfo() {
  const version = '1.0.0'; // Você pode importar isso dinamicamente se quiser

  return (
    <View style={styles.container}>
      <Text style={styles.versionText}>Version {version}</Text>
      <View style={styles.linksContainer}>
        <Text
          style={styles.linkText}
          onPress={() => Linking.openURL('https://validadoruebdne.vercel.app/politica-de-privacidade')}
        >
          Política de Privacidade
        </Text>
        <Text style={styles.separator}> | </Text>
        <Text
          style={styles.linkText}
          onPress={() => Linking.openURL('https://validadoruebdne.vercel.app/termos-de-uso')}
        >
          Termos de serviço
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  versionText: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  linksContainer: {
    flexDirection: 'row',
  },
  linkText: {
    fontSize: 13,
    color: '#3b5998', // Azul claro, como na imagem
    textDecorationLine: 'underline',
  },
  separator: {
    fontSize: 13,
    color: '#999',
    marginHorizontal: 6,
  },
});
