import { Colors } from '@/constants/Colors';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

export default function CardInfoUsos() {
    return (

        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Onde usar sua carteirinha</Text>

            <View style={styles.benefitsContainer}>
                <View style={styles.benefitItem}>
                    <MaterialIcons name="local-movies" size={32} color="Colors.light.primary" />
                    <Text style={styles.benefitText}>Cinema</Text>
                    <Text style={styles.benefitDescription}>Assista aos melhores filmes pagando meia-entrada</Text>
                </View>

                <View style={styles.benefitItem}>
                    <Ionicons name="football" size={32} color="Colors.light.primary" />
                    <Text style={styles.benefitText}>Estádios</Text>
                    <Text style={styles.benefitDescription}>Acompanhe seu time do coração com desconto</Text>
                </View>

                <View style={styles.benefitItem}>
                    <Ionicons name="musical-notes" size={32} color="Colors.light.primary" />
                    <Text style={styles.benefitText}>Shows</Text>
                    <Text style={styles.benefitDescription}>Curta sua banda favorita pagando menos</Text>
                </View>

                <View style={styles.benefitItem}>
                    <MaterialIcons name="theater-comedy" size={32} color="Colors.light.primary" />
                    <Text style={styles.benefitText}>Espetáculos</Text>
                    <Text style={styles.benefitDescription}>Peças teatrais, exposições e muito mais</Text>
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
        color: Colors.light.secondary,
        marginBottom: 15,
        textAlign: 'center',
    },
    benefitsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    benefitItem: {
        width: '48%',
        marginBottom: 20,
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
    },
    benefitText: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.light.primary,
        marginTop: 8,
        marginBottom: 4,
        textAlign: 'center',
    },
    benefitDescription: {
        fontSize: 13,
        color: '#666',
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
