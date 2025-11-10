import { Expense } from '@/types';
import { formatDate } from './format';

export const exportToCSV = (expenses: Expense[], filename: string = 'expenses.csv'): void => {
  if (expenses.length === 0) {
    alert('No expenses to export');
    return;
  }

  // CSV headers
  const headers = ['Date', 'Amount', 'Category', 'Description'];

  // Convert expenses to CSV rows
  const rows = expenses.map(expense => [
    formatDate(expense.date),
    expense.amount.toFixed(2),
    expense.category,
    `"${expense.description.replace(/"/g, '""')}"` // Escape quotes in description
  ]);

  // Combine headers and rows
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};
