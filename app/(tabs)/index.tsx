import CardInfoInit from '@/components/HomePage/CardInfoInit';
import CardInfoUsos from '@/components/HomePage/CardInfoUsos';
import HeaderLogo from '@/components/HomePage/HeaderLogo';
import StudentCardStatus from '@/components/HomePage/StudentCardStatus';
import { Colors } from '@/constants/Colors';
import useUserStore from '@/store/userStore';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  const userData = useUserStore((state) => state.userData);

  const teste1 = '21/07/2026' //vigente
  const teste2 = '21/07/2025' //renovacao
  const teste3 = '21/07/2024' //expirada
  const teste4 = 'asdasd' //invalida

  

  return (
    <View style={styles.pageWrapper}>
      <ScrollView contentContainerStyle={styles.scrollContent}> 
        <HeaderLogo />
        {/* Card de Boas-Vindas */}
        <CardInfoInit nome={userData?.nome} />
        <StudentCardStatus validade={userData?.validadeCarteirinha /* teste1 */} onContato={() => console.log('Contato')} />
       {/*  <StudentCardStatus validade={ teste2 } onContato={() => console.log('Contato')} />
        <StudentCardStatus validade={ teste3 } onContato={() => console.log('Contato')} />
        <StudentCardStatus validade={ teste4 } onContato={() => console.log('Contato')} /> */}
        <CardInfoUsos />
        <TouchableOpacity
          style={[styles.button, { backgroundColor: Colors.light.secondary }]}
          onPress={() => router.push('/(tabs)/BaixarCarteira')}
        >
          <MaterialIcons name="badge" size={24} color="white" />
          <Text style={styles.buttonText}>Visualizar Carteira</Text>
        </TouchableOpacity>
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({ 
  pageWrapper: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 30,
  },
  buttonWrapper: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 8,
    fontWeight: '500',
  },
});
