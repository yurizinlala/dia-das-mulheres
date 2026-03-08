import { motion } from 'motion/react';
import { CardData } from '@/src/store/useMemoryStore';
import { cn } from '@/src/lib/utils';
import { Heart } from 'lucide-react';

interface MemoryCardProps {
  key?: string;
  card: CardData;
  onClick: () => void;
  index: number;
}

export function MemoryCard({ card, onClick, index }: MemoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="relative w-full aspect-square cursor-pointer perspective-1000"
      onClick={onClick}
    >
      <motion.div
        className="w-full h-full relative preserve-3d"
        animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Front (Hidden state) */}
        <div
          className={cn(
            "absolute inset-0 w-full h-full backface-hidden rounded-2xl flex items-center justify-center shadow-sm border border-stone-200 transition-colors duration-300",
            card.isMatched ? "bg-rose-50" : "bg-stone-100 hover:bg-stone-200"
          )}
        >
          <Heart className="w-8 h-8 text-rose-300/50" />
        </div>

        {/* Back (Revealed state) */}
        <div
          className={cn(
            "absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden shadow-md rotate-y-180 border-2",
            card.isMatched ? "border-rose-300" : "border-transparent"
          )}
        >
          <img
            src={card.imageUrl}
            alt="Memory"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          {card.isMatched && (
            <div className="absolute inset-0 bg-rose-900/10 mix-blend-overlay" />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
