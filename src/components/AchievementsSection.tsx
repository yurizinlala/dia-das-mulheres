import { motion } from 'motion/react';
import { Award, Heart, Shield, Sparkles } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const BADGES = [
  { id: 1, title: 'Paciência Infinita', icon: Shield, unlocked: true, delay: 0 },
  { id: 2, title: 'Melhores Conselhos', icon: Sparkles, unlocked: true, delay: 0.1 },
  { id: 3, title: 'Abraço que Cura', icon: Heart, unlocked: true, delay: 0.2 },
  { id: 4, title: 'Amor Incondicional', icon: Award, unlocked: true, delay: 0.3 },
];

export function AchievementsSection() {
  return (
    <section className="py-24 px-4 md:px-8 w-full max-w-4xl mx-auto flex flex-col items-center">
      <div className="mb-16 text-center">
        <h2 className="text-4xl md:text-5xl font-serif text-stone-900 mb-4">
          Medalhas de honra
        </h2>
        <p className="text-stone-600 font-sans font-light text-lg">
          Conquistas desbloqueadas ao longo de uma vida inteira.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full">
        {BADGES.map((badge) => {
          const Icon = badge.icon;
          return (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: badge.delay }}
              className="group relative flex flex-col items-center"
            >
              <div className={cn(
                "relative w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center mb-4 transition-all duration-500",
                badge.unlocked
                  ? "bg-gradient-to-br from-rose-100 to-rose-50 border border-rose-200 shadow-[0_0_30px_-5px_rgba(253,164,175,0.4)]"
                  : "bg-stone-100 border border-stone-200 opacity-50 grayscale"
              )}>
                <Icon className={cn(
                  "w-10 h-10 md:w-12 md:h-12 transition-transform duration-500 group-hover:scale-110",
                  badge.unlocked ? "text-rose-900" : "text-stone-400"
                )} />

                {badge.unlocked && (
                  <motion.div
                    animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 rounded-full border border-rose-300/50"
                  />
                )}
              </div>

              <h3 className="text-sm md:text-base font-sans font-medium text-stone-900 text-center">
                {badge.title}
              </h3>
              <span className="text-xs font-sans text-stone-500 mt-1">
                {badge.unlocked ? 'Desbloqueado' : 'Bloqueado'}
              </span>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
