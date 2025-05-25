import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useCategoryStore} from '../viewmodels/useCategoryStore';
import {Expense} from '../models/Expense';
import uuid from 'react-native-uuid';
import {format, parseISO, isWithinInterval} from 'date-fns';

type RootStackParamList = {
  Expenses: { categoryId: string };
};

type ExpensesScreenRouteProp = RouteProp<RootStackParamList, 'Expenses'>;

export default function ExpensesScreen() {
  const route = useRoute<ExpensesScreenRouteProp>();
  const { categoryId } = route.params;
  const {
    expenses,
    addExpense,
    categories,
  } = useCategoryStore();

  const category = categories.find((cat) => cat.id === categoryId);
  const categoryExpenses = expenses.filter((e) => e.categoryId === categoryId);

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

  const renderItem = ({ item }: { item: Expense }) => (
    <View style={styles.item}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemText}>R$ {item.amount.toFixed(2)}</Text>
      <Text style={styles.itemDate}>Data: {format(parseISO(item.date), 'dd/MM/yyyy')}</Text>
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
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.noData}>Nenhuma despesa registrada.</Text>}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
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
            <TouchableOpacity style={styles.saveButton} onPress={handleAddExpense}>
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
    marginBottom: 10,
  },
  filterLabel: {
    fontSize: 14,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
  },
  item: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 6,
    marginBottom: 10,
  },
  itemTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  itemText: {
    color: '#333',
  },
  itemDate: {
    fontStyle: 'italic',
    fontSize: 12,
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
  noData: {
    marginTop: 20,
    fontStyle: 'italic',
    color: '#888',
    textAlign: 'center',
  },
});
