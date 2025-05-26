import React, {useState} from 'react';
import {
  Text,
  TextInput,
  Dimensions,
  ScrollView,
} from 'react-native';
import {useCategoryStore} from '../../viewmodels/useCategoryStore';
import {PieChart} from 'react-native-chart-kit';
import {styles} from './styles';

const screenWidth = Dimensions.get('window').width;

export default function DashboardScreen() {
  const {expenses, income, setIncome, categories} = useCategoryStore();
  const [inputValue, setInputValue] = useState(income.toString());

  const handleIncomeChange = (value: string) => {
    setInputValue(value);
    const num = parseFloat(value.replace(',', '.'));
    if (!isNaN(num)) {
      setIncome(num);
    }
  };

  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);

  const chartData = categories
    .map(cat => {
      const catTotal = expenses
        .filter(e => e.categoryId === cat.id)
        .reduce((sum, e) => sum + e.amount, 0);
      return {
        name: cat.name,
        amount: catTotal,
        color: cat.color,
        legendFontColor: '#7F7F7F',
        legendFontSize: 12,
      };
    })
    .filter(data => data.amount > 0);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Resumo do Mês</Text>
      <Text style={styles.label}>Valor recebido:</Text>
      <TextInput
        style={styles.input}
        value={inputValue}
        onChangeText={handleIncomeChange}
        keyboardType="numeric"
        placeholder="0.00"
      />
      <Text style={styles.summary}>
        Total gasto: R$ {totalSpent.toFixed(2)}
      </Text>
      <Text style={styles.summary}>
        Saldo restante: R$ {(income - totalSpent).toFixed(2)}
      </Text>

      {chartData.length > 0 ? (
        <PieChart
          data={chartData}
          width={screenWidth - 20}
          height={220}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="amount"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      ) : (
        <Text style={styles.noData}>Nenhum gasto registrado ainda.</Text>
      )}
    </ScrollView>
  );
}