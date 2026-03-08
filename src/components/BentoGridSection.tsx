import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

interface BentoItemProps {
  className?: string;
  imageUrl: string;
  title: string;
  subtitle: string;
  delay?: number;
}

const BentoItem = ({ className, imageUrl, title, subtitle, delay = 0 }: BentoItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group relative overflow-hidden rounded-3xl bg-stone-100 shadow-sm border border-stone-200/50",
        className
      )}
    >
      <img
        src={imageUrl}
        alt={title}
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent opacity-80" />

      <div className="absolute bottom-0 left-0 p-6 md:p-8 flex flex-col justify-end h-full w-full">
        <h3 className="text-2xl md:text-3xl font-serif text-stone-50 mb-2 leading-tight">
          {title}
        </h3>
        <p className="text-sm md:text-base font-sans text-stone-200 font-light max-w-xs">
          {subtitle}
        </p>
      </div>
    </motion.div>
  );
};

export function BentoGridSection() {
  return (
    <section className="py-24 px-4 md:px-8 w-full max-w-7xl mx-auto bg-stone-50">
      <div className="mb-16 text-center max-w-2xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-serif text-stone-900 mb-4"
        >
          Algumas memórias
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-stone-600 font-sans font-light text-lg"
        >
          Cada momento ao seu lado é um tesouro que guardamos com carinho.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[300px] md:auto-rows-[400px]">
        {/* Bloco 1: Grande, ocupa 2 colunas no desktop */}
        <BentoItem
          className="md:col-span-2"
          imageUrl="/abracoportoseguro.jpeg"
          title="Amor Incondicional"
          subtitle="Seu abraço é o nosso porto seguro, onde sempre encontramos paz."
          delay={0.1}
        />

        {/* Bloco 2: Vertical, ocupa 1 coluna */}
        <BentoItem
          className="md:col-span-1"
          imageUrl="/sabedoria.jpeg"
          title="Sabedoria"
          subtitle="Seus conselhos guiam nossos passos todos os dias."
          delay={0.2}
        />

        {/* Bloco 3: Quadrado, ocupa 1 coluna */}
        <BentoItem
          className="md:col-span-1"
          imageUrl="/alegria.jpeg"
          title="Alegria"
          subtitle="Seu sorriso ilumina qualquer ambiente."
          delay={0.3}
        />

        {/* Bloco 4: Largo, ocupa 2 colunas no desktop */}
        <BentoItem
          className="md:col-span-2"
          imageUrl="/forcaeinspiracao.jpeg"
          title="Força e Inspiração"
          subtitle="Você é o pilar da nossa família, nosso maior exemplo de resiliência."
          delay={0.4}
        />
      </div>
    </section>
  );
}
