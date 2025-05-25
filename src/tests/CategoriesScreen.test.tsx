import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import CategoriesScreen from '../views/CategoriesScreen';
import {useCategoryStore} from '../viewmodels/useCategoryStore';
import {NavigationContainer} from '@react-navigation/native';

describe('CategoriesScreen', () => {
  beforeEach(() => {
    useCategoryStore.setState({
      categories: [{id: '1', name: 'Transporte', color: '#ff6600'}],
      expenses: [],
      income: 0,
    });
  });

  it('renderiza categoria na lista', () => {
    const {getByText} = render(
      <NavigationContainer>
        <CategoriesScreen />
      </NavigationContainer>,
    );
    expect(getByText('Transporte')).toBeTruthy();
  });

  it('abre o modal de nova categoria ao clicar no botão', () => {
    const {getByText} = render(
      <NavigationContainer>
        <CategoriesScreen />
      </NavigationContainer>,
    );
    fireEvent.press(getByText('+ Adicionar Categoria'));
    expect(getByText('Nova Categoria')).toBeTruthy();
  });
});
