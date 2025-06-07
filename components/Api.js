const API_URL = 'https://webapptech.site/apifuncionarios/api/funcionarios/';
import { Alert } from 'react-native';

// GET
export const fetchFuncionario = async () => {
  try {
    const response = await fetch(API_URL);
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Erro ao buscar Funcionários:', error);
    return [];
  }
};

// POST
export const createFuncionario = async (funcionarioData) => {
  try {
    // Monta o corpo que será enviado
    const bodyToSend = {
      nome_funcionario: funcionarioData.nomeFuncionario?.trim() || '',
      funcao_funcionario: funcionarioData.funcaoFuncionario?.trim() || '',
      setor: funcionarioData.setorFuncionario?.trim() || '',
    };

    // LOG: mostra o que está indo para a API
    console.log('Enviando para a API:', bodyToSend);

    // Verifica antes de enviar se tem campo vazio
    if (!bodyToSend.nome_funcionario || !bodyToSend.funcao_funcionario || !bodyToSend.setor) {
      Alert.alert('Atenção', 'Preencha todos os campos antes de cadastrar.');
      return null;
    }

    // Faz o POST
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bodyToSend),
    });

    // Lê a resposta bruta
    const textResponse = await response.text();
    console.log('Resposta bruta da API:', textResponse); // 👈 DEBUG da resposta

    let responseData;
    try {
      responseData = JSON.parse(textResponse);
    } catch (error) {
      responseData = null;
      console.warn('Resposta não é um JSON válido.');
    }

    // Se deu sucesso
    if (response.ok && responseData && responseData.success) {
      Alert.alert('Sucesso!', 'Cadastro realizado com sucesso!');
      return responseData;
    }

    // Se deu erro — mostra o erro da API se existir
    throw new Error(responseData?.message || 'Erro desconhecido ao cadastrar funcionário.');
  } catch (error) {
    console.error('Erro ao cadastrar Funcionário:', error.message);
    Alert.alert('Erro ao cadastrar', `Detalhes: ${error.message}`);
    return null;
  }
};

// PUT
export const updateFuncionario = async (funcionarioId, updatedData, navigation) => {
  try {
    const response = await fetch(`${API_URL}${funcionarioId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome_funcionario: updatedData.nomeFuncionario,
        funcao_funcionario: updatedData.funcaoFuncionario,
        setor: updatedData.setorFuncionario,
      }),
    });

    if (response.status === 200 || response.status === 204) {
      Alert.alert('Sucesso!', 'Funcionário atualizado com sucesso!');
      if (navigation) navigation.navigate('Home');
      return {};
    }

    const textResponse = await response.text();
    let responseData;

    try {
      responseData = JSON.parse(textResponse);
    } catch (error) {
      responseData = null;
      console.warn('Resposta não é um JSON válido.');
    }

    throw new Error(responseData?.message || 'Erro desconhecido ao atualizar o funcionário.');
  } catch (error) {
    console.error('Erro ao atualizar Funcionário:', error.message);
    Alert.alert('Erro ao atualizar', `Detalhes: ${error.message}`);
    return null;
  }
};
// DELETE
export const deleteFuncionario = async (funcionarioId, setRegistros) => {
  try {
    const response = await fetch(`${API_URL}${funcionarioId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      const responseData = await response.json();
      if (responseData.success) {
        Alert.alert('Sucesso!', responseData.message);
        if (setRegistros) {
          setRegistros((prevRegistros) =>
            prevRegistros.filter((funcionario) => funcionario.id !== funcionarioId)
          );
        }
      } else {
        Alert.alert('Erro', responseData.message);
      }
    } else {
      const textResponse = await response.text();
      let responseData = null;

      try {
        responseData = JSON.parse(textResponse);
      } catch (error) {
        console.warn('Resposta não é um JSON válido.');
      }

      throw new Error(responseData?.message || 'Erro desconhecido ao excluir funcionário');
    }
  } catch (error) {
    console.error('Erro ao excluir Funcionário:', error.message);
    Alert.alert('Erro ao excluir', `Detalhes: ${error.message}`);
  }
};
