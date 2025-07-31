// Explore/ContactCard.tsx
import { Colors } from '@/constants/Colors';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Linking, StyleSheet, Text, View } from 'react-native';

export default function ContactCard() {
  const openWebsite = () => {
    Linking.openURL('https://validadoruebdne.vercel.app');
  };

  const makePhoneCall = () => {
    Linking.openURL('tel:+5531996092454');
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Contato e Acesso</Text>

      <View style={styles.contactContainer}>
        <View style={styles.contactItem} onTouchEnd={openWebsite}>
          <FontAwesome name="globe" size={24} color="Colors.light.primary" />
          <Text style={styles.contactText}>https://validadoruebdne.vercel.app</Text>
        </View>

        <View style={styles.contactItem} onTouchEnd={makePhoneCall}>
          <MaterialIcons name="phone" size={24} color="Colors.light.primary" />
          <Text style={styles.contactText}>(31) 99609-2454</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 30,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.light.primary,
    marginBottom: 15,
    textAlign: 'center',
  },
  contactContainer: {
    marginTop: 10,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  contactText: {
    fontSize: 16,
    color: '#555',
    marginLeft: 15,
  },
});
