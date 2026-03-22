export interface CryptoAsset {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
  sparkline: number[];
}

export interface Trade {
  id: string;
  asset: string;
  type: "buy" | "sell";
  amount: number;
  price: number;
  timestamp: Date;
  pnl?: number;
}

export interface LeaderboardEntry {
  rank: number;
  username: string;
  avatar: string;
  portfolio: number;
  pnl: number;
  trades: number;
  winRate: number;
}

// Generate realistic sparkline data
function generateSparkline(basePrice: number, volatility: number): number[] {
  const points = 24;
  const data: number[] = [];
  let price = basePrice * (1 - volatility * 0.5);
  
  for (let i = 0; i < points; i++) {
    const change = (Math.random() - 0.5) * volatility * basePrice;
    price = Math.max(price + change, basePrice * 0.8);
    data.push(price);
  }
  
  // Make the last point close to the current price
  data[data.length - 1] = basePrice;
  return data;
}

export const cryptoAssets: CryptoAsset[] = [
  {
    id: "bitcoin",
    symbol: "BTC",
    name: "Bitcoin",
    price: 67432.18,
    change24h: 2.34,
    volume24h: 28_500_000_000,
    marketCap: 1_320_000_000_000,
    sparkline: generateSparkline(67432.18, 0.03),
  },
  {
    id: "ethereum",
    symbol: "ETH",
    name: "Ethereum",
    price: 3521.67,
    change24h: -1.23,
    volume24h: 14_200_000_000,
    marketCap: 423_000_000_000,
    sparkline: generateSparkline(3521.67, 0.04),
  },
  {
    id: "solana",
    symbol: "SOL",
    name: "Solana",
    price: 178.42,
    change24h: 5.67,
    volume24h: 3_800_000_000,
    marketCap: 82_000_000_000,
    sparkline: generateSparkline(178.42, 0.06),
  },
  {
    id: "cardano",
    symbol: "ADA",
    name: "Cardano",
    price: 0.62,
    change24h: -0.89,
    volume24h: 890_000_000,
    marketCap: 22_000_000_000,
    sparkline: generateSparkline(0.62, 0.05),
  },
  {
    id: "avalanche",
    symbol: "AVAX",
    name: "Avalanche",
    price: 42.18,
    change24h: 3.21,
    volume24h: 620_000_000,
    marketCap: 16_500_000_000,
    sparkline: generateSparkline(42.18, 0.05),
  },
  {
    id: "polkadot",
    symbol: "DOT",
    name: "Polkadot",
    price: 8.94,
    change24h: 1.45,
    volume24h: 340_000_000,
    marketCap: 12_800_000_000,
    sparkline: generateSparkline(8.94, 0.04),
  },
];

export const leaderboardData: LeaderboardEntry[] = [
  { rank: 1, username: "CryptoKing", avatar: "CK", portfolio: 1_250_000, pnl: 156.4, trades: 342, winRate: 78.2 },
  { rank: 2, username: "MoonHunter", avatar: "MH", portfolio: 980_500, pnl: 134.2, trades: 287, winRate: 72.5 },
  { rank: 3, username: "DiamondHands", avatar: "DH", portfolio: 845_200, pnl: 98.7, trades: 456, winRate: 68.9 },
  { rank: 4, username: "WhaleWatcher", avatar: "WW", portfolio: 720_800, pnl: 87.3, trades: 198, winRate: 75.1 },
  { rank: 5, username: "BullRunner", avatar: "BR", portfolio: 685_400, pnl: 72.6, trades: 523, winRate: 64.3 },
  { rank: 6, username: "SatoshiFan", avatar: "SF", portfolio: 612_300, pnl: 65.8, trades: 167, winRate: 71.8 },
  { rank: 7, username: "HODLer", avatar: "HL", portfolio: 589_100, pnl: 58.2, trades: 89, winRate: 82.0 },
  { rank: 8, username: "TradeMaster", avatar: "TM", portfolio: 534_700, pnl: 52.4, trades: 678, winRate: 61.2 },
];

export const achievements = [
  { id: "first-trade", name: "First Trade", description: "Complete your first trade", icon: "Trophy", unlocked: true },
  { id: "diamond-hands", name: "Diamond Hands", description: "Hold a position for 7 days", icon: "Gem", unlocked: true },
  { id: "whale", name: "Whale Status", description: "Portfolio reaches $100,000", icon: "Fish", unlocked: false },
  { id: "profit-master", name: "Profit Master", description: "Achieve 50% total profit", icon: "TrendingUp", unlocked: false },
  { id: "daily-trader", name: "Daily Trader", description: "Trade for 30 consecutive days", icon: "Calendar", unlocked: false },
  { id: "diversified", name: "Diversified", description: "Hold 5 different assets", icon: "PieChart", unlocked: true },
];
