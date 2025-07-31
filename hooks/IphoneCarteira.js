import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { Alert, Image, Linking } from 'react-native';

// Função para verificar e solicitar permissões no iOS
async function verifyIOSPermissions() {
  const { status, canAskAgain } = await MediaLibrary.requestPermissionsAsync();
  
  if (status === 'granted') {
    return true;
  }

  if (status === 'denied' && canAskAgain) {
    return new Promise((resolve) => {
      Alert.alert(
        'Permissão necessária',
        'Precisamos acessar sua galeria para salvar a carteirinha',
        [
          {
            text: 'Cancelar',
            onPress: () => resolve(false),
            style: 'cancel',
          },
          {
            text: 'Permitir',
            onPress: async () => {
              const retryStatus = await MediaLibrary.requestPermissionsAsync();
              resolve(retryStatus.status === 'granted');
            },
          },
        ]
      );
    });
  }

  Alert.alert(
    'Permissão negada',
    'Você precisa permitir o acesso nas configurações',
    [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Abrir Configurações', onPress: () => Linking.openSettings() },
    ]
  );
  return false;
}

// Gerador de PDF otimizado para iOS
async function generatePDFForIOS(imageUri) {
  try {
    // Converter imagem para base64
    const base64Image = await FileSystem.readAsStringAsync(imageUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Detectar tipo MIME
    const mimeType = imageUri.endsWith('.jpg') || imageUri.endsWith('.jpeg') 
      ? 'image/jpeg' 
      : 'image/png';

    // Obter dimensões da imagem
    const { width, height } = await new Promise((resolve, reject) => {
      Image.getSize(imageUri, (w, h) => resolve({ width: w, height: h }), reject);
    });

    // HTML otimizado para iOS
    const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body, html {
            margin: 0;
            padding: 0;
            width: ${width}px;
            height: ${height}px;
          }
          img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        </style>
      </head>
      <body>
        <img src="data:${mimeType};base64,${base64Image}" />
      </body>
    </html>
    `;

    // Gerar PDF com configurações específicas para iOS
    const { uri } = await Print.printToFileAsync({
      html: htmlContent,
      width: width,
      height: height,
      margins: { left: 0, top: 0, right: 0, bottom: 0 }
    });

    return uri;
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    throw new Error('Falha ao gerar o PDF');
  }
}

// Salvar PDF no iOS
async function savePDFOnIOS(pdfUri, fileName) {
  try {
    // Tentar salvar na galeria de mídia primeiro
    await MediaLibrary.saveToLibraryAsync(pdfUri);
    return true;
  } catch (saveError) {
    console.log('Falha ao salvar na galeria, tentando compartilhamento...', saveError);
    
    // Fallback: compartilhar para permitir que o usuário salve manualmente
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(pdfUri, {
        UTI: 'com.adobe.pdf',
        mimeType: 'application/pdf',
        dialogTitle: 'Salvar Carteirinha',
        filename: fileName,
      });
      return true;
    }
    
    throw new Error('Não foi possível salvar o arquivo');
  }
}

// Função principal para iOS
export async function handleIOSDownload({viewRef: captureRef , currentData: userData}) {
  try {
    // 1. Capturar a view como imagem
    const imageUri = await captureRef.current.capture();
    
    // 2. Verificar permissões
    const hasPermission = await verifyIOSPermissions();
    if (!hasPermission) return;

    // 3. Gerar PDF
    const pdfUri = await generatePDFForIOS(imageUri);
    
    // 4. Criar nome do arquivo
    const fileName = `Carteirinha_${userData?.nome.replace(/\s+/g, '_')}.pdf`;
    
    // 5. Salvar PDF
    await savePDFOnIOS(pdfUri, fileName);
    
    Alert.alert('Sucesso', 'Carteirinha salva com sucesso!');
  } catch (error) {
    console.error('Erro no processo:', error);
    Alert.alert('Erro', error.message || 'Falha ao salvar a carteirinha');
  }
}