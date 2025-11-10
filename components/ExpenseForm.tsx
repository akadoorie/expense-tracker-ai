'use client';

import { useState, useEffect } from 'react';
import { Expense, ExpenseCategory, ExpenseFormData } from '@/types';
import { validateExpenseForm, hasErrors, ValidationErrors } from '@/utils/validation';
import { formatDateForInput } from '@/utils/format';

interface ExpenseFormProps {
  onSubmit: (expense: Expense) => void;
  editingExpense?: Expense | null;
  onCancel?: () => void;
}

const categories: ExpenseCategory[] = [
  'Food',
  'Transportation',
  'Entertainment',
  'Shopping',
  'Bills',
  'Other',
];

export default function ExpenseForm({ onSubmit, editingExpense, onCancel }: ExpenseFormProps) {
  const [formData, setFormData] = useState<ExpenseFormData>({
    date: formatDateForInput(new Date().toISOString()),
    amount: '',
    category: 'Other',
    description: '',
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (editingExpense) {
      setFormData({
        date: formatDateForInput(editingExpense.date),
        amount: editingExpense.amount.toString(),
        category: editingExpense.category,
        description: editingExpense.description,
      });
    }
  }, [editingExpense]);

  const handleChange = (field: keyof ExpenseFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (touched[field]) {
      // Revalidate on change if field was touched
      const newFormData = { ...formData, [field]: value };
      const newErrors = validateExpenseForm(newFormData);
      setErrors(newErrors);
    }
  };

  const handleBlur = (field: keyof ExpenseFormData) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const newErrors = validateExpenseForm(formData);
    setErrors(newErrors);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      date: true,
      amount: true,
      category: true,
      description: true,
    });

    const validationErrors = validateExpenseForm(formData);
    setErrors(validationErrors);

    if (!hasErrors(validationErrors)) {
      const expense: Expense = {
        id: editingExpense?.id || `expense-${Date.now()}-${Math.random()}`,
        date: new Date(formData.date).toISOString(),
        amount: parseFloat(formData.amount),
        category: formData.category,
        description: formData.description.trim(),
        createdAt: editingExpense?.createdAt || new Date().toISOString(),
      };

      onSubmit(expense);

      // Reset form if not editing
      if (!editingExpense) {
        setFormData({
          date: formatDateForInput(new Date().toISOString()),
          amount: '',
          category: 'Other',
          description: '',
        });
        setTouched({});
        setErrors({});
      }
    }
  };

  const handleCancelEdit = () => {
    setFormData({
      date: formatDateForInput(new Date().toISOString()),
      amount: '',
      category: 'Other',
      description: '',
    });
    setTouched({});
    setErrors({});
    onCancel?.();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {editingExpense ? 'Edit Expense' : 'Add New Expense'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Date Input */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Date *
            </label>
            <input
              type="date"
              id="date"
              value={formData.date}
              onChange={(e) => handleChange('date', e.target.value)}
              onBlur={() => handleBlur('date')}
              className={`w-full px-4 py-2 border rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.date && touched.date ? 'border-red-500' : 'border-gray-300'
              }`}
              max={formatDateForInput(new Date().toISOString())}
            />
            {errors.date && touched.date && (
              <p className="text-red-500 text-sm mt-1">{errors.date}</p>
            )}
          </div>

          {/* Amount Input */}
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
              Amount (USD) *
            </label>
            <input
              type="number"
              id="amount"
              value={formData.amount}
              onChange={(e) => handleChange('amount', e.target.value)}
              onBlur={() => handleBlur('amount')}
              placeholder="0.00"
              step="0.01"
              min="0"
              className={`w-full px-4 py-2 border rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.amount && touched.amount ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.amount && touched.amount && (
              <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
            )}
          </div>
        </div>

        {/* Category Select */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category *
          </label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) => handleChange('category', e.target.value as ExpenseCategory)}
            onBlur={() => handleBlur('category')}
            className={`w-full px-4 py-2 border rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.category && touched.category ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && touched.category && (
            <p className="text-red-500 text-sm mt-1">{errors.category}</p>
          )}
        </div>

        {/* Description Input */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description *
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            onBlur={() => handleBlur('description')}
            placeholder="What did you spend on?"
            rows={3}
            maxLength={200}
            className={`w-full px-4 py-2 border rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
              errors.description && touched.description ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          <div className="flex justify-between items-center mt-1">
            <div>
              {errors.description && touched.description && (
                <p className="text-red-500 text-sm">{errors.description}</p>
              )}
            </div>
            <p className="text-gray-500 text-sm">{formData.description.length}/200</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {editingExpense ? 'Update Expense' : 'Add Expense'}
          </button>

          {editingExpense && onCancel && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="flex-1 bg-gray-200 text-gray-700 py-2 px-6 rounded-lg font-medium hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
