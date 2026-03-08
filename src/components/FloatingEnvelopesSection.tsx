import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, X } from 'lucide-react';

const ENVELOPES = [
  {
    id: 'env-1',
    title: 'Para a senhora',
    content: (
      <>
        <p>Mãe, queria aproveitar este Dia das Mães para te escrever algo um pouco mais detalhado. Desde que me entendo por gente, a senhora tem sido a verdadeira rocha da nossa família, o abraço que acalma qualquer confusão que sinto e a voz que sempre me guia quando estou na dúvida.</p>
        <p>Vendo a senhora todos os dias, lembro da promessa perfeita de Deus para as mães: <em>"A força e a honra são seu vestido; e se alegrará com o dia futuro." (Provérbios 31:25)</em>. É exatamente assim que vejo a senhora: forte, honrada e cheia de fé.</p>
      </>
    ),
    delay: 0
  },
  {
    id: 'env-2',
    title: 'Minha inspiração',
    content: (
      <>
        <p>Sabe, eu tenho noção de que nem sempre as coisas foram fáceis, e que muitas, muitas vezes a senhora colocou os nossos sonhos muito acima dos seus. Cada uma de suas renúncias invisíveis, cada preocupação silenciosa nas noites mal dormidas, cada oração de joelhos no quarto... tudo isso moldou a pessoa que sou hoje.</p>
        <p>Sei que Deus tem visto cada lágrima e cada sorriso. Como diz a Palavra: <em>"Herança do Senhor são os filhos; o fruto do ventre, o seu galardão." (Salmos 127:3)</em>. Muito obrigado por cuidar da sua herança com tanto amor e dedicação, refletindo o próprio amor de Cristo por nós.</p>
      </>
    ),
    delay: 0.2
  },
  {
    id: 'env-3',
    title: 'Com todo meu amor',
    content: (
      <>
        <p>Por essas e outras, hoje eu só quero te dizer um muito obrigado profundo e sincero. Obrigado por me ensinar o caminho em que devo andar, para que, mesmo quando eu envelhecer, não me desvie dele (Provérbios 22:6).</p>
        <p>Eu oro para que o Senhor renove as suas forças a cada manhã, que a Sua paz continue inundando a nossa casa e que Ele te abençoe com muita saúde e anos de vida para desfrutarmos juntos. Que este Dia das Mães seja apenas mais um lembrete do quanto a senhora é preciosa para mim e para Deus. Eu te amo muito, e pra sempre!</p>
      </>
    ),
    delay: 0.4
  },
];

export function FloatingEnvelopesSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <section className="py-24 px-4 md:px-8 w-full max-w-5xl mx-auto flex flex-col items-center relative min-h-[500px]">
      <div className="mb-16 text-center">
        <h2 className="text-4xl md:text-5xl font-serif text-stone-900 mb-4">
          Algumas cartinhas
        </h2>
        <p className="text-stone-600 font-sans font-light text-lg">
          Toque em qualquer envelope para abrir.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-8 md:gap-16">
        {ENVELOPES.map((env) => (
          <motion.div
            key={env.id}
            layoutId={`envelope-container-${env.id}`}
            onClick={() => setSelectedId(env.id)}
            animate={{ y: [0, -15, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: env.delay
            }}
            className="cursor-pointer flex flex-col items-center gap-3"
          >
            <motion.div
              layoutId={`envelope-bg-${env.id}`}
              className="w-20 h-20 bg-stone-100 rounded-2xl flex items-center justify-center shadow-sm border border-stone-200 hover:bg-stone-200 transition-colors"
            >
              <Mail className="w-8 h-8 text-stone-600" />
            </motion.div>
            <span className="text-xs font-sans uppercase tracking-widest text-stone-500">
              {env.title}
            </span>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm"
            />

            <motion.div
              layoutId={`envelope-bg-${selectedId}`}
              className="relative w-full max-w-md bg-stone-50 rounded-3xl p-8 md:p-12 shadow-xl border border-stone-200 z-10"
            >
              <button
                onClick={() => setSelectedId(null)}
                className="absolute top-6 right-6 text-stone-400 hover:text-stone-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-serif text-stone-900 mb-6"
              >
                {ENVELOPES.find(e => e.id === selectedId)?.title}
              </motion.h3>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-stone-600 font-sans font-light text-lg leading-relaxed flex flex-col gap-4"
              >
                {ENVELOPES.find(e => e.id === selectedId)?.content}
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
