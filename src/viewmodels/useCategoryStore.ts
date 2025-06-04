import {useEffect} from 'react';
import {create} from 'zustand';

import {Category} from '../models/Category';
import {Expense} from '../models/Expense';
import {storage} from '../services/storage';

interface State {
  categories: Category[];
  expenses: Expense[];
  income: number;
  addCategory: (category: Category) => void;
  updateCategory: (updated: Category) => void;
  removeCategory: (categoryId: string) => void;
  addExpense: (expense: Expense) => void;
  removeExpense: (expenseId: string) => void;
  setIncome: (income: number) => void;
  loadData: () => void;
}

export const useCategoryStore = create<State>((set, get) => ({
  categories: [],
  expenses: [],
  income: 0,

  addCategory: category => {
    const updated = [...get().categories, category];
    set({categories: updated});
    storage.saveCategories(updated);
  },

  updateCategory: updatedCategory => {
    const updated = get().categories.map(cat =>
      cat.id === updatedCategory.id ? updatedCategory : cat,
    );
    set({categories: updated});
    storage.saveCategories(updated);
  },
  removeCategory: categoryId => {
    const updated = get().categories.filter(cat => cat.id !== categoryId);
    set({categories: updated});
    storage.saveCategories(updated);
  },
  addExpense: expense => {
    const updated = [...get().expenses, expense];
    set({expenses: updated});
    storage.saveExpenses(updated);
  },
  removeExpense: expenseId => {
    const updated = get().expenses.filter(exp => exp.id !== expenseId);
    set({expenses: updated});
    storage.saveExpenses(updated);
  },

  setIncome: income => {
    set({income});
    storage.saveIncome(income);
  },

  loadData: async () => {
    const [categories, expenses, income] = await Promise.all([
      storage.getCategories(),
      storage.getExpenses(),
      storage.getIncome(),
    ]);
    set({categories, expenses, income});
  },
}));

export function useInitializeStore() {
  const loadData = useCategoryStore(state => state.loadData);
  useEffect(() => {
    loadData();
  }, [loadData]);
}
