export type Category = string;

export type NewEntryState = { [key: string]: string | number } & {
  date: string;
  category: string;
  amount: number;
  comment: string;
};

export interface NewEntryProps {
  onSubmit: (state: NewEntryState) => void;
  categories: Category[];
}
