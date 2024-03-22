type Expense = {
  category: string;
  expense: number;
};

export type MonthlyExpense = {
  month: string;
  expenses: Expense[];
  totalExpense: string;
};

export interface MonthlyExpensesProps {
  monthlyExpenses: MonthlyExpense[];
}

export interface MonthlyExpenseItemProps {
  month: string;
  totalExpense: string;
}
