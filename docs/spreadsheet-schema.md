# Google Spreadsheet Schema

Expensy uses google spreadsheet to store and consume expenses data. It requires you to structurize your spreadsheet in a particular manner.

Expensy requires following sheets in your spreadsheet:

1. Daily Expenses
2. Monthly Expenses
3. Expense Division - contains a list of expenses categories
4. metadata - contains total number of entries in daily expenses

Refer [this](https://docs.google.com/spreadsheets/d/1sP7lkiPczM7Mc3ftHNsVVgAHQn-ho_o-IRKr2mCw_VQ/edit?usp=sharing) test spreadsheet to create your.

### Rules and Formulas

#### Unique ID formula on **Daily Expenses** sheet

I have used `ArrayFormula(if(A2:A<>"",row(A2:A),""))` on cell `E2` to give row numbers to each row.

You can use any other mechanism to create unique IDs. **It is mandatory to have unique IDs for each row.**
