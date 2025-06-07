import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { createFuncionario } from './Api';

export default function Cadastro({ navigation }) {
  const [registro, setRegistros] = useState([]);
  const [nomeFuncionario, setNomeFuncionario] = useState('');
  const [funcaoFuncionario, setFuncaoFuncionario] = useState('');
  const [setorFuncionario, setSetorFuncionario] = useState('');

  const [selectedFuncionarioId, setSelectedFuncionarioId] = useState(null);

  const handleSubmit = async () => {
    if (!nomeFuncionario || !funcaoFuncionario || !setorFuncionario) {
      Alert.alert('Atenção', 'Preencha todos os campos antes de cadastrar.');
      return;
    }

    const newFuncionario = { nomeFuncionario, funcaoFuncionario, setorFuncionario };

    if (selectedFuncionarioId) {
      // Se um funcionário estiver selecionado para edição, chamamos a função de update
      await updateFuncionario(selectedFuncionarioId, newFuncionario);
      setSelectedFuncionarioId(null); // Limpa a seleção após edição
    } else {
      // Se não, chamamos a função de criação de funcionário
      const addedFuncionario = await createFuncionario(newFuncionario);
      if (addedFuncionario) {
        Alert.alert('Sucesso!', 'Cadastro realizado com sucesso!', [
          { text: 'OK', onPress: () => navigation.navigate('Home') },
        ]);
      }
    }

    // Limpa os campos do formulário
    setNomeFuncionario('');
    setFuncaoFuncionario('');
    setSetorFuncionario('');
  };

  return (
    <View>
      <TextInput
        placeholder="Nome do Funcionário"
        value={nomeFuncionario}
        onChangeText={setNomeFuncionario}
      />
      <TextInput
        placeholder="Função do Funcionário"
        value={funcaoFuncionario}
        onChangeText={setFuncaoFuncionario}
      />
      <TextInput
        placeholder="Setor do Funcionário"
        value={setorFuncionario}
        onChangeText={setSetorFuncionario}
      />
      <Button title="Cadastrar" onPress={handleSubmit} />
    </View>
  );
}
