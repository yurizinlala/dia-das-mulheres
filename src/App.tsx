import { HeroSection } from '@/src/components/HeroSection';
import { BentoGridSection } from '@/src/components/BentoGridSection';
import { MemoryGameSection } from '@/src/components/MemoryGameSection';
import { ScratchCardSection } from '@/src/components/ScratchCardSection';
import { QuizSection } from '@/src/components/QuizSection';
import { FloatingEnvelopesSection } from '@/src/components/FloatingEnvelopesSection';
import { AchievementsSection } from '@/src/components/AchievementsSection';

export default function App() {
  return (
    <main className="min-h-screen bg-stone-50 selection:bg-rose-100 selection:text-rose-900 overflow-x-hidden">
      <HeroSection />
      <BentoGridSection />
      <FloatingEnvelopesSection />
      <QuizSection />
      <ScratchCardSection />
      <AchievementsSection />
      <MemoryGameSection />
    </main>
  );
}
