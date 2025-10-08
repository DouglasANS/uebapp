import { Colors } from '@/constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { getUserByCPFAndNascimento } from '../Api';
import useUserStore from '../store/userStore';
import AceiteTermosPage from './AceiteTermosPage';


export default function Login() {

  const checkLoginBlocked = async () => {
    const blockData = await AsyncStorage.getItem('loginBlock');
    if (!blockData) return false;

    const { blockedUntil } = JSON.parse(blockData);
    const now = Date.now();

    if (now < blockedUntil) {
      const minutesLeft = Math.ceil((blockedUntil - now) / 60000);
      alert(`Você excedeu o número de tentativas. Tente novamente em ${minutesLeft} minutos.`);
      return true;
    } else {
      // Bloqueio expirou → limpar tudo
      await AsyncStorage.removeItem('loginBlock');
      await AsyncStorage.removeItem('loginAttempts');
      return false;
    }
  };

  const registerLoginError = async () => {
    const attemptsData = await AsyncStorage.getItem('loginAttempts');
    let attempts = attemptsData ? JSON.parse(attemptsData) : { count: 0, stage: 0 };

    attempts.count += 1;

    // Quando chegar a 5 erros:
    if (attempts.count >= 5) {
      attempts.count = 0; // zera contagem para o próximo ciclo
      attempts.stage += 1; // sobe o nível de punição

      let blockTime = 0;

      if (attempts.stage === 1) blockTime = 1 * 60 * 1000; // 1 minuto
      else if (attempts.stage === 2) blockTime = 10 * 60 * 1000; // 10 minutos
      else if (attempts.stage === 3) blockTime = 60 * 60 * 1000; // 1 hora
      else if (attempts.stage >= 4) {
        blockTime = 24 * 60 * 60 * 1000; // 24 horas
        attempts.stage = 0; // 🔁 reinicia o ciclo depois das 24h
      }

      await AsyncStorage.setItem('loginBlock', JSON.stringify({ blockedUntil: Date.now() + blockTime }));
      alert(`Muitas tentativas incorretas. Você foi bloqueado por ${blockTime / 60000 >= 60 ? `${blockTime / 3600000}h` : `${blockTime / 60000}min`}.`);
    }

    await AsyncStorage.setItem('loginAttempts', JSON.stringify(attempts));
  };


  const [cpf, setCpf] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [previewData, setPreviewData] = useState(false);
  const [showTermos, setShowTermos] = useState(false); // <-- Novo estado
  const { userData } = useUserStore();

  const router = useRouter();
  const previousValue = useRef('');
  const setUserData = useUserStore((state) => state.setUserData);
  const setCurrentSystem = useUserStore((state) => state.setCurrentSystem);

  const formatarDataNascimento = (text) => {
    const isDeleting = text.length < previousValue.current.length;
    if (isDeleting) {
      setDataNascimento(text);
      previousValue.current = text;
      return;
    }
    let numericText = text.replace(/[^0-9]/g, '');
    if (numericText.length > 8) numericText = numericText.substring(0, 8);

    let formatted = numericText;
    if (numericText.length > 4) {
      formatted = numericText.substring(0, 2) + '/' + numericText.substring(2, 4) + '/' + numericText.substring(4);
    } else if (numericText.length > 2) {
      formatted = numericText.substring(0, 2) + '/' + numericText.substring(2);
    }

    setDataNascimento(formatted);
    previousValue.current = formatted;
  };

  const formatCPF = (text) => {
    let numericText = text.replace(/[^0-9]/g, '');
    if (numericText.length > 11) numericText = numericText.substring(0, 11);

    let formattedText = numericText;
    if (numericText.length > 3) formattedText = numericText.substring(0, 3) + '.' + numericText.substring(3);
    if (numericText.length > 6) formattedText = formattedText.substring(0, 7) + '.' + formattedText.substring(7);
    if (numericText.length > 9) formattedText = formattedText.substring(0, 11) + '-' + formattedText.substring(11);

    setCpf(formattedText);
  };

  const handleLogin = async () => {

    const isBlocked = await checkLoginBlocked();
    console.log(isBlocked)
    if (isBlocked) return;

    if (Platform.OS === 'ios') {
      setCurrentSystem('ios');
    } else if (Platform.OS === 'android') {
      setCurrentSystem('android');
    }

    const cleanCpf = cpf.replace(/[^0-9]/g, '');
    if (dataNascimento.length !== 10) return alert('Data de nascimento inválida. Use o formato DD/MM/AAAA');
    if (cleanCpf.length !== 11) return alert('CPF inválido. O CPF deve conter 11 dígitos');

    const [day, month, year] = dataNascimento.split('/');
    const formattedDate = `${year}-${month}-${day} 00:00:00.000000`;

    setIsLoading(true);

    getUserByCPFAndNascimento({ cpf: cleanCpf, dataNascimento: formattedDate })
      .then(async res => {
        setIsLoading(false);

        if (res.data.status === false) {
          await registerLoginError()
          return alert(`${res.data.message}`);
        }
        console.log('aqui')
        setPreviewData(res.data);
        setShowTermos(true)
      })
      .catch(async err => {
        setIsLoading(false);
        await registerLoginError()
        alert('Erro ao buscar os dados.');
        console.error(err);
      });
  };

  function handleAceite() {
    console.log('fora');
    const store = useUserStore.getState();
    if (store.aceitarTermos && typeof store.aceitarTermos === 'function') {
      setUserData(null)
      store.aceitarTermos();
    } else {
      setUserData(null)
      console.warn('Função aceitarTermos não definida no store');
    }
    setUserData(previewData)
    router.push('/(tabs)/');
  };


  const handleRecusa = () => {
    // Limpa os dados do usuário
    if (useUserStore.getState().clearUserData) {
      useUserStore.getState().clearUserData();
    } else {
      setUserData(null);
    }
    setShowTermos(false);
  };

  if (showTermos) {
    return (
      <AceiteTermosPage
        onAceitar={handleAceite}
        onRecusar={handleRecusa}
      />
    );
  }

  return (
    <KeyboardAvoidingView style={styles.keyboardView} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.background} />
        <Image source={require('../assets/images/fundo.png')} style={styles.backgroundImage} blurRadius={2} />

        <View style={styles.container}>
          <Image source={require('../assets/images/ueb3.png')} style={styles.logo} />

          <Text style={styles.title}>Bem vindo!</Text>
          <Text style={styles.subtitle}>Preencha os dados solicitados para ter acesso a sua carteira!</Text>

          <TextInput
            style={styles.input}
            placeholder="Digite seu CPF"
            placeholderTextColor="#aaa"
            keyboardType="numeric"
            value={cpf}
            onChangeText={formatCPF}
            maxLength={14}
          />
          <TextInput
            style={styles.input}
            placeholder="Digite sua Data de Nascimento"
            placeholderTextColor="#aaa"
            keyboardType="numeric"
            value={dataNascimento}
            onChangeText={formatarDataNascimento}
            maxLength={10}
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={isLoading}>
            {isLoading ? <ActivityIndicator color="#fff" size="small" /> : <Text style={styles.buttonText}>Entrar</Text>}
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>UEB - Sistema de Carteirinha Estudantil</Text>
            <Text style={styles.footerText}>Versão 1.0.0</Text>
            <Text style={styles.footerHelp}>Se tiver algum problema, fale com a gente.</Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardView: { flex: 1 },
  scrollContent: { flexGrow: 1 },
  background: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: '#fff', opacity: 0.98,
  },
  backgroundImage: { position: 'absolute', width: '100%', height: '100%', opacity: 1 },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 100,
    paddingBottom: 40,
    justifyContent: 'flex-start',
  },
  logo: { width: 200, height: 200, alignSelf: 'center', marginBottom: 20, resizeMode: 'contain', borderRadius: 50 },
  title: { fontSize: 28, fontWeight: 'bold', color: Colors.light.secondary, textAlign: 'center', marginBottom: 6 },
  subtitle: { fontSize: 16, color: '#333', textAlign: 'center', marginBottom: 24 },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: Colors.light.secondary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  footer: {
    marginTop: 40,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ababab',
    alignItems: 'center',
  },
  footerText: { fontSize: 12, color: '#666', marginBottom: 6, textAlign: 'center' },
  footerHelp: { fontSize: 11, color: '#999', marginTop: 10, fontStyle: 'italic' },
});
