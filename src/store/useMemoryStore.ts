import { create } from 'zustand';

export interface CardData {
  id: string;
  imageUrl: string;
  isFlipped: boolean;
  isMatched: boolean;
}

// Array de placeholders para as fotos de família.
// Substitua as URLs abaixo pelas suas próprias imagens.
export const FAMILY_PHOTOS = [
  'https://picsum.photos/seed/family1/400/400',
  'https://picsum.photos/seed/family2/400/400',
  'https://picsum.photos/seed/family3/400/400',
  'https://picsum.photos/seed/family4/400/400',
  'https://picsum.photos/seed/family5/400/400',
  'https://picsum.photos/seed/family6/400/400',
];

interface MemoryState {
  cards: CardData[];
  flippedIndices: number[];
  matches: number;
  isLocked: boolean;
  isVictory: boolean;
  initializeGame: () => void;
  flipCard: (index: number) => void;
}

const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const useMemoryStore = create<MemoryState>((set, get) => ({
  cards: [],
  flippedIndices: [],
  matches: 0,
  isLocked: false,
  isVictory: false,

  initializeGame: () => {
    const duplicatedPhotos = [...FAMILY_PHOTOS, ...FAMILY_PHOTOS];
    const shuffledPhotos = shuffleArray(duplicatedPhotos);
    
    const initialCards: CardData[] = shuffledPhotos.map((url, index) => ({
      id: `${index}-${url}`,
      imageUrl: url,
      isFlipped: false,
      isMatched: false,
    }));

    set({
      cards: initialCards,
      flippedIndices: [],
      matches: 0,
      isLocked: false,
      isVictory: false,
    });
  },

  flipCard: (index: number) => {
    const { cards, flippedIndices, isLocked } = get();

    if (isLocked || cards[index].isFlipped || cards[index].isMatched) return;

    const newCards = [...cards];
    newCards[index].isFlipped = true;

    const newFlippedIndices = [...flippedIndices, index];

    set({ cards: newCards, flippedIndices: newFlippedIndices });

    if (newFlippedIndices.length === 2) {
      set({ isLocked: true });

      const [firstIndex, secondIndex] = newFlippedIndices;
      const firstCard = newCards[firstIndex];
      const secondCard = newCards[secondIndex];

      if (firstCard.imageUrl === secondCard.imageUrl) {
        // Match
        setTimeout(() => {
          const matchedCards = [...get().cards];
          matchedCards[firstIndex].isMatched = true;
          matchedCards[secondIndex].isMatched = true;
          
          const newMatches = get().matches + 1;
          const isVictory = newMatches === FAMILY_PHOTOS.length;

          set({
            cards: matchedCards,
            flippedIndices: [],
            isLocked: false,
            matches: newMatches,
            isVictory,
          });
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          const resetCards = [...get().cards];
          resetCards[firstIndex].isFlipped = false;
          resetCards[secondIndex].isFlipped = false;

          set({
            cards: resetCards,
            flippedIndices: [],
            isLocked: false,
          });
        }, 1000);
      }
    }
  },
}));
