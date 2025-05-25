import React from 'react';
import { render } from '@testing-library/react-native';
import ExpensesScreen from '../views/ExpensesScreen';
import { useCategoryStore } from '../viewmodels/useCategoryStore';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

describe('ExpensesScreen', () => {
  beforeEach(() => {
    useCategoryStore.setState({
      categories: [
        { id: '1', name: 'Casa', color: '#3498db' }
      ],
      expenses: [
        { id: '101', categoryId: '1', title: 'Luz', amount: 120, date: '2025-05-01' },
        { id: '102', categoryId: '1', title: 'Água', amount: 80, date: '2025-05-02' },
      ],
      income: 0,
    });
  });

  it('renderiza as despesas da categoria corretamente', () => {
    const component = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Expenses"
            component={ExpensesScreen}
            initialParams={{ categoryId: '1' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );

    expect(component.getByText('Despesas - Casa')).toBeTruthy();
    expect(component.getByText('Luz')).toBeTruthy();
    expect(component.getByText('Água')).toBeTruthy();
  });
});
