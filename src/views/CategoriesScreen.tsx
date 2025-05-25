import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import { useCategoryStore } from '../viewmodels/useCategoryStore';
import { Category } from '../models/Category';
import uuid from 'react-native-uuid';

export default function CategoriesScreen() {
  const { categories, addCategory } = useCategoryStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [color, setColor] = useState('#f39c12');

  const handleAddCategory = () => {
    const newCategory: Category = {
      id: uuid.v4().toString(),
      name,
      color,
    };
    addCategory(newCategory);
    setName('');
    setColor('#f39c12');
    setModalVisible(false);
  };

  const renderItem = ({ item }: { item: Category }) => (
    <View style={[styles.card, { backgroundColor: item.color }]}>
      <Text style={styles.cardText}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categorias</Text>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={{ gap: 16 }}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+ Adicionar Categoria</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nova Categoria</Text>
            <TextInput
              placeholder="Nome da categoria"
              style={styles.input}
              value={name}
              onChangeText={setName}
            />
            <TextInput
              placeholder="Cor (#hex)"
              style={styles.input}
              value={color}
              onChangeText={setColor}
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleAddCategory}>
              <Text style={styles.saveButtonText}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    flex: 1,
    padding: 20,
    borderRadius: 10,
    marginBottom: 16,
    alignItems: 'center',
  },
  cardText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#1e90ff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#2ecc71',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelText: {
    color: '#e74c3c',
    textAlign: 'center',
    marginTop: 5,
  },
});
