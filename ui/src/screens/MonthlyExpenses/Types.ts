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
  open: boolean;
  close: () => void;
}

export interface MonthlyExpenseItemProps {
  month: string;
  totalExpense: string;
  onClick: (month: string) => void;
}

export interface MonthlyExpensesBreakdownProps {
  monthlyExpense: MonthlyExpense;
  open: boolean;
  close: () => void;
}
