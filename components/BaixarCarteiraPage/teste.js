import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ButtonDownloadByCpf({ cpf, setLoadingDownload }) {



    const downloadDivAsPdf = async () => {
        setLoadingDownload(true)
        try {
            // 1. Faz a requisição para obter o PDF
            const response = await axios({
                method: 'post',
                url: 'https://backendfunemg-backfune.alehbv.easypanel.host/api/generatePdfEstudante', //'http://192.168.1.7:3002/api/generatePdfEstudante', 
                data: { cpf: cpf },
                responseType: 'arraybuffer', // Isso é essencial
            });

            console.log(response)

            // 2. Converte o ArrayBuffer para uma string base64
            const base64Pdf = arrayBufferToBase64(response.data);

            // 3. Define o caminho onde o arquivo será salvo
            const fileUri = `${FileSystem.documentDirectory}carteirinha.pdf`;

            // 4. Salva o arquivo no sistema de arquivos
            await FileSystem.writeAsStringAsync(fileUri, base64Pdf, {
                encoding: FileSystem.EncodingType.Base64,
            });

            // 5. Compartilha/abre o PDF
            await Sharing.shareAsync(fileUri, {
                mimeType: 'application/pdf',
                dialogTitle: 'Salvar Carteirinha',
                UTI: 'com.adobe.pdf',
            });
            setLoadingDownload(false)
        } catch (error) {
            setLoadingDownload(false)
            console.error('Erro ao baixar PDF:', error);
            Alert.alert('Erro', 'Não foi possível baixar a carteirinha');
        }
    };

    // Função para converter ArrayBuffer para Base64 sem usar Blob
    function arrayBufferToBase64(buffer) {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;

        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }

        return btoa(binary);
    }


    return (
        <View style={styles.buttonWrapper}>
            <TouchableOpacity
                style={[styles.button, { backgroundColor: Colors.light.secondary }]}
                onPress={downloadDivAsPdf}
            >
                <MaterialIcons name="file-download" size={24} color="white" />
                <Text style={styles.buttonText}>Baixar PDF</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonWrapper: {
        width: '48%', 
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