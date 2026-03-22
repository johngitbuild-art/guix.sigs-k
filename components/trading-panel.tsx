"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn, formatCurrency, formatPercentage, formatCompactNumber } from "@/lib/utils";
import { cryptoAssets, type CryptoAsset } from "@/lib/crypto-data";
import { SparklineChart } from "./sparkline-chart";

export function TradingPanel() {
  const [selectedAsset, setSelectedAsset] = useState<CryptoAsset>(cryptoAssets[0]);
  const [tradeType, setTradeType] = useState<"buy" | "sell">("buy");
  const [amount, setAmount] = useState("");

  const handleTrade = () => {
    if (!amount) return;
    // Simulate trade
    alert(`${tradeType === "buy" ? "Bought" : "Sold"} ${amount} ${selectedAsset.symbol} at ${formatCurrency(selectedAsset.price)}`);
    setAmount("");
  };

  return (
    <section id="trade" className="relative py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Trade Top Cryptos
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Real-time prices, zero risk. Practice your strategy with virtual funds.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Asset list */}
          <div className="lg:col-span-2 rounded-2xl border border-border bg-card/50 backdrop-blur-sm overflow-hidden">
            <div className="p-4 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground">Markets</h3>
            </div>
            
            <div className="divide-y divide-border">
              {cryptoAssets.map((asset) => (
                <motion.button
                  key={asset.id}
                  onClick={() => setSelectedAsset(asset)}
                  className={cn(
                    "w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors text-left",
                    selectedAsset.id === asset.id && "bg-secondary/80"
                  )}
                  whileHover={{ x: 4 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                      {asset.symbol.slice(0, 2)}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{asset.name}</div>
                      <div className="text-sm text-muted-foreground">{asset.symbol}</div>
                    </div>
                  </div>

                  <div className="hidden sm:block w-24 h-10">
                    <SparklineChart data={asset.sparkline} positive={asset.change24h >= 0} />
                  </div>

                  <div className="text-right">
                    <div className="font-semibold text-foreground font-mono">
                      {formatCurrency(asset.price)}
                    </div>
                    <div
                      className={cn(
                        "flex items-center justify-end gap-1 text-sm font-medium",
                        asset.change24h >= 0 ? "text-success" : "text-destructive"
                      )}
                    >
                      {asset.change24h >= 0 ? (
                        <ArrowUpRight className="h-3 w-3" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3" />
                      )}
                      {formatPercentage(asset.change24h)}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Trade widget */}
          <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm overflow-hidden">
            <div className="p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {selectedAsset.symbol.slice(0, 2)}
                </div>
                <div>
                  <div className="font-semibold text-foreground">{selectedAsset.name}</div>
                  <div className="text-2xl font-bold text-foreground font-mono">
                    {formatCurrency(selectedAsset.price)}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 space-y-4">
              {/* Trade type toggle */}
              <div className="flex rounded-xl bg-secondary p-1">
                <button
                  onClick={() => setTradeType("buy")}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition-all",
                    tradeType === "buy"
                      ? "bg-success text-background"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <TrendingUp className="h-4 w-4" />
                  Buy
                </button>
                <button
                  onClick={() => setTradeType("sell")}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition-all",
                    tradeType === "sell"
                      ? "bg-destructive text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <TrendingDown className="h-4 w-4" />
                  Sell
                </button>
              </div>

              {/* Amount input */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Amount (USD)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full rounded-xl border border-border bg-input px-4 py-3 pl-8 text-lg font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Quick amounts */}
              <div className="flex gap-2">
                {[100, 500, 1000, 5000].map((value) => (
                  <button
                    key={value}
                    onClick={() => setAmount(value.toString())}
                    className="flex-1 rounded-lg border border-border py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                  >
                    ${value >= 1000 ? `${value / 1000}K` : value}
                  </button>
                ))}
              </div>

              {/* You receive */}
              {amount && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="rounded-xl bg-secondary/50 p-4"
                >
                  <div className="text-sm text-muted-foreground">You will {tradeType}</div>
                  <div className="text-xl font-bold text-foreground font-mono">
                    {(parseFloat(amount) / selectedAsset.price).toFixed(6)} {selectedAsset.symbol}
                  </div>
                </motion.div>
              )}

              {/* Trade button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleTrade}
                disabled={!amount}
                className={cn(
                  "w-full py-4 rounded-xl font-semibold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed",
                  tradeType === "buy"
                    ? "bg-success text-background glow-success hover:brightness-110"
                    : "bg-destructive text-foreground glow-destructive hover:brightness-110"
                )}
              >
                {tradeType === "buy" ? "Buy" : "Sell"} {selectedAsset.symbol}
              </motion.button>

              {/* Info */}
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>24h Volume</span>
                <span className="font-mono">${formatCompactNumber(selectedAsset.volume24h)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
