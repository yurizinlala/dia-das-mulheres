import { useState } from 'react';
import { motion, AnimatePresence, PanInfo, useMotionValue, useTransform } from 'motion/react';
import { Check, X } from 'lucide-react';

const QUESTIONS = [
  { id: 1, text: "Eu sempre tinha razão nas discussões?", answer: "left" },
  { id: 2, text: "A comida da mãe é a melhor do mundo?", answer: "right" },
  { id: 3, text: "Eu dava muito trabalho na adolescência?", answer: "right" },
  { id: 4, text: "Mãe tem sexto sentido?", answer: "right" },
  { id: 5, text: "Eu lembro de arrumar a cama todos os dias?", answer: "left" },
  { id: 6, text: "Eu tinha costume de arrumar a casa?", answer: "right" },
  { id: 7, text: "Mãe consegue achar qualquer coisa guardada ou escondida?", answer: "right" },
  { id: 8, text: "Eu era um anjinho que nunca fazia bagunça?", answer: "left" },
  { id: 9, text: "Eu já pedi para arranjar cartolina às 11 da noite?", answer: "right" },
  { id: 10, text: "Eu sempre avisava a hora exata que ia chegar em casa?", answer: "left" },
];

export function QuizSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [leaveX, setLeaveX] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);

  const handleDragEnd = (e: any, info: PanInfo) => {
    if (info.offset.x > 100) {
      handleSwipe("right");
    } else if (info.offset.x < -100) {
      handleSwipe("left");
    }
  };

  const handleSwipe = (direction: "left" | "right") => {
    const currentQuestion = QUESTIONS[currentIndex];
    if (currentQuestion.answer === direction) {
      setScore(s => s + 1);
    }

    setLeaveX(direction === "right" ? 500 : -500);

    // Atualiza o índice imediatamente para que o AnimatePresence gerencie a saída suavemente
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(i => i + 1);
    } else {
      setIsFinished(true);
    }
  };

  return (
    <section className="py-24 px-4 md:px-8 w-full max-w-md mx-auto flex flex-col items-center overflow-hidden min-h-[600px]">
      <div className="mb-12 text-center">
        <h2 className="text-4xl md:text-5xl font-serif text-stone-900 mb-4">
          Quiz da Mãe
        </h2>
        <p className="text-stone-600 font-sans font-light text-lg">
          Deslize para a direita para SIM, esquerda para NÃO.
        </p>
      </div>

      <div className="relative w-full aspect-[3/4] flex items-center justify-center">
        <AnimatePresence mode="popLayout">
          {!isFinished ? (
            <motion.div
              key={currentIndex}
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0, x: 0 }}
              exit={{ x: leaveX, opacity: 0, rotate: leaveX > 0 ? 15 : -15, transition: { duration: 0.4, ease: "easeOut" } }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.8}
              onDragEnd={handleDragEnd}
              style={{ x, rotate }}
              className="absolute w-full h-full bg-stone-100 rounded-3xl shadow-sm border border-stone-200 flex flex-col items-center justify-center p-8 cursor-grab active:cursor-grabbing touch-none"
            >
              <span className="absolute top-8 text-xs font-sans uppercase tracking-widest text-stone-400">
                Pergunta {currentIndex + 1} de {QUESTIONS.length}
              </span>
              <h3 className="text-2xl md:text-3xl font-serif text-stone-900 text-center leading-tight">
                {QUESTIONS[currentIndex].text}
              </h3>

              <div className="absolute bottom-8 w-full flex justify-between px-8 text-stone-400">
                <div className="flex flex-col items-center gap-1">
                  <X className="w-6 h-6" />
                  <span className="text-xs font-sans uppercase">Não</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Check className="w-6 h-6" />
                  <span className="text-xs font-sans uppercase">Sim</span>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full h-full bg-rose-50 rounded-3xl flex flex-col items-center justify-center p-8 text-center"
            >
              <h3 className="text-4xl font-serif text-rose-900 mb-4">Fim do Quiz!</h3>
              <p className="text-rose-900/80 font-sans font-light text-lg mb-8">
                Você acertou {score} de {QUESTIONS.length} perguntas.
              </p>
              <button
                onClick={() => {
                  setCurrentIndex(0);
                  setScore(0);
                  setIsFinished(false);
                  setLeaveX(0);
                }}
                className="px-6 py-3 bg-rose-900 text-rose-50 rounded-full font-sans font-medium text-sm transition-colors hover:bg-rose-800"
              >
                Jogar Novamente
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
