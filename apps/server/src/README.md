# Architecture

## Modules - Store-driven:
    [schema->types] -> [store] -> [service]
                                     | |
                                     |  -----> [routes]
                                     |
                                      -------> [tickers]



### Support for pagination and sorting
```bash
GET /api/crypto?page=2&limit=10
GET /api/crypto?sort=price&order=desc
```
```json
{
  "data": [
    { "id": 1, "name": "Bitcoin" },
    { "id": 2, "name": "Ethereum" }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8,
    "hasNext": true,
    "hasPrev": false
  }
}