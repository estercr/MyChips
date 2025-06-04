import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import {useCategoryStore} from '../../viewmodels/useCategoryStore';
import {Category} from '../../models/Category';
import uuid from 'react-native-uuid';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/AppNavigator';
import ColorPicker from '../../components/ColorPicker/ColorPicker';
import {styles} from './styles';

export default function CategoriesScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {categories, addCategory, updateCategory, removeCategory} =
    useCategoryStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [color, setColor] = useState('#f39c12');
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const handleSaveCategory = () => {
    if (editingCategory) {
      updateCategory({...editingCategory, name, color});
    } else {
      const newCategory: Category = {
        id: uuid.v4().toString(),
        name,
        color,
      };
      addCategory(newCategory);
    }
    resetForm();
  };

  const handleDeleteCategory = () => {
    if (!editingCategory) return;
    Alert.alert(
      'Excluir Categoria',
      `Tem certeza que deseja excluir "${editingCategory.name}"?`,
      [
        {text: 'Cancelar', style: 'cancel'},
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            removeCategory(editingCategory.id);
            resetForm();
          },
        },
      ],
    );
  };

  const resetForm = () => {
    setName('');
    setColor('#f39c12');
    setEditingCategory(null);
    setModalVisible(false);
  };

  const startEditing = (category: Category) => {
    setName(category.name);
    setColor(category.color);
    setEditingCategory(category);
    setModalVisible(true);
  };

  const renderItem = ({item}: {item: Category}) => (
    //TODO: transformar esse card em um componente separado
    <TouchableOpacity
      style={[styles.card, {backgroundColor: item.color}]}
      onPress={() => navigation.navigate('Expenses', {categoryId: item.id})}
      onLongPress={() => startEditing(item)}>
      <Text style={styles.cardText}>{item.name}</Text>
      <Text style={styles.editHint}>(Toque longo para editar)</Text>
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
            <Text style={styles.modalTitle}>
              {editingCategory ? 'Editar Categoria' : 'Nova Categoria'}
            </Text>
            <TextInput
              placeholder="Nome da categoria"
              style={styles.input}
              value={name}
              onChangeText={setName}
            />
            <Text style={styles.label}>Escolha uma cor:</Text>
            <ColorPicker selectedColor={color} onSelect={setColor} />
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSaveCategory}>
              <Text style={styles.saveButtonText}>Salvar</Text>
            </TouchableOpacity>
            {editingCategory && (
              <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteCategory}>
                <Text style={styles.deleteButtonText}>Excluir</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={resetForm}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
