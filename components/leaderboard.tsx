"use client";

import { motion } from "framer-motion";
import { Trophy, Medal, Crown, TrendingUp, Target } from "lucide-react";
import { cn, formatCurrency, formatPercentage } from "@/lib/utils";
import { leaderboardData } from "@/lib/crypto-data";

const rankIcons = {
  1: Crown,
  2: Medal,
  3: Medal,
};

const rankColors = {
  1: "text-primary bg-primary/10",
  2: "text-muted-foreground bg-secondary",
  3: "text-warning bg-warning/10",
};

export function Leaderboard() {
  return (
    <section id="leaderboard" className="relative py-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-2 mb-4">
            <Trophy className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Season 4 Leaderboard</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Top Traders This Season
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Compete for the top spot and win from our $50,000 prize pool distributed weekly.
          </p>
        </div>

        {/* Podium - Top 3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {leaderboardData.slice(0, 3).map((entry, index) => {
            const order = index === 0 ? 1 : index === 1 ? 0 : 2;
            const Icon = rankIcons[entry.rank as keyof typeof rankIcons] || Medal;
            
            return (
              <motion.div
                key={entry.username}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: order * 0.1 }}
                viewport={{ once: true }}
                className={cn(
                  "relative rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 text-center",
                  entry.rank === 1 && "md:order-2 md:-mt-4 border-primary/50"
                )}
                style={{ order }}
              >
                {entry.rank === 1 && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                      <Crown className="h-3 w-3" />
                      Leader
                    </span>
                  </div>
                )}
                
                <div className={cn(
                  "mx-auto flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold mb-4",
                  rankColors[entry.rank as keyof typeof rankColors] || "bg-secondary text-foreground"
                )}>
                  {entry.avatar}
                </div>
                
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Icon className={cn(
                    "h-5 w-5",
                    entry.rank === 1 ? "text-primary" : entry.rank === 2 ? "text-muted-foreground" : "text-warning"
                  )} />
                  <span className="text-xl font-bold text-foreground">#{entry.rank}</span>
                </div>
                
                <h3 className="text-lg font-semibold text-foreground">{entry.username}</h3>
                
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Portfolio</div>
                    <div className="text-lg font-bold text-foreground font-mono">
                      {formatCurrency(entry.portfolio)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">P&L</div>
                    <div className="text-lg font-bold text-success font-mono">
                      {formatPercentage(entry.pnl)}
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex items-center justify-center gap-4 text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <TrendingUp className="h-4 w-4" />
                    {entry.trades} trades
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Target className="h-4 w-4" />
                    {entry.winRate}% win
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Rest of leaderboard */}
        <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-secondary/30">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Rank</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Trader</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-muted-foreground">Portfolio</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-muted-foreground">P&L</th>
                  <th className="hidden sm:table-cell px-6 py-4 text-right text-sm font-semibold text-muted-foreground">Trades</th>
                  <th className="hidden sm:table-cell px-6 py-4 text-right text-sm font-semibold text-muted-foreground">Win Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {leaderboardData.slice(3).map((entry) => (
                  <motion.tr
                    key={entry.username}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="hover:bg-secondary/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className="text-lg font-bold text-muted-foreground">#{entry.rank}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-sm font-bold text-foreground">
                          {entry.avatar}
                        </div>
                        <span className="font-semibold text-foreground">{entry.username}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-semibold text-foreground font-mono">
                        {formatCurrency(entry.portfolio)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-semibold text-success font-mono">
                        {formatPercentage(entry.pnl)}
                      </span>
                    </td>
                    <td className="hidden sm:table-cell px-6 py-4 text-right text-muted-foreground">
                      {entry.trades}
                    </td>
                    <td className="hidden sm:table-cell px-6 py-4 text-right text-muted-foreground">
                      {entry.winRate}%
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Your rank CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 rounded-2xl border border-primary/30 bg-primary/5 p-6 text-center"
        >
          <h3 className="text-xl font-bold text-foreground">Ready to compete?</h3>
          <p className="text-muted-foreground mt-2">Start with $10,000 in virtual funds and climb the ranks.</p>
          <button className="mt-4 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground hover:brightness-110 transition-all">
            Join the Competition
          </button>
        </motion.div>
      </div>
    </section>
  );
}
