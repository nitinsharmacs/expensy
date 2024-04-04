## Variables

1. SPREADSHEET_ID
2. SHEET_ID
3. USERNAME
4. PASSWORD
5. SESSION_SECRET
6. REDIS_URL

### SPREADSHEET_ID

`SPREADSHEET_ID` is a unique id you can from google spreadsheet url.

For example, in this url `https://docs.google.com/spreadsheets/d/<SPREADSHEET_ID>/edit#gid=0`.

### SHEET_ID

`SHEET_ID` is the id of sheet named **Daily Expenses**. To get this id, you need to switch to **Daily Expenses** sheet and take the id from the url.

You can get it from spreadsheet url like `https://docs.google.com/spreadsheets/d/<SPREADSHEET_ID>/edit#gid=<SHEET_ID>`.

### USERNAME

Login username that you will provide once you start the application.

### PASSWORD

Login password for above username.

### SESSION_SECRET

A secret text for express session.

### REDIS_URL

URL for redis database service. If you are running locally, you need to have redis database running on url `redis://localhost:6379`.
