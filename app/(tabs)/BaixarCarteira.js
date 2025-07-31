import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import ViewShot from 'react-native-view-shot';
import { getImagemByUserId } from '../../Api';
import ButtonDownloadByCpf from '../../components/BaixarCarteiraPage/teste';
import { handleCaptureAndDownloadPDF } from '../../hooks/AndroidCarteira';
import useUserStore from '../../store/userStore';

export default function BaixarCarteira() {
    const [imagem, setImagem] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingDownload, setLoadingDownload] = useState(false);
    const [viewShotSize, setViewShotSize] = useState({ width: 0, height: 0 });

    const userData = useUserStore((state) => state.userData);
    const currentSystem = useUserStore((state) => state.currentSystem);
    const viewRef = useRef(null)

    useEffect(() => {
        console.log('imagem 1')
        getImagemByUserId({ id: userData.estudante_id }).then(res => {
            console.log('imagem 2')
            if (res.data.imagem) {
                setImagem(res.data.imagem);
            }
        })
    }, [])

    const currentData = {
        cpf: userData?.cpf || '',
        imagem: "https://example.com/imagem-ficticia.jpg",
        codigoUso: userData?.codigoUso || '',
        nome: userData?.nome || '',
        email: userData?.email || '',
        rg: userData?.rg || '',
        dataNascimento: userData?.dataNascimento || '',
        instituicao: userData?.instituicao || '',
        curso: userData?.curso || '',
        escolaridade: userData?.escolaridade || '',
        codId: userData?.codId || '',
        validadeCarteirinha: userData?.validadeCarteirinha || '',
    };





    return (
        <View style={styles.container}>
            <ViewShot
                ref={viewRef}
                style={styles.maain}
                options={{ fileName: 'Carteira', format: 'png', quality: 0.8 }}
            >
                <ImageBackground
                    source={require('../../assets/images/digital2025.png')}
                    style={styles.card}
                    imageStyle={{ resizeMode: 'cover' }}
                >
                    <Image
                        src={imagem}
                        style={styles.profileImage}
                    />

                    <View style={styles.qrcode}>
                        <QRCode
                            value={`https://validadoruebdne.vercel.app/validar/${currentData?.email}`}
                            size={135}
                            backgroundColor="transparent"
                        />
                    </View>

                    {currentData?.imagem !== 0 && (
                        <Image
                            source={{ uri: currentData?.imagem }}
                            style={styles.foto}
                        />
                    )}

                    <Text style={styles.codigoUso}>{currentData?.codigoUso || ''}</Text>

                    <View style={styles.dados}>
                        <Text style={styles.texto}>{currentData?.nome?.toUpperCase()}</Text>
                        <Text style={styles.texto}>Ins. Ensino: {currentData?.instituicao?.toUpperCase()}</Text>
                        <Text style={styles.texto}>Curso: {currentData?.curso?.toUpperCase()}</Text>
                        <Text style={styles.texto}>Nível de Ensino: {currentData?.escolaridade?.toUpperCase()}</Text>
                        <Text style={styles.texto}>RG: {currentData?.rg?.toUpperCase()}</Text>
                        <Text style={styles.texto}>Data de nasc: {currentData?.dataNascimento}</Text>
                        <Text style={styles.texto}>Validade: {currentData?.validadeCarteirinha}</Text>
                    </View>
                </ImageBackground>
            </ViewShot>

            {loading || loadingDownload ? (
                <View style={{ marginTop: 20 }}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text style={{ marginTop: 10 }}>
                        {loading ? 'Compartilhando PDF...' : 'Salvando PDF, por favor aguarde...'}
                    </Text>
                </View>
            ) : (
                <View  >
                    {currentSystem ?
                        <View style={styles.buttonsContainer}>
                            {/* <View style={styles.buttonWrapper}>
                                <TouchableOpacity
                                    style={[styles.button, { backgroundColor: Colors.light.secondary }]}
                                    onPress={() => { handleCaptureAndDownloadPDF(currentData, viewRef, setLoadingDownload, false) }}
                                >
                                    <MaterialIcons name="share" size={24} color="white" />
                                    <Text style={styles.buttonText}>Compartilhar</Text>
                                </TouchableOpacity>
                            </View> */}

                             <View style={styles.buttonWrapper}>
                                <TouchableOpacity
                                    style={[styles.button, { backgroundColor: Colors.light.secondary }]}
                                    onPress={() => { handleCaptureAndDownloadPDF(currentData, viewRef, setLoadingDownload, true) }}
                                >
                                    <MaterialIcons name="file-download" size={24} color="white" />
                                    <Text style={styles.buttonText}>Baixar PDF</Text>
                                </TouchableOpacity>
                            </View> 
                        </View>
                        :
                        <View style={styles.buttonsContainer}>
                            <ButtonDownloadByCpf cpf={userData.cpf} setLoadingDownload={setLoadingDownload} />
                        </View>
                    }
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    maain: {
        margin: '0px',
        padding: '0px',
    },
    container: {
        alignItems: 'center',
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'center'
    },
    card: {
        width: 350,
        height: 658,
        justifyContent: 'flex-start',
        position: 'relative',
    },
    background: {
        width: 350,
        height: 658,
        resizeMode: 'cover',
    },
    qrcode: {
        position: 'absolute',
        top: 129,
        right: 22,
        width: 135,
        height: 135,
    },
    profileImage: {
        position: 'absolute',
        borderRadius: 15,
        top: 122,
        left: 15,
        width: 149,
        height: 175,
    },
    foto: {
        position: 'absolute',
        top: 122,
        left: 20,
        width: 144,
        height: 175,
        borderRadius: 15,
    },
    codigoUso: {
        position: 'absolute',
        top: 272,
        right: 17,
        fontSize: 16,
        width: 150,
        textAlign: 'center',
        fontWeight: '400',
        color: 'black',
    },
    dados: {
        position: 'absolute',
        top: 323,
        left: 25,
        width: 300,
        height: 180,
        justifyContent: 'space-around',
    },
    texto: {
        fontSize: 14,
        color: 'black',
    },
    linkCertificado: {
        position: 'absolute',
        bottom: 62,
        left: 122,
        height: 35,
        width: 107,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    linkText: {
        fontSize: 10,
        color: '#fff',
        fontWeight: 'bold',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        width: '90%',
    },
    buttonWrapper: {
        width: '48%', // Deixa um pequeno espaço entre os botões
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
    link: {
        marginTop: 10,
        color: '#007AFF',
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
});