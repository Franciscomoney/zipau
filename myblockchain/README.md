# Zipa Blockchain Backend (myblockchain)

Polkadot Paseo testnet revenue-sharing orchestrator for the Zipa platform.

## Overview

This service manages the blockchain layer for Zipa's impact investing platform:
- Establishes intellectual property on-chain via metadata storage
- Executes revenue-sharing flows between creator, platform, and investor wallets
- Tracks all transactions on Paseo testnet with Subscan explorer links

## Features

- **IP Registration:** Submit project metadata to create immutable on-chain records
- **Revenue Flows:** Automated token transfers (Creator → Platform → Investors)
- **Wallet Management:** Three derived wallets from single mnemonic (//0, //1, //2)
- **Transaction Tracking:** Full history with Subscan explorer integration

## Tech Stack

- Node.js + Express
- Polkadot.js API (Paseo testnet)
- PM2 process management
- In-memory stores for metadata and transaction history

## Setup

```bash
npm install
cp .env.example .env  # Add your ZIPA_ROOT_SEED
node src/server.js
```

The service will start on `http://localhost:2021` (or the PORT specified in .env).

## API Endpoints

- `GET /health` - Service health check
- `GET /wallets` - View all wallet balances
- `GET /metadata` - List IP records
- `POST /metadata` - Register new IP
- `POST /flow` - Execute complete revenue flow
- `POST /transfer/initial` - Creator → Platform transfer
- `POST /transfer/secondary` - Platform → Investor transfer

## Environment Variables

- `PORT` - Server port (default: 2021)
- `ZIPA_ROOT_SEED` - Mnemonic for wallet derivation
- `ESCROW_WALLET_SEED` - Alternative seed source

Visit `http://localhost:2021` after starting the server to access the web interface and full API documentation.
