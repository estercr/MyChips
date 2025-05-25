import { useCategoryStore } from '../viewmodels/useCategoryStore';

describe('useCategoryStore', () => {
  beforeEach(() => {
    useCategoryStore.setState({
      categories: [],
      expenses: [],
      income: 0,
    });
  });

  it('adiciona uma categoria corretamente', () => {
    useCategoryStore.getState().addCategory({
      id: '1',
      name: 'Alimentação',
      color: '#ff0000',
    });
    const categories = useCategoryStore.getState().categories;
    expect(categories).toHaveLength(1);
    expect(categories[0].name).toBe('Alimentação');
  });

  it('atualiza a renda mensal corretamente', () => {
    useCategoryStore.getState().setIncome(5000);
    const income = useCategoryStore.getState().income;
    expect(income).toBe(5000);
  });
});
