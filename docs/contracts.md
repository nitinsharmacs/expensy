## API Contracts

### `GET /api/monthly-expenses`

Response

```json
{
  "status": "http_status.OK",
  "expenses": [
    {
      "month": "month",
      "totalExpense": "total monthly expense",
      "expenses": [
        {
          "category": "expense category",
          "expense": 12
        },...
      ]
    },...
  ]
}
```

### `GET /api/recent-entries`

Response

```json
{
  "status": "http_status.OK",
  "entries": [
    {
      "id": "id",
      "category": "expense category",
      "date": "date, e.g Jan-2024",
      "amount": "expense, e.g -199",
      "description": "expense description/comment"
    },...
  ]
}
```

### `GET /api/categories`

Returns a list of expense categories from the sheet.

Response

```json
{
  "status": "http_status.OK",
  "categories": ["health & food", "life style", ...]
}
```

### `POST /api/entry`

Creates a new expense entry into the sheet.

Request

```json
{
  "date": "mm/dd/yyyy",
  "category": "category, e.g health",
  "amount": -100,
  "comment": "expense description"
}
```

Response

```json
{
  "status": "http_status.CREATED"
}
```

### `POST /api/entries`

Creates new expense entries into the sheet.

Request

```json
[
  {
    "date": "mm/dd/yyyy",
    "category": "category, e.g health",
    "amount": -100,
    "comment": "expense description"
  }, ...
]
```

Response

```json
{
  "status": "http_status.CREATED"
}
```

### `DELETE /api/delete-entries`

Request

```json
{
  "entryIDs": ["id-1", "id-2", ...]
}
```

Response

```json
{
  "status": "http_status.OK"
}
```

> Note: As of now only single entry deletion works. Added array of ids for future extension to multiple entries deletion.
