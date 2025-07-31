import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons'; // Ícone de check
import { useState } from 'react';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function AceiteTermosPage({ onAceitar = () => {console.log('--0--')}, onRecusar = () => {} }) {
  const [aceitou, setAceitou] = useState(false);

  const abrirLink = (url) => {
    Linking.openURL(url);
  };

  const handleContinuar = () => {
    if (!aceitou) {
      alert('Você precisa aceitar os Termos de Uso e a Política de Privacidade para continuar.');
      return;
    }
    console.log('--1--')
    onAceitar();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Termos de Uso e Política de Privacidade</Text>

      <Text style={styles.text}>
        Para utilizar o aplicativo UEB – Carteirinha de estudante, você precisa ler e concordar com os{' '}
        <Text style={styles.link} onPress={() => abrirLink('https://validadoruebdne.vercel.app/termos-de-uso')}>
          Termos de Uso
        </Text>{' '}
        e com a{' '}
        <Text style={styles.link} onPress={() => abrirLink('https://validadoruebdne.vercel.app/politica-de-privacidade')}>
          Política de Privacidade
        </Text>.
      </Text>

      <TouchableOpacity style={styles.checkboxContainer} onPress={() => setAceitou(!aceitou)}>
        <Ionicons
          name={aceitou ? 'checkbox' : 'square-outline'}
          size={24}
          color={aceitou ? Colors.light.secondary : '#999'}
        />
        <Text style={styles.checkboxLabel}>
          Eu li e concordo com os Termos de Uso e a Política de Privacidade.
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: aceitou ? Colors.light.secondary : '#ccc' }]}
        onPress={handleContinuar}
      >
        <Text style={styles.buttonText}>Continuar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onRecusar}>
        <Text style={styles.cancel}>Recusar e sair</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: Colors.light.secondary,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    color: '#333',
  },
  link: {
    color: Colors.light.secondary,
    textDecorationLine: 'underline',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 15,
    color: '#333',
    flex: 1,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancel: {
    color: '#999',
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
});
