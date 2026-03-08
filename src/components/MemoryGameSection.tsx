import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useMemoryStore } from '@/src/store/useMemoryStore';
import { MemoryCard } from './MemoryCard';
import { RotateCcw } from 'lucide-react';

export function MemoryGameSection() {
  const { cards, initializeGame, flipCard, isVictory } = useMemoryStore();

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  return (
    <section className="py-24 px-4 md:px-8 w-full max-w-4xl mx-auto bg-stone-50 min-h-screen flex flex-col items-center justify-center">
      <div className="mb-12 text-center max-w-2xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-serif text-stone-900 mb-4"
        >
          Jogo da memória
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-stone-600 font-sans font-light text-lg"
        >
          Encontre os pares das nossas fotos favoritas.
        </motion.p>
      </div>

      <div className="relative w-full max-w-2xl">
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
          {cards.map((card, index) => (
            <MemoryCard
              key={card.id}
              card={card}
              index={index}
              onClick={() => flipCard(index)}
            />
          ))}
        </div>

        <AnimatePresence>
          {isVictory && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-stone-50/90 backdrop-blur-sm rounded-3xl"
            >
              <motion.h3
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-4xl font-serif text-stone-900 mb-4 text-center"
              >
                Parabéns!
              </motion.h3>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-stone-600 font-sans font-light mb-8 text-center max-w-xs"
              >
                Você encontrou todas as memórias. Obrigado por cada momento.
              </motion.p>
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={initializeGame}
                className="flex items-center gap-2 px-6 py-3 bg-stone-900 text-stone-50 rounded-full font-sans font-medium text-sm transition-colors hover:bg-stone-800"
              >
                <RotateCcw className="w-4 h-4" />
                Jogar Novamente
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
