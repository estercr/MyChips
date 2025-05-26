import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {useCategoryStore} from '../../viewmodels/useCategoryStore';
import {Category} from '../../models/Category';
import uuid from 'react-native-uuid';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/AppNavigator';
import {styles} from './styles';

export default function CategoriesScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {categories, addCategory} = useCategoryStore();
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

  const renderItem = ({item}: {item: Category}) => (
    //TODO: transformar esse card em um componente separado
    <TouchableOpacity
      style={[styles.card, {backgroundColor: item.color}]}
      onPress={() => navigation.navigate('Expenses', {categoryId: item.id})}>
      <Text style={styles.cardText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categorias</Text>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.contentContainer}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}>
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
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleAddCategory}>
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
