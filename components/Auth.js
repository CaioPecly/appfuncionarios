// components/Auth.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { auth } from './Firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

export default function Auth({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [isLogin, setIsLogin] = useState(true); // alternar entre login e cadastro

  const handleAuth = async () => {
    try {
      if (isLogin) {
        // Fazer Login
        await signInWithEmailAndPassword(auth, email, senha);
        Alert.alert('Login realizado com sucesso!');
        navigation.navigate('Home');
      } else {
        // Fazer Cadastro
        await createUserWithEmailAndPassword(auth, email, senha);
        Alert.alert('Usuário cadastrado com sucesso!');
        navigation.navigate('Home');
      }
    } catch (error) {
      Alert.alert('Erro:', error.message);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isLogin ? 'Login' : 'Cadastro'}</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        style={styles.input}
      />

      <Button
        title={isLogin ? 'Entrar' : 'Cadastrar'}
        onPress={handleAuth}
      />

      <TouchableOpacity onPress={toggleAuthMode} style={{ marginTop: 20 }}>
        <Text style={styles.toggleText}>
          {isLogin ? 'Não tem conta? Cadastre-se' : 'Já tem conta? Faça login'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 8,
    paddingHorizontal: 5,
  },
  toggleText: {
    color: '#3498db',
    textAlign: 'center',
  },
});
