import { Expense } from '@/types';

const STORAGE_KEY = 'expense-tracker-data';

export const loadExpenses = (): Expense[] => {
  if (typeof window === 'undefined') return [];

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading expenses:', error);
    return [];
  }
};

export const saveExpenses = (expenses: Expense[]): void => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  } catch (error) {
    console.error('Error saving expenses:', error);
  }
};

export const addExpense = (expense: Expense): Expense[] => {
  const expenses = loadExpenses();
  const updatedExpenses = [...expenses, expense];
  saveExpenses(updatedExpenses);
  return updatedExpenses;
};

export const updateExpense = (id: string, updatedExpense: Expense): Expense[] => {
  const expenses = loadExpenses();
  const updatedExpenses = expenses.map(exp =>
    exp.id === id ? updatedExpense : exp
  );
  saveExpenses(updatedExpenses);
  return updatedExpenses;
};

export const deleteExpense = (id: string): Expense[] => {
  const expenses = loadExpenses();
  const updatedExpenses = expenses.filter(exp => exp.id !== id);
  saveExpenses(updatedExpenses);
  return updatedExpenses;
};
