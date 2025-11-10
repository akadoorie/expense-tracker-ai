# Expense Tracker - Personal Finance Manager

A modern, professional expense tracking web application built with Next.js 14, TypeScript, and Tailwind CSS. Track your expenses, analyze spending patterns, and export your financial data with ease.

## Features

### Core Functionality
- **Add/Edit/Delete Expenses**: Manage your expenses with an intuitive form
- **Smart Validation**: Real-time form validation to ensure data accuracy
- **Category Management**: Organize expenses into 6 categories (Food, Transportation, Entertainment, Shopping, Bills, Other)
- **LocalStorage Persistence**: All data is stored locally in your browser

### Analytics & Insights
- **Dashboard Overview**: View key metrics at a glance
  - Total spending across all time
  - Monthly spending
  - Average expense amount
  - Total number of expenses
- **Category Breakdown**: Visual representation of spending by category with percentages
- **Spending Trends**: Month-by-month spending visualization for the last 6 months
- **Real-time Calculations**: All statistics update instantly as you add/edit expenses

### Advanced Features
- **Search & Filter**:
  - Search by description, category, or amount
  - Filter by date range
  - Filter by category
  - Multiple sort options (date, amount)
- **CSV Export**: Export all your expenses to CSV format for external analysis
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **User-Friendly Interface**:
  - Smooth animations and transitions
  - Loading states
  - Confirmation dialogs for destructive actions
  - Clear visual feedback

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS for modern, responsive design
- **State Management**: React hooks (useState, useEffect, useMemo)
- **Data Persistence**: Browser localStorage API
- **Form Validation**: Custom validation utilities

## Getting Started

### Prerequisites
- Node.js 18.x or later
- npm, yarn, or pnpm

### Installation

1. Navigate to the project directory:
```bash
cd expense-tracker-ai
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit:
```
http://localhost:3000
```

### Building for Production

```bash
npm run build
npm start
```

## Usage Guide

### Adding an Expense

1. Navigate to the "Add Expense" tab
2. Fill in the required fields:
   - **Date**: Select the expense date (cannot be in the future)
   - **Amount**: Enter the amount in USD (must be greater than 0)
   - **Category**: Choose from the available categories
   - **Description**: Provide a brief description (max 200 characters)
3. Click "Add Expense"

### Viewing Your Dashboard

1. Click on the "Dashboard" tab
2. View your summary cards showing:
   - Total spending
   - Current month spending
   - Average expense
   - Total number of expenses
3. Review the category breakdown bar chart
4. Analyze spending trends over the last 6 months

### Searching and Filtering Expenses

1. In the Expense History section:
   - Use the search bar to find specific expenses
   - Select a category filter
   - Choose date range filters
   - Sort by date or amount
2. Click "Clear Filters" to reset all filters

### Editing an Expense

1. Find the expense in the list
2. Click the "Edit" button
3. Modify the fields in the form
4. Click "Update Expense" or "Cancel" to discard changes

### Deleting an Expense

1. Find the expense in the list
2. Click the "Delete" button
3. Click "Confirm?" within 3 seconds to confirm deletion

### Exporting Data

1. Click the "Export CSV" button in the header
2. Your browser will download a CSV file with all expenses
3. The file includes: Date, Amount, Category, and Description
4. Open with Excel, Google Sheets, or any CSV viewer

## Project Structure

```
expense-tracker-ai/
├── app/
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Main application page
│   └── globals.css        # Global styles and Tailwind imports
├── components/
│   ├── Dashboard.tsx      # Summary cards and analytics
│   ├── ExpenseForm.tsx    # Add/edit expense form
│   ├── ExpenseList.tsx    # List with search and filters
│   ├── SpendingChart.tsx  # Monthly spending visualization
│   └── ExportButton.tsx   # CSV export functionality
├── types/
│   └── index.ts           # TypeScript type definitions
├── utils/
│   ├── calculations.ts    # Analytics and filtering logic
│   ├── export.ts          # CSV export utility
│   ├── format.ts          # Date and currency formatting
│   ├── localStorage.ts    # Data persistence
│   └── validation.ts      # Form validation logic
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.mjs
```

## Key Features Explained

### Form Validation
- Real-time validation with visual feedback
- Touched field tracking to show errors only after user interaction
- Comprehensive error messages
- Prevents invalid data submission

### Data Persistence
- Automatic saving to localStorage
- Data persists across browser sessions
- No server or database required
- Privacy-focused - all data stays on your device

### Responsive Design
- Mobile-first approach
- Breakpoints for tablet and desktop
- Touch-friendly interface
- Optimized layouts for all screen sizes

### Performance
- Memoized calculations to prevent unnecessary re-renders
- Efficient filtering and sorting algorithms
- Lazy loading of components
- Optimized bundle size

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Data Storage

All expense data is stored in your browser's localStorage. This means:
- ✅ Your data is private and never leaves your device
- ✅ No internet connection required after initial load
- ✅ Fast performance
- ⚠️ Data is tied to your browser - clearing browser data will delete expenses
- ⚠️ Data is not synced across devices

**Tip**: Regularly export your data to CSV as a backup!

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Customization

#### Adding New Categories
Edit `types/index.ts` to add categories to the `ExpenseCategory` type, then update the category arrays in components.

#### Changing Currency
Modify the `formatCurrency` function in `utils/format.ts` to use a different currency code.

#### Styling
All styles use Tailwind CSS. Customize colors and themes in `tailwind.config.ts`.

## Troubleshooting

### Data Not Persisting
- Ensure localStorage is enabled in your browser
- Check if you're in private/incognito mode (some browsers restrict localStorage)

### Application Not Loading
- Clear your browser cache
- Check the browser console for errors
- Ensure you're using a supported browser version

### Export Not Working
- Check that pop-ups are not blocked
- Ensure you have expenses to export
- Try a different browser if issues persist

## Future Enhancements

Potential features for future versions:
- Cloud sync and backup
- Multiple currency support
- Budget tracking and alerts
- Recurring expenses
- Receipt photo attachments
- Multi-user support
- Advanced reporting and charts
- Dark mode toggle

## License

This project is open source and available for personal and commercial use.

## Support

For issues, questions, or suggestions, please create an issue in the project repository.

---

Built with ❤️ using Next.js 14, TypeScript, and Tailwind CSS
