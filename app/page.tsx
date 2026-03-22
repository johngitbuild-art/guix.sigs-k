import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { TradingPanel } from "@/components/trading-panel";
import { Leaderboard } from "@/components/leaderboard";
import { RewardsSection } from "@/components/rewards-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <TradingPanel />
      <Leaderboard />
      <RewardsSection />
      <Footer />
    </main>
  );
}
