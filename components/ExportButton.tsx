'use client';

import { Expense } from '@/types';
import { exportToCSV } from '@/utils/export';

interface ExportButtonProps {
  expenses: Expense[];
}

export default function ExportButton({ expenses }: ExportButtonProps) {
  const handleExport = () => {
    const today = new Date().toISOString().split('T')[0];
    exportToCSV(expenses, `expenses-${today}.csv`);
  };

  return (
    <button
      onClick={handleExport}
      disabled={expenses.length === 0}
      className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 ${
        expenses.length === 0
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : 'bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
      }`}
      title={expenses.length === 0 ? 'No expenses to export' : 'Export expenses to CSV'}
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      Export CSV
    </button>
  );
}
