'use client';

import { Expense } from '@/types';
import { calculateExpenseSummary } from '@/utils/calculations';
import { formatCurrency } from '@/utils/format';
import { useMemo } from 'react';

interface DashboardProps {
  expenses: Expense[];
}

export default function Dashboard({ expenses }: DashboardProps) {
  const summary = useMemo(() => calculateExpenseSummary(expenses), [expenses]);

  const summaryCards = [
    {
      title: 'Total Spending',
      value: formatCurrency(summary.totalSpending),
      icon: '💰',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      iconBg: 'bg-blue-100',
    },
    {
      title: 'This Month',
      value: formatCurrency(summary.monthlySpending),
      icon: '📅',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
      iconBg: 'bg-green-100',
    },
    {
      title: 'Average Expense',
      value: formatCurrency(summary.averageExpense),
      icon: '📊',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
      iconBg: 'bg-purple-100',
    },
    {
      title: 'Total Expenses',
      value: summary.expenseCount.toString(),
      icon: '📝',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700',
      iconBg: 'bg-orange-100',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card, index) => (
          <div
            key={index}
            className={`${card.bgColor} rounded-lg p-6 shadow-sm border border-gray-100`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className={`${card.iconBg} p-3 rounded-lg text-2xl`}>{card.icon}</span>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">{card.title}</h3>
            <p className={`text-3xl font-bold ${card.textColor}`}>{card.value}</p>
          </div>
        ))}
      </div>

      {/* Category Breakdown */}
      {summary.categoryBreakdown.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Spending by Category</h2>
          <div className="space-y-4">
            {summary.categoryBreakdown.map((item) => (
              <div key={item.category}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-700">{item.category}</span>
                  <div className="text-right">
                    <span className="font-bold text-gray-900">{formatCurrency(item.amount)}</span>
                    <span className="text-sm text-gray-500 ml-2">({item.percentage.toFixed(1)}%)</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
