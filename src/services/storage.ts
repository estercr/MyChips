import AsyncStorage from '@react-native-async-storage/async-storage';
import { Category } from '../models/Category';
import { Expense } from '../models/Expense';

const CATEGORIES_KEY = 'mychips_categories';
const EXPENSES_KEY = 'mychips_expenses';
const INCOME_KEY = 'mychips_income';

export const storage = {
  async saveCategories(categories: Category[]) {
    await AsyncStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  },
  async getCategories(): Promise<Category[]> {
    const json = await AsyncStorage.getItem(CATEGORIES_KEY);
    return json ? JSON.parse(json) : [];
  },
  async saveExpenses(expenses: Expense[]) {
    await AsyncStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses));
  },
  async getExpenses(): Promise<Expense[]> {
    const json = await AsyncStorage.getItem(EXPENSES_KEY);
    return json ? JSON.parse(json) : [];
  },
  async saveIncome(income: number) {
    await AsyncStorage.setItem(INCOME_KEY, income.toString());
  },
  async getIncome(): Promise<number> {
    const value = await AsyncStorage.getItem(INCOME_KEY);
    return value ? parseFloat(value) : 0;
  },
};
