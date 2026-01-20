# Pet Project: Vue + Fastify + TradingView

## Development Setup

```bash
nvm use 20.19.0
```
```bash
yarn --cwd apps/client dev
```
```bash
yarn --cwd apps/server dev
```


## Server Architecture

### Store-driven Modules

```
[schema -> types] -> [store] -> [service]
                                   │ │
                                   │  -----> [routes]
                                   │
                                    -------> [tickers]
```

- **schema/types** — Zod validation schemas + TypeScript types
- **store** — in-memory storage (repository, mutations, selectors)
- **service** — business logic, interacts with store
- **routes** — HTTP endpoints (Fastify)
- **tickers** — WebSocket broadcasting (Socket.io)

### API: Pagination & Sorting

```bash
GET /api/crypto?page=2&limit=10
GET /api/crypto?sort=price&order=desc
```

Response:
```json
{
  "data": [
    { "rank": 1, "name": "Bitcoin", "symbol": "BTC" },
    { "rank": 2, "name": "Ethereum", "symbol": "ETH" }
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
```

## Chart Architecture

## Why Data is Stored In-Memory on the Server

The main goal of this project is to demonstrate random chart generation on the server (splitting into tickers and state mutation for real-time data updates) and working with charts in Vue (fetching data for initial render + subscribing to WebSocket updates).
Using an external database would be overkill, so the server stores 365 days of data for each cryptocurrency directly in memory.

### Data Flow

```
┌──────────────────────────────────────────────────────────────┐
│  1. INITIAL REQUEST (HTTP)                                   │
│  ─────────────────────────────────────────────────────────── │
│  Client: useCryptoBySymbol({symbol: 'BTC', period: '7d'})    │
│          → GET /api/crypto/BTC?period=7d                     │
│                                                              │
│  Server: Fetches 365 days from in-memory store               │
│          → Filters to requested period (7d, 24h, 1y...)      │
│          → Returns ~300 points + timestamps                  │
└──────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────┐
│  2. WEBSOCKET SUBSCRIPTION                                   │
│  ─────────────────────────────────────────────────────────── │
│  Client: socket.emit('subscribe', ['BTC'])                   │
│  Server: socket.join('BTC')  // room-based broadcasting      │
└──────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────┐
│  3. REAL-TIME UPDATES (every 1.5 sec)                        │
│  ─────────────────────────────────────────────────────────── │
│  Server:                                                     │
│    - mutateRow() for each crypto                             │
│    - Δ price = ±0.5% random                                  │
│    - Adds new point to sparkline                             │
│    - io.emit('ticker:batch', updated)                        │
│                                                              │
│  Client:                                                     │
│    - Receives 'ticker:batch'                                 │
│    - Shifts points left (removes oldest)                     │
│    - Adds new point on the right                             │
│    - Chart re-renders                                        │
└──────────────────────────────────────────────────────────────┘
```
The accelerated interval (1.5 sec instead of real 5 minutes) allows you to visually observe changes across all charts simultaneously.