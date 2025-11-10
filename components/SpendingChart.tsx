'use client';

import { useMemo } from 'react';
import { Expense } from '@/types';
import { formatCurrency } from '@/utils/format';

interface SpendingChartProps {
  expenses: Expense[];
}

interface MonthlyData {
  month: string;
  amount: number;
  count: number;
}

export default function SpendingChart({ expenses }: SpendingChartProps) {
  const monthlyData = useMemo(() => {
    const dataMap = new Map<string, MonthlyData>();

    expenses.forEach(expense => {
      const date = new Date(expense.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const monthLabel = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });

      const existing = dataMap.get(monthKey);
      if (existing) {
        existing.amount += expense.amount;
        existing.count += 1;
      } else {
        dataMap.set(monthKey, {
          month: monthLabel,
          amount: expense.amount,
          count: 1,
        });
      }
    });

    // Sort by month and get last 6 months
    const sorted = Array.from(dataMap.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .slice(-6)
      .map(([, data]) => data);

    return sorted;
  }, [expenses]);

  const maxAmount = useMemo(
    () => Math.max(...monthlyData.map(d => d.amount), 1),
    [monthlyData]
  );

  if (monthlyData.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Spending Trends (Last 6 Months)</h2>

      <div className="space-y-6">
        {monthlyData.map((data, index) => {
          const percentage = (data.amount / maxAmount) * 100;

          return (
            <div key={index}>
              <div className="flex justify-between items-center mb-2">
                <div>
                  <span className="font-medium text-gray-700">{data.month}</span>
                  <span className="text-sm text-gray-500 ml-2">({data.count} {data.count === 1 ? 'expense' : 'expenses'})</span>
                </div>
                <span className="font-bold text-gray-900">{formatCurrency(data.amount)}</span>
              </div>

              <div className="relative w-full bg-gray-200 rounded-full h-8 overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-700 ease-out flex items-center justify-end pr-3"
                  style={{ width: `${Math.max(percentage, 5)}%` }}
                >
                  {percentage > 20 && (
                    <span className="text-xs font-semibold text-white">
                      {percentage.toFixed(0)}%
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Total for period */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-700">Total for Period</span>
          <span className="text-2xl font-bold text-blue-600">
            {formatCurrency(monthlyData.reduce((sum, d) => sum + d.amount, 0))}
          </span>
        </div>
      </div>
    </div>
  );
}
