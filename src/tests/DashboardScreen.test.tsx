import React from 'react';
import { render } from '@testing-library/react-native';
import DashboardScreen from '../views/DashboardScreen';
import { ThemeProvider, LightTheme } from '../theme/ThemeContext';
import { useCategoryStore } from '../viewmodels/useCategoryStore';

describe('DashboardScreen', () => {
  beforeEach(() => {
    useCategoryStore.setState({
      categories: [],
      expenses: [],
      income: 0,
    });
  });

  it('renderiza corretamente com texto padrão', () => {
    const { getByText } = render(
      <ThemeProvider value={LightTheme}>
        <DashboardScreen />
      </ThemeProvider>
    );

    expect(getByText('Resumo do Mês')).toBeTruthy();
    expect(getByText('Valor recebido:')).toBeTruthy();
    expect(getByText('Total gasto: R$ 0.00')).toBeTruthy();
  });
});
