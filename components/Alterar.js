import React, { useState } from 'react';
import {
  View,
  TextInput,
  Alert,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { updateFuncionario } from './Api';

export default function Alterar({ route, navigation }) {
  const { funcionario } = route.params;

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
          onPress: () => updateFuncionario(funcionario.id, updatedData, navigation),
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.title}>Alterar Funcionário</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do Funcionário"
        placeholderTextColor="#888"
        value={nomeFuncionario}
        onChangeText={setNomeFuncionario}
      />
      <TextInput
        style={styles.input}
        placeholder="Função do Funcionário"
        placeholderTextColor="#888"
        value={funcaoFuncionario}
        onChangeText={setFuncaoFuncionario}
      />
      <TextInput
        style={styles.input}
        placeholder="Setor do Funcionário"
        placeholderTextColor="#888"
        value={setorFuncionario}
        onChangeText={setSetorFuncionario}
      />

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Salvar Alterações</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#1e1e1e',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  button: {
    backgroundColor: '#5A4FCF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
