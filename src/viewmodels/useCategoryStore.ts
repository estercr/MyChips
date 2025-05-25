import { create } from 'zustand';
import { Category } from '../models/Category';
import { Expense } from '../models/Expense';
import { storage } from '../services/storage';
import { useEffect } from 'react';

interface State {
  categories: Category[];
  expenses: Expense[];
  income: number;
  addCategory: (category: Category) => void;
  addExpense: (expense: Expense) => void;
  setIncome: (income: number) => void;
  loadData: () => void;
}

export const useCategoryStore = create<State>((set, get) => ({
  categories: [],
  expenses: [],
  income: 0,

  addCategory: (category) => {
    const updated = [...get().categories, category];
    set({ categories: updated });
    storage.saveCategories(updated);
  },

  addExpense: (expense) => {
    const updated = [...get().expenses, expense];
    set({ expenses: updated });
    storage.saveExpenses(updated);
  },

  setIncome: (income) => {
    set({ income });
    storage.saveIncome(income);
  },

  loadData: async () => {
    const [categories, expenses, income] = await Promise.all([
      storage.getCategories(),
      storage.getExpenses(),
      storage.getIncome(),
    ]);
    set({ categories, expenses, income });
  },
}));

// Hook para carregar dados ao iniciar o app
export function useInitializeStore() {
  const loadData = useCategoryStore((state) => state.loadData);
  useEffect(() => {
    loadData();
  }, [loadData]);
}
