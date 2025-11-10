'use client';

import { useState, useEffect } from 'react';
import { Expense } from '@/types';
import { loadExpenses, saveExpenses, deleteExpense as deleteExpenseFromStorage } from '@/utils/localStorage';
import ExpenseForm from '@/components/ExpenseForm';
import ExpenseList from '@/components/ExpenseList';
import Dashboard from '@/components/Dashboard';
import SpendingChart from '@/components/SpendingChart';
import ExportButton from '@/components/ExportButton';

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'expenses'>('dashboard');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load expenses from localStorage on mount
  useEffect(() => {
    const loadedExpenses = loadExpenses();
    setExpenses(loadedExpenses);
    setIsLoaded(true);
  }, []);

  const handleAddOrUpdateExpense = (expense: Expense) => {
    let updatedExpenses: Expense[];

    if (editingExpense) {
      // Update existing expense
      updatedExpenses = expenses.map(exp => exp.id === expense.id ? expense : exp);
      setEditingExpense(null);
    } else {
      // Add new expense
      updatedExpenses = [...expenses, expense];
    }

    setExpenses(updatedExpenses);
    saveExpenses(updatedExpenses);
  };

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense);
    setActiveTab('expenses');
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteExpense = (id: string) => {
    const updatedExpenses = deleteExpenseFromStorage(id);
    setExpenses(updatedExpenses);
  };

  const handleCancelEdit = () => {
    setEditingExpense(null);
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your expenses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Expense Tracker</h1>
              <p className="text-gray-600 mt-1">Manage your personal finances with ease</p>
            </div>
            <ExportButton expenses={expenses} />
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'dashboard'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('expenses')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'expenses'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {editingExpense ? 'Edit Expense' : 'Add Expense'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' ? (
          <div className="space-y-8">
            <Dashboard expenses={expenses} />
            <SpendingChart expenses={expenses} />
            <ExpenseList
              expenses={expenses}
              onEdit={handleEditExpense}
              onDelete={handleDeleteExpense}
            />
          </div>
        ) : (
          <div className="space-y-8">
            <ExpenseForm
              onSubmit={handleAddOrUpdateExpense}
              editingExpense={editingExpense}
              onCancel={handleCancelEdit}
            />

            {expenses.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Tip:</strong> Switch to the Dashboard tab to view your spending analytics and trends.
                </p>
              </div>
            )}

            {!editingExpense && expenses.length > 0 && (
              <ExpenseList
                expenses={expenses}
                onEdit={handleEditExpense}
                onDelete={handleDeleteExpense}
              />
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-600 text-sm">
            Built with Next.js 14, TypeScript, and Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
}
