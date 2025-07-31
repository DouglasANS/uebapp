import * as FileSystem from 'expo-file-system';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { Alert, Image, Platform } from 'react-native';

const handleDownloadAndroid = async (pdfUri, currentData) => {

    console.log('111')
    try {
        const fileName = `Carteirinha_${currentData?.nome.replace(/\s+/g, '_')}.pdf`;

        // 1. Ler o arquivo como base64
        const fileContent = await FileSystem.readAsStringAsync(pdfUri, {
            encoding: FileSystem.EncodingType.Base64,
        });

        // 2. Solicitar permissão para acessar o armazenamento
        const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

        if (!permissions.granted) {
            Alert.alert('Permissão necessária', 'Por favor, permita o acesso para salvar o arquivo');
            return;
        }

        // 3. Criar o arquivo na pasta selecionada pelo usuário
        try {
            const newFileUri = await FileSystem.StorageAccessFramework.createFileAsync(
                permissions.directoryUri,
                fileName,
                'application/pdf'
            );

            // 4. Escrever o conteúdo no novo arquivo
            await FileSystem.writeAsStringAsync(newFileUri, fileContent, {
                encoding: FileSystem.EncodingType.Base64,
            });

            Alert.alert('Sucesso!', 'Arquivo salvo com sucesso');
        } catch (error) {
            console.error('Erro ao criar arquivo:', error);
            Alert.alert('Erro', 'Não foi possível salvar o arquivo');
        }
    } catch (error) {
        console.error('Erro geral:', error);
        Alert.alert('Erro', 'Ocorreu um erro ao tentar salvar o arquivo');
    }
};

const gerarPDFComImagemELink = async (uriDaImagem, isDownload = false, currentData) => {

        console.log('gerarPDFComImagemELink')
    try {
        const mimeType = uriDaImagem.endsWith('.jpg') || uriDaImagem.endsWith('.jpeg')
            ? 'image/jpeg'
            : 'image/png';

        const base64Image = await FileSystem.readAsStringAsync(uriDaImagem, {
            encoding: FileSystem.EncodingType.Base64,
        });

        // Obter dimensões da imagem
        const { width, height } = await new Promise((resolve, reject) => {
            Image.getSize(uriDaImagem, (w, h) => resolve({ width: w, height: h }), reject);
        });

        // Converter px para mm (fator mais preciso)
        const mmWidth = (width * 25.4) / 70;
        const mmHeight = (height * 25.4) / 70;

        // URL que será aberta ao clicar no link
        const linkUrl = `https://validadoruebdne.vercel.app/certificado/${currentData.email}`;
        const linkText = "--------- certificado ---------";

        const htmlContent = `
        <html>
          <head>
            <meta charset="UTF-8">
            <style>
            * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
              @page {
                size: ${mmWidth}mm ${mmHeight}mm;
                margin: 0;
                padding: 0;
              }
              body {
                margin: 0;
                padding: 0;
                width: ${mmWidth}mm;
                height: ${mmHeight}mm;
                overflow: hidden;
                position: relative;
              }
              .image-container {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
              }
              img {
                width: 100%;
                height: 100%;
                object-fit: fill;
                display: block;
              }
              .link-container {
                position: absolute;
                bottom: 58mm; /* Posição a partir do fundo */
                left: 50%; /* Centraliza horizontalmente */
                transform: translateX(-50%); /* Ajuste fino de centralização */
                width: 100mm; /* Largura aumentada */
                min-width: 100mm; /* Garante a largura mínima */
                height: 32mm; /* Altura aumentada */
                text-align: center;
                z-index: 100;
                display: flex;
                justify-content: center;
                align-items: center;
              }
              .pdf-link {
                color: rgba(255, 255, 255, 0);
                text-decoration: none; /* Removido underline para melhor aparência */
                font-family: Arial, sans-serif;
                font-size: 14pt; /* Tamanho aumentado */
                font-weight: bold; /* Texto em negrito */
                background-color: rgba(250, 0, 0, 0);
                padding: 3mm 6mm; /* Padding aumentado */
                border-radius: 4mm; /* Bordas mais arredondadas */
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center; 
              }
            </style>
          </head>
          <body>
            <div class="image-container">
              <img src="data:${mimeType};base64,${base64Image}" />
            </div>
            <div class="link-container">
              <a href="${linkUrl}" class="pdf-link">${linkText}</a>
            </div>
          </body>
        </html>
        `;



        const { uri } = await Print.printToFileAsync({
            html: htmlContent,
            base64: false,
            width: mmWidth,
            height: mmHeight,
            margins: {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
            }
        });
 

        if (isDownload) {
            return uri; // Retorna o URI para ser usado no download
        } else { 
            if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(uri);
            } else {
                alert('Compartilhamento não disponível neste dispositivo.');
            }
        }

    } catch (error) {
        console.error('Erro ao gerar PDF com tamanho ajustado:', error);
        return null;
    }
};

export const handleCaptureAndDownloadPDF = async (currentData, viewRef, setLoadingDownload, isDownloadPdf ) => {
    console.log('object')
    setLoadingDownload(true);
    console.log('object1')
    try {
        const UriView = await viewRef.current.capture();
        const pdfUri = await gerarPDFComImagemELink(UriView, isDownloadPdf, currentData);
        console.log('111+-asdasd')
        if (pdfUri) {

            console.log('1112', Platform)
            if (Platform.OS === 'android') {
                await handleDownloadAndroid(pdfUri, currentData);
            } else {
                // Para iOS (sandbox do app)
                const fileName = `Carteirinha_${Date.now()}.pdf`;
                const newPath = `${FileSystem.documentDirectory}${fileName}`;
                await FileSystem.moveAsync({ from: pdfUri, to: newPath });
                Alert.alert('Sucesso', 'PDF salvo no diretório do app');
            }
        }
    } catch (error) {
        Alert.alert('Erro', 'Falha ao salvar o PDF');
    } finally {
        setLoadingDownload(false);
    }
};