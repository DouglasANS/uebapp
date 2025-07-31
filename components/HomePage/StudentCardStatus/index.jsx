import { Colors } from '@/constants/Colors';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

function parseDataBrasileira(data) {
  const [dia, mes, ano] = data.split('/');
  return new Date(Number(ano), Number(mes) - 1, Number(dia));
}

const StudentCardStatus = ({ validade, onContato }) => {
  const hoje = new Date();

  let status = 'invalida'; // padrão

  let isDataValida = false;

  if (validade) {
    const dataValidade = parseDataBrasileira(validade);
    isDataValida = !isNaN(dataValidade.getTime());

    if (isDataValida) {
      const doisMesesAntes = new Date(dataValidade);
      doisMesesAntes.setMonth(doisMesesAntes.getMonth() - 2);

      if (hoje > dataValidade) {
        status = 'expirada';
      } else if (hoje >= doisMesesAntes) {
        status = 'renovacao';
      } else {
        status = 'vigente';
      }
    }
  }

  // Imagem associada a cada status
  const imagens = {
    vigente: require('@/assets/icons/statusvigente.png'),
    renovacao: require('@/assets/icons/statusrenovacao.png'),
    expirada: require('@/assets/icons/statusexpirada.png'),
    invalida: require('@/assets/icons/statusinvalida.png'),
  };

  const cores = {
    vigente: Colors.light.secondary,
    renovacao: Colors.light.primary,
    expirada: Colors.light.primary,
    invalida: '#555', // cinza escuro
  };

  const tituloTexto = {
    vigente: 'Carteirinha vigente',
    renovacao: 'Renovação antecipada',
    expirada: 'Carteirinha expirada',
    invalida: 'Carteirinha sem data registrada',
  };

  const descricaoTexto = {
    vigente: `Válida até ${validade}.`,
    renovacao: `Sua carteirinha vence em ${validade}. Já é possível renová-la.`,
    expirada: `Sua carteirinha venceu em ${validade}.`,
    invalida: 'Nenhuma data de validade registrada.',
  };

  return (
    <View style={[styles.card, { borderColor: cores[status] }]}>
      <View style={styles.row}>
        <View style={styles.content}>
          <Text style={[styles.titulo, { color: cores[status] }]}>{tituloTexto[status]}</Text>
          <Text style={styles.texto}>{descricaoTexto[status]}</Text>

          {(status === 'expirada' || status === 'renovacao') && (
            <Pressable style={styles.botaoRoxo} onPress={onContato}>
              <Text style={styles.botaoTexto}>Entrar em contato</Text>
            </Pressable>
          )}
        </View>

        <Image
          source={imagens[status]}
          style={styles.icone}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fefefe',
    borderLeftWidth: 6,
    padding: 16,
    marginTop: 0,
    marginBottom: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingRight: 12,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  texto: {
    fontSize: 15,
    color: '#333',
    marginBottom: 10,
  },
  botaoRoxo: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  icone: {
    width: 48,
    height: 48,
  },
});

export default StudentCardStatus;
