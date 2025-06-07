import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { updateFuncionario } from './Api';

export default function Alterar({ route, navigation }) {
  const { funcionario } = route.params;

  // Corrigido: usando os campos corretos da API
  const [nomeFuncionario, setNomeFuncionario] = useState(funcionario.nome_funcionario);
  const [funcaoFuncionario, setFuncaoFuncionario] = useState(funcionario.funcao_funcionario);
  const [setorFuncionario, setSetorFuncionario] = useState(funcionario.setor);

  const handleUpdate = () => {
    const updatedData = {
      nomeFuncionario,
      funcaoFuncionario,
      setorFuncionario,
    };

    Alert.alert(
      'Confirmação',
      'Tem certeza de que deseja alterar este Funcionário?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Alterar',
          onPress: () => updateFuncionario(funcionario.id, updatedData, navigation), // agora passando só o ID
        },
      ]
    );
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Nome do Funcionário"
        value={nomeFuncionario}
        onChangeText={setNomeFuncionario}
        style={{ marginBottom: 10, borderWidth: 1, padding: 8 }}
      />
      <TextInput
        placeholder="Função do Funcionário"
        value={funcaoFuncionario}
        onChangeText={setFuncaoFuncionario}
        style={{ marginBottom: 10, borderWidth: 1, padding: 8 }}
      />
      <TextInput
        placeholder="Setor do Funcionário"
        value={setorFuncionario}
        onChangeText={setSetorFuncionario}
        style={{ marginBottom: 10, borderWidth: 1, padding: 8 }}
      />
      <Button title="Alterar" onPress={handleUpdate} />
    </View>
  );
}
