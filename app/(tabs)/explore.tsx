import ContactCard from '@/components/InformacaoPage/ContactCard';
import FooterLegalInfo from '@/components/InformacaoPage/FooterLegalInfo';
import LogoutButton from '@/components/InformacaoPage/LogoutButton';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function Explore() {
  return (
    <View style={styles.pageContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ContactCard />
        <LogoutButton />
      </ScrollView>

      {/* Footer fixo */}
      <FooterLegalInfo />
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'space-between',
    paddingBottom: 30,
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 30,
  },
});
