import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Alert,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import { fetchFuncionario, deleteFuncionario } from './Api';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Home({ navigation }) {
  const [registro, setRegistros] = useState([]);

  useEffect(() => {
    async function carregarDados() {
      const data = await fetchFuncionario();
      console.log('Dados recebidos:', data);
      setRegistros(data);
    }

    carregarDados();
  }, []);

  const handleDelete = (id) => {
    Alert.alert(
      'Confirmação',
      'Tem certeza de que deseja deletar este Funcionário?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Deletar',
          onPress: () => deleteFuncionario(id, setRegistros),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Funcionários</Text>

      <FlatList
        data={registro}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>
              <Text style={styles.label}>Nome:</Text> {item.nome_funcionario}{'\n'}
              <Text style={styles.label}>Função:</Text> {item.funcao_funcionario}{'\n'}
              <Text style={styles.label}>Setor:</Text> {item.setor}
            </Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.button, styles.deleteButton]}
                onPress={() => handleDelete(item.id)}
              >
                <Icon name="trash" size={18} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.editButton]}
                onPress={() => navigation.navigate('Alterar', { funcionario: item })}
              >
                <Icon name="edit" size={18} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <FloatingAction
        actions={[
          {
            text: 'Adicionar',
            icon: <Icon name="plus" size={18} color="#fff" />,
            name: 'bt_add',
            position: 1,
          },
        ]}
        color="#5A4FCF"
        onPressItem={() => navigation.navigate('Cadastro')}
        floatingIcon={<Icon name="plus" size={20} color="#fff" />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
    textAlign: 'center',
  },
  itemContainer: {
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    padding: 14,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  itemText: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 10,
    lineHeight: 22,
  },
  label: {
    fontWeight: 'bold',
    color: '#fff',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginLeft: 10,
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
  },
  editButton: {
    backgroundColor: '#3498db',
  },
});
