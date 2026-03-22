"use client";

import { motion } from "framer-motion";
import { Trophy, Gem, Target, Calendar, PieChart, TrendingUp, Lock, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { achievements } from "@/lib/crypto-data";

const iconMap: Record<string, React.ElementType> = {
  Trophy,
  Gem,
  Fish: TrendingUp,
  TrendingUp,
  Calendar,
  PieChart,
};

const prizes = [
  { place: "1st Place", amount: "$10,000", color: "text-primary bg-primary/10 border-primary/30" },
  { place: "2nd Place", amount: "$5,000", color: "text-muted-foreground bg-secondary border-border" },
  { place: "3rd Place", amount: "$2,500", color: "text-warning bg-warning/10 border-warning/30" },
  { place: "4th-10th", amount: "$1,000", color: "text-foreground bg-card border-border" },
];

export function RewardsSection() {
  return (
    <section id="rewards" className="relative py-24 overflow-hidden bg-secondary/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Earn Real Rewards
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Unlock achievements, climb the ranks, and win from our weekly prize pool.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Prize pool */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Trophy className="h-6 w-6 text-primary" />
              Weekly Prize Pool
            </h3>
            
            <div className="space-y-4">
              {prizes.map((prize, index) => (
                <motion.div
                  key={prize.place}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={cn(
                    "flex items-center justify-between rounded-xl border p-4",
                    prize.color
                  )}
                >
                  <span className="font-semibold">{prize.place}</span>
                  <span className="text-2xl font-bold font-mono">{prize.amount}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 rounded-xl border border-border bg-card/50 p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-muted-foreground">Total Weekly Prizes</span>
                <span className="text-3xl font-bold text-primary font-mono">$25,000</span>
              </div>
              <div className="h-2 rounded-full bg-secondary overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "65%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="h-full bg-primary rounded-full"
                />
              </div>
              <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
                <span>$16,250 claimed</span>
                <span>4 days left</span>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Gem className="h-6 w-6 text-accent" />
              Achievements
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              {achievements.map((achievement, index) => {
                const Icon = iconMap[achievement.icon] || Trophy;
                
                return (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className={cn(
                      "relative rounded-xl border p-4 transition-all",
                      achievement.unlocked
                        ? "border-accent/30 bg-accent/5"
                        : "border-border bg-card/30 opacity-60"
                    )}
                  >
                    {!achievement.unlocked && (
                      <div className="absolute top-2 right-2">
                        <Lock className="h-4 w-4 text-muted-foreground" />
                      </div>
                    )}
                    {achievement.unlocked && (
                      <div className="absolute top-2 right-2">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-accent">
                          <Check className="h-3 w-3 text-accent-foreground" />
                        </div>
                      </div>
                    )}
                    
                    <Icon className={cn(
                      "h-8 w-8 mb-3",
                      achievement.unlocked ? "text-accent" : "text-muted-foreground"
                    )} />
                    <h4 className="font-semibold text-foreground">{achievement.name}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{achievement.description}</p>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-6 flex items-center justify-between rounded-xl bg-secondary/50 p-4">
              <div>
                <div className="text-sm text-muted-foreground">Your Progress</div>
                <div className="text-lg font-bold text-foreground">3 / 6 Unlocked</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Bonus XP</div>
                <div className="text-lg font-bold text-accent">+1,500 XP</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
