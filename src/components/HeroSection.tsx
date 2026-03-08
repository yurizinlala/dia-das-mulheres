import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-stone-50">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-rose-50/30 to-transparent" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="z-10 text-center px-6"
      >
        <h1 className="text-6xl md:text-8xl font-serif text-stone-900 leading-tight tracking-tight mb-4">
          Para a maior<br />mulher desse mundo
        </h1>
        <p className="text-lg md:text-xl font-sans text-stone-600 max-w-md mx-auto font-light">
          Uma pequena homenagem para celebrar todo o amor e carinho que a senhora nos dá.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-12 flex flex-col items-center gap-2"
      >
        <span className="text-xs font-sans uppercase tracking-widest text-stone-400">
          Role pra baixo
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <ChevronDown className="w-5 h-5 text-stone-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
