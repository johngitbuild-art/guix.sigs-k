"use client";

import { motion } from "framer-motion";
import { Play, Trophy, TrendingUp, Users } from "lucide-react";
import { formatCompactNumber } from "@/lib/utils";

const stats = [
  { label: "Total Prize Pool", value: 2_500_000, icon: Trophy, prefix: "$" },
  { label: "Active Traders", value: 125_000, icon: Users, prefix: "" },
  { label: "Trades Today", value: 1_850_000, icon: TrendingUp, prefix: "" },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated background */}
      <div className="absolute inset-0 animated-gradient" />
      
      {/* Grid overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(to right, var(--color-border) 1px, transparent 1px),
                           linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-2 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-sm font-medium text-primary">Season 4 Now Live</span>
          </div>

          {/* Main headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-balance">
            <span className="text-foreground">Trade Crypto.</span>
            <br />
            <span className="text-primary">Win Real Rewards.</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Practice trading with virtual funds, compete against traders worldwide, 
            and climb the leaderboard to win real prizes.
          </p>

          {/* CTA buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground glow-primary transition-all hover:brightness-110"
            >
              <Play className="h-5 w-5" />
              Start Trading Free
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-8 py-4 text-lg font-semibold text-foreground transition-all hover:bg-secondary"
            >
              Watch Demo
            </motion.button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8"
        >
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="relative group"
            >
              <div className="absolute inset-0 rounded-2xl bg-primary/5 blur-xl group-hover:bg-primary/10 transition-colors" />
              <div className="relative rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6">
                <stat.icon className="h-8 w-8 text-primary mb-4" />
                <div className="text-3xl font-bold text-foreground">
                  {stat.prefix}{formatCompactNumber(stat.value)}
                </div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
