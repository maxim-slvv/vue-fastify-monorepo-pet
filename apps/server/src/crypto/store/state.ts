import { ICryptoServerRow } from '../types.ts'
import { createSparkline, createBasicCoinData } from './generators.ts'

export const initialCryptoRows: ICryptoServerRow[] = [
  {
    rank: 1,
    name: 'Bitcoin',
    spark: createSparkline(21, 120, 3),
    isFavorite: true,
    ...createBasicCoinData('BTC', 'Bitcoin', '766,432,564,346', '38,544,965,954', {
      priceRange: [45000, 55000],
      ch24hRange: [0, 8],
      ch7dRange: [15, 25],
      launchYear: 2009,
    }),
    // Override with real Bitcoin data
    site: 'https://bitcoin.org',
    totalSupply: '19,789,431 BTC',
    maxSupply: '21,000,000 BTC',
    circulatingSupply: '19,789,431 BTC',
    socialNetworks: {
      twitter: 'https://twitter.com/bitcoin',
      telegram: 'https://t.me/BitcoinCore',
      discord: 'https://discord.gg/bitcoin',
      reddit: 'https://reddit.com/r/bitcoin',
    },
    explorers: [
      {
        name: 'Blockchain.info',
        url: 'https://blockchain.info',
      },
      {
        name: 'Blockchair',
        url: 'https://blockchair.com/bitcoin',
      },
    ],
    wallets: [
      {
        name: 'Bitcoin Core',
        url: 'https://bitcoincore.org',
      },
      {
        name: 'Electrum',
        url: 'https://electrum.org',
      },
    ],
    ucid: 'bitcoin-btc-1',
    allTimeHigh: {
      price: 73738,
      date: '2024-03-14',
    },
    allTimeLow: {
      price: 0.0495,
      date: '2010-10-29',
    },
  },
  {
    rank: 2,
    name: 'Ethereum',
    spark: createSparkline(21, 115, 3),
    isFavorite: true,
    ...createBasicCoinData('ETH', 'Ethereum', '285,843,885,844', '24,954,954,953', {
      priceRange: [2400, 2700],
      ch24hRange: [1, 4],
      ch7dRange: [20, 25],
      launchYear: 2015,
    }),
    // Override with real Ethereum data
    site: 'https://ethereum.org',
    totalSupply: '120,400,000 ETH',
    maxSupply: 'No Limit',
    circulatingSupply: '120,400,000 ETH',
    socialNetworks: {
      twitter: 'https://twitter.com/ethereum',
      reddit: 'https://reddit.com/r/ethereum',
    },
    explorers: [
      {
        name: 'Etherscan',
        url: 'https://etherscan.io',
      },
    ],
    wallets: [
      {
        name: 'MetaMask',
        url: 'https://metamask.io',
      },
    ],
    ucid: 'ethereum-eth-1027',
    allTimeHigh: {
      price: 4878.26,
      date: '2021-11-10',
    },
    allTimeLow: {
      price: 0.432979,
      date: '2015-10-20',
    },
  },
  {
    rank: 3,
    name: 'Tether',
    spark: createSparkline(21, 100, 0.5),
    ...createBasicCoinData('USDT', 'Tether', '112,000,000,000', '56,000,000,000', {
      priceRange: [0.99, 1.01],
      ch24hRange: [-0.2, 0.2],
      ch7dRange: [-0.1, 0.1],
      launchYear: 2014,
    }),
  },
  {
    rank: 4,
    name: 'Cardano',
    spark: createSparkline(21, 62, 2.5),
    ...createBasicCoinData('ADA', 'Cardano', '21,500,000,000', '850,000,000', {
      priceRange: [0.5, 0.8],
      ch24hRange: [0, 2],
      ch7dRange: [2, 4],
      launchYear: 2017,
    }),
  },
  {
    rank: 5,
    name: 'Bitcoin Cash',
    spark: createSparkline(21, 120, 3),
    ...createBasicCoinData('BCH', 'Bitcoin Cash', '8,200,000,000', '320,000,000', {
      priceRange: [350, 450],
      ch24hRange: [0, 1.5],
      ch7dRange: [3, 5],
      launchYear: 2017,
    }),
  },
  {
    rank: 6,
    name: 'Litecoin',
    spark: createSparkline(21, 95, 2.5),
    ...createBasicCoinData('LTC', 'Litecoin', '5,300,000,000', '240,000,000', {
      priceRange: [65, 85],
      ch24hRange: [0.5, 2],
      ch7dRange: [2, 4],
      launchYear: 2011,
    }),
  },
  {
    rank: 7,
    name: 'Dogecoin',
    spark: createSparkline(21, 45, 4),
    ...createBasicCoinData('DOGE', 'Dogecoin', '17,400,000,000', '1,100,000,000', {
      priceRange: [0.1, 0.15],
      ch24hRange: [-3, 3],
      ch7dRange: [4, 6],
      launchYear: 2013,
    }),
  },
  {
    rank: 8,
    name: 'Solana',
    spark: createSparkline(21, 130, 3),
    ...createBasicCoinData('SOL', 'Solana', '63,000,000,000', '2,300,000,000', {
      priceRange: [120, 160],
      ch24hRange: [1, 3],
      ch7dRange: [5, 7],
      launchYear: 2020,
    }),
  },
  {
    rank: 9,
    name: 'Uniswap',
    spark: createSparkline(21, 85, 2.5),
    isFavorite: false,
    ...createBasicCoinData('UNI', 'Uniswap', '4,800,000,000', '180,000,000', {
      priceRange: [7, 10],
      ch24hRange: [-2, 2],
      ch7dRange: [3, 5],
      launchYear: 2020,
    }),
  },
  {
    rank: 10,
    name: 'Shiba Inu',
    spark: createSparkline(21, 35, 5),
    ...createBasicCoinData('SHIB', 'Shiba Inu', '9,100,000,000', '420,000,000', {
      priceRange: [0.00001, 0.00003],
      launchYear: 2020,
    }),
  },
  {
    rank: 11,
    name: 'Toncoin',
    spark: createSparkline(21, 70, 2.2),
    ...createBasicCoinData('TON', 'Toncoin', '21,000,000,000', '500,000,000', {
      priceRange: [5, 7],
      launchYear: 2018,
    }),
  },
  {
    rank: 12,
    name: 'Stellar',
    spark: createSparkline(21, 55, 2),
    ...createBasicCoinData('XLM', 'Stellar', '3,400,000,000', '120,000,000', {
      priceRange: [0.1, 0.15],
      launchYear: 2014,
    }),
  },
  {
    rank: 13,
    name: 'Sui',
    spark: createSparkline(21, 60, 2.5),
    ...createBasicCoinData('SUI', 'Sui', '1,800,000,000', '95,000,000', {
      priceRange: [1.2, 1.6],
      launchYear: 2023,
    }),
  },
  {
    rank: 14,
    name: 'Radworks',
    spark: createSparkline(21, 60, 2.5),
    ...createBasicCoinData('RAD', 'Radworks', '120,000,000', '9,000,000', { priceRange: [2, 3] }),
  },
  {
    rank: 15,
    name: 'PROVE',
    spark: createSparkline(21, 45, 4),
    ...createBasicCoinData('PROVE', 'PROVE', '15,000,000', '1,200,000', {
      priceRange: [0.1, 0.15],
    }),
  },
  {
    rank: 16,
    name: 'PENGU',
    spark: createSparkline(21, 40, 4),
    ...createBasicCoinData('PENGU', 'PENGU', '8,000,000', '600,000', {
      priceRange: [0.025, 0.035],
      launchYear: 2024,
    }),
  },
  {
    rank: 17,
    name: 'Magic',
    spark: createSparkline(21, 75, 3.2),
    ...createBasicCoinData('MAGIC', 'Magic', '250,000,000', '20,000,000', {
      priceRange: [0.7, 1],
    }),
  },
  {
    rank: 18,
    name: 'Pepe',
    spark: createSparkline(21, 30, 5),
    ...createBasicCoinData('PEPE', 'Pepe', '4,500,000,000', '650,000,000', {
      priceRange: [0.000008, 0.000012],
      launchYear: 2023,
    }),
  },
  {
    rank: 19,
    name: 'Popcat',
    spark: createSparkline(21, 50, 4.5),
    ...createBasicCoinData('POPCAT', 'Popcat', '120,000,000', '9,500,000', {
      priceRange: [0.18, 0.22],
    }),
  },
  {
    rank: 20,
    name: 'Meme',
    spark: createSparkline(21, 42, 3.8),
    ...createBasicCoinData('MEME', 'Meme', '20,000,000', '1,700,000', {
      priceRange: [0.015, 0.025],
    }),
  },
  {
    rank: 21,
    name: 'dogwifhat',
    spark: createSparkline(21, 80, 4),
    ...createBasicCoinData('WIF', 'dogwifhat', '2,400,000,000', '180,000,000', {
      priceRange: [2, 3],
      launchYear: 2023,
    }),
  },
  {
    rank: 22,
    name: 'TRUMP',
    spark: createSparkline(21, 95, 3.5),
    ...createBasicCoinData('TRUMP', 'TRUMP', '500,000,000', '40,000,000', {
      priceRange: [6, 8],
      launchYear: 2024,
    }),
  },
]
