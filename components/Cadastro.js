import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { createFuncionario } from './Api';

export default function Cadastro({ navigation }) {
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
      await updateFuncionario(selectedFuncionarioId, newFuncionario);
      setSelectedFuncionarioId(null);
    } else {
      const addedFuncionario = await createFuncionario(newFuncionario);
      if (addedFuncionario) {
        Alert.alert('Sucesso!', 'Cadastro realizado com sucesso!', [
          { text: 'OK', onPress: () => navigation.navigate('Home') },
        ]);
      }
    }

    setNomeFuncionario('');
    setFuncaoFuncionario('');
    setSetorFuncionario('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.title}>Cadastro de Funcionário</Text>

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

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Cadastrar</Text>
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
