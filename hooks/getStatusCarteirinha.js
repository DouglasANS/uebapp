// Função auxiliar para converter data no formato DD/MM/AAAA
function parseDataBrasileira(dataStr) {
  if (!dataStr) return new Date('invalid');
  const [dia, mes, ano] = dataStr.split('/').map(Number);
  return new Date(ano, mes - 1, dia);
}

// Função principal para calcular o status da carteirinha
function getStatusCarteirinha(validade) {
  const hoje = new Date();
  let status = 'invalida'; // valor padrão

  if (!validade) return status;

  const dataValidade = parseDataBrasileira(validade);
  const isDataValida = !isNaN(dataValidade.getTime());

  if (!isDataValida) return status;

  const doisMesesAntes = new Date(dataValidade);
  doisMesesAntes.setMonth(doisMesesAntes.getMonth() - 2);

  if (hoje > dataValidade) {
    status = 'expirada';
  } else if (hoje >= doisMesesAntes) {
    status = 'renovacao';
  } else {
    status = 'vigente';
  }

  return status;
}

// Exporta as funções (caso queira importar em outro arquivo)
module.exports = { getStatusCarteirinha, parseDataBrasileira };
