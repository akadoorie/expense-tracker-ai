import { Expense, ExpenseSummary, ExpenseCategory } from '@/types';
import { isThisMonth } from './format';

export const calculateExpenseSummary = (expenses: Expense[]): ExpenseSummary => {
  const totalSpending = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const monthlyExpenses = expenses.filter(expense => isThisMonth(expense.date));
  const monthlySpending = monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  const averageExpense = expenses.length > 0 ? totalSpending / expenses.length : 0;
  const expenseCount = expenses.length;

  // Calculate category breakdown
  const categoryTotals: Record<ExpenseCategory, number> = {
    Food: 0,
    Transportation: 0,
    Entertainment: 0,
    Shopping: 0,
    Bills: 0,
    Other: 0,
  };

  expenses.forEach(expense => {
    categoryTotals[expense.category] += expense.amount;
  });

  const categoryBreakdown = (Object.keys(categoryTotals) as ExpenseCategory[])
    .map(category => ({
      category,
      amount: categoryTotals[category],
      percentage: totalSpending > 0 ? (categoryTotals[category] / totalSpending) * 100 : 0,
    }))
    .filter(item => item.amount > 0)
    .sort((a, b) => b.amount - a.amount);

  return {
    totalSpending,
    monthlySpending,
    averageExpense,
    expenseCount,
    categoryBreakdown,
  };
};

export const filterExpenses = (
  expenses: Expense[],
  filters: {
    category?: string;
    startDate?: string;
    endDate?: string;
    searchTerm?: string;
  }
): Expense[] => {
  return expenses.filter(expense => {
    // Category filter
    if (filters.category && filters.category !== 'All' && expense.category !== filters.category) {
      return false;
    }

    // Date range filter
    if (filters.startDate) {
      const expenseDate = new Date(expense.date);
      const startDate = new Date(filters.startDate);
      if (expenseDate < startDate) {
        return false;
      }
    }

    if (filters.endDate) {
      const expenseDate = new Date(expense.date);
      const endDate = new Date(filters.endDate);
      if (expenseDate > endDate) {
        return false;
      }
    }

    // Search term filter
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      const matchesDescription = expense.description.toLowerCase().includes(searchLower);
      const matchesCategory = expense.category.toLowerCase().includes(searchLower);
      const matchesAmount = expense.amount.toString().includes(searchLower);

      if (!matchesDescription && !matchesCategory && !matchesAmount) {
        return false;
      }
    }

    return true;
  });
};

export const sortExpenses = (expenses: Expense[], sortBy: 'date' | 'amount' = 'date', order: 'asc' | 'desc' = 'desc'): Expense[] => {
  return [...expenses].sort((a, b) => {
    let comparison = 0;

    if (sortBy === 'date') {
      comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (sortBy === 'amount') {
      comparison = a.amount - b.amount;
    }

    return order === 'asc' ? comparison : -comparison;
  });
};
