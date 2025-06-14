import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useCategoryStore} from '../../viewmodels/useCategoryStore';
import {Expense} from '../../models/Expense';
import uuid from 'react-native-uuid';
import {format, parseISO, isWithinInterval} from 'date-fns';
import {styles} from './styles';
import Feather from 'react-native-vector-icons/Feather';

type RootStackParamList = {
  Expenses: {categoryId: string};
};

type ExpensesScreenRouteProp = RouteProp<RootStackParamList, 'Expenses'>;

export default function ExpensesScreen() {
  const route = useRoute<ExpensesScreenRouteProp>();
  const {categoryId} = route.params;
  const {expenses, addExpense, categories, removeExpense} = useCategoryStore();

  const category = categories.find(cat => cat.id === categoryId);
  const categoryExpenses = expenses.filter(e => e.categoryId === categoryId);

  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [filterStart, setFilterStart] = useState('');
  const [filterEnd, setFilterEnd] = useState('');

  const handleAddExpense = () => {
    const newExpense: Expense = {
      id: uuid.v4().toString(),
      categoryId,
      title,
      amount: parseFloat(amount),
      date,
    };
    addExpense(newExpense);
    setTitle('');
    setAmount('');
    setDate('');
    setModalVisible(false);
  };

  const handleDeleteExpense = (expenseId: string) => {
    Alert.alert(
      'Excluir Despesa',
      'Tem certeza que deseja excluir esta despesa?',
      [
        {text: 'Cancelar', style: 'cancel'},
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => removeExpense(expenseId),
        },
      ],
    );
  };

  const filteredExpenses = categoryExpenses.filter(e => {
    if (!filterStart || !filterEnd) {
      return true;
    }
    const eDate = parseISO(e.date);
    return isWithinInterval(eDate, {
      start: parseISO(filterStart),
      end: parseISO(filterEnd),
    });
  });

  const renderItem = ({item}: {item: Expense}) => (
    //TODO: trasnformar isso em um componente separado
    //TODO: adicionar formatação de valor
    //TODO: adicionar formatação de data e incluir calendário
    <View style={styles.item}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemText}>R$ {item.amount.toFixed(2)}</Text>
      <Text style={styles.itemDate}>
        Data: {format(parseISO(item.date), 'dd/MM/yyyy')}
      </Text>
      <TouchableOpacity
        style={styles.trashIcon}
        onPress={() => handleDeleteExpense(item.id)}>
       <Feather name="trash-2" size={18} color="#e74c3c" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Despesas - {category?.name}</Text>

      <Text style={styles.filterLabel}>Filtrar por data (AAAA-MM-DD):</Text>
      <TextInput
        placeholder="Início"
        value={filterStart}
        onChangeText={setFilterStart}
        style={styles.input}
      />
      <TextInput
        placeholder="Fim"
        value={filterEnd}
        onChangeText={setFilterEnd}
        style={styles.input}
      />

      <FlatList
        data={filteredExpenses}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.noData}>Nenhuma despesa registrada.</Text>
        }
        contentContainerStyle={styles.contentContainer}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+ Adicionar Despesa</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nova Despesa</Text>
            <TextInput
              placeholder="Descrição"
              value={title}
              onChangeText={setTitle}
              style={styles.input}
            />
            <TextInput
              placeholder="Valor (R$)"
              value={amount}
              onChangeText={setAmount}
              style={styles.input}
              keyboardType="numeric"
            />
            <TextInput
              placeholder="Data (AAAA-MM-DD)"
              value={date}
              onChangeText={setDate}
              style={styles.input}
            />
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleAddExpense}>
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
