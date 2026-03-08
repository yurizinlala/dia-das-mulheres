# Mother's Day Interactive Experience

Uma experiência web interativa e premium de Dia das Mães, projetada com foco em dispositivos móveis (Mobile-First) utilizando o conceito de "Storytelling por Scroll". Este projeto combina design emocional, tipografia elegante e microinterações táteis para criar um presente digital inesquecível.

## 🌟 Funcionalidades

A aplicação é composta por 7 módulos interativos distintos, cada um pensado para surpreender e emocionar:

1. **Hero Section (Abertura)**
   - Tela inicial imersiva com tipografia sofisticada (Instrument Serif).
   - Microinteração de rolagem contínua orientando o usuário a explorar o conteúdo.

2. **Bento Grid de Memórias**
   - Layout assimétrico moderno para exibição de fotos de família.
   - Efeitos de zoom suave ao interagir e gradientes de contraste para legibilidade dos textos.

3. **Cartas de Amor (Envelopes Flutuantes)**
   - Ícones de envelopes com animação de flutuação orgânica.
   - Efeito de "morphing" (Shared Element Transition) ao clicar, expandindo o envelope em um modal com uma carta digital.

4. **Quiz da Mãe (Cards Deslizáveis)**
   - Minigame interativo estilo "Tinder" com 10 perguntas sobre a relação familiar.
   - Mecânica de deslizar (swipe) para a esquerda (Não) ou direita (Sim) utilizando física de molas e rotação dinâmica do card.
   - Tela de pontuação final com opção de jogar novamente.

5. **Raspadinha Digital (Scratch Card)**
   - Componente interativo construído com HTML5 Canvas.
   - Permite ao usuário "raspar" a tela com o dedo ou mouse (com área de contato otimizada) para revelar um "Vale-Presente" (ex: Dia de Spa) oculto sob a camada opaca.

6. **Painel de Conquistas (Badges)**
   - Dashboard minimalista exibindo "Medalhas de Honra" (ex: Paciência Infinita, Abraço que Cura).
   - Efeitos visuais de brilho e pulsação contínua para medalhas desbloqueadas.

7. **Jogo da Memória (Memory Match)**
   - Minigame clássico com uma grade 4x3 (12 cartas, 6 pares).
   - Animações 3D realistas de virada de carta (flip).
   - Gerenciamento de estado otimizado e tela comemorativa de vitória.

## 🛠️ Stack Tecnológica

- **React 19** (via Vite)
- **Tailwind CSS v4** (Estilização utilitária e design system)
- **Framer Motion** (Animações baseadas em física, gestos de swipe e morphing de layout)
- **Zustand** (Gerenciamento de estado global para o Jogo da Memória)
- **Lucide React** (Ícones SVG minimalistas)
- **HTML5 Canvas** (Lógica da raspadinha digital)

## 🎨 Design Emocional

O projeto foi desenhado para evocar sentimentos de carinho e sofisticação:
- **Cores:** Paleta restrita a tons neutros quentes (`stone`) e acentos sutis (`rose`), evitando cores saturadas genéricas.
- **Tipografia:** Combinação de `Instrument Serif` para cabeçalhos elegantes e `Inter` para textos de corpo legíveis.
- **Animações:** Uso exclusivo de animações aceleradas por GPU com física de molas (springs) para uma sensação tátil e orgânica, sem transições lineares duras.

## 🚀 Como Customizar

Para personalizar o app com suas próprias memórias e torná-lo único:

1. **Fotos do Bento Grid:** 
   - Atualize as URLs das imagens e os textos no arquivo `src/components/BentoGridSection.tsx`.

2. **Cartas de Amor:** 
   - Modifique os títulos e conteúdos do array `ENVELOPES` em `src/components/FloatingEnvelopesSection.tsx`.

3. **Perguntas do Quiz:** 
   - Altere o array `QUESTIONS` em `src/components/QuizSection.tsx`. Defina a resposta correta como `"left"` (Não) ou `"right"` (Sim).

4. **Prêmio da Raspadinha:** 
   - Edite o conteúdo HTML oculto (o título e a descrição do prêmio) no componente `src/components/ScratchCardSection.tsx`.

5. **Medalhas de Honra:**
   - Personalize os títulos e ícones das conquistas no array `BADGES` em `src/components/AchievementsSection.tsx`.

6. **Fotos do Jogo da Memória:** 
   - Substitua as URLs de placeholder do array `FAMILY_PHOTOS` no arquivo `src/store/useMemoryStore.ts` por links para suas próprias fotos (recomendado formato quadrado 1:1).

## 💻 Como Executar Localmente

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

3. Acesse a aplicação no seu navegador (geralmente em `http://localhost:3000`).
