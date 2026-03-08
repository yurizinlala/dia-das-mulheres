import { useEffect, useRef, useState } from 'react';

export function ScratchCardSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      if (containerRef.current) {
        canvas.width = containerRef.current.offsetWidth;
        canvas.height = containerRef.current.offsetHeight;

        ctx.fillStyle = '#d6d3d1'; // stone-300
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = '24px "Instrument Serif", serif';
        ctx.fillStyle = '#78716c'; // stone-500
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Raspe aqui', canvas.width / 2, canvas.height / 2);
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let isDrawing = false;

    const getMousePos = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    };

    const scratch = (x: number, y: number) => {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      // Pincel menor: de 40 para 20 de raio
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.fill();
    };

    const handleDown = (e: MouseEvent | TouchEvent) => {
      isDrawing = true;
      const { x, y } = getMousePos(e);
      scratch(x, y);
    };

    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing) return;
      if (e.cancelable) {
        e.preventDefault();
      }
      const { x, y } = getMousePos(e);
      scratch(x, y);
      checkReveal();
    };

    const handleUp = () => {
      isDrawing = false;
    };

    const checkReveal = () => {
      if (isRevealed) return;
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      let transparentPixels = 0;
      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] === 0) transparentPixels++;
      }
      const totalPixels = pixels.length / 4;
      // Exige que raspe 85% em vez de 50%
      if (transparentPixels / totalPixels > 0.85) {
        setIsRevealed(true);
        canvas.style.transition = 'opacity 0.8s ease';
        canvas.style.opacity = '0';
        setTimeout(() => {
          canvas.style.display = 'none';
        }, 800);
      }
    };

    canvas.addEventListener('mousedown', handleDown);
    canvas.addEventListener('mousemove', handleMove, { passive: false });
    canvas.addEventListener('mouseup', handleUp);
    canvas.addEventListener('mouseleave', handleUp);

    canvas.addEventListener('touchstart', handleDown, { passive: false });
    canvas.addEventListener('touchmove', handleMove, { passive: false });
    canvas.addEventListener('touchend', handleUp);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousedown', handleDown);
      canvas.removeEventListener('mousemove', handleMove);
      canvas.removeEventListener('mouseup', handleUp);
      canvas.removeEventListener('mouseleave', handleUp);
      canvas.removeEventListener('touchstart', handleDown);
      canvas.removeEventListener('touchmove', handleMove);
      canvas.removeEventListener('touchend', handleUp);
    };
  }, [isRevealed]);

  return (
    <section className="py-24 px-4 md:px-8 w-full max-w-2xl mx-auto flex flex-col items-center">
      <div className="mb-12 text-center">
        <h2 className="text-4xl md:text-5xl font-serif text-stone-900 mb-4">
          Um presente especial
        </h2>
        <p className="text-stone-600 font-sans font-light text-lg">
          Descubra o que preparamos para você, mesmo que não tenhamos rios de dinheiro.
        </p>
      </div>

      <div
        ref={containerRef}
        className="relative w-full max-w-md aspect-[16/9] rounded-3xl overflow-hidden shadow-sm border border-stone-200 bg-stone-50"
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-rose-50">
          <span className="text-sm font-sans uppercase tracking-widest text-rose-900/60 mb-2">Vale-Presente</span>
          <h3 className="text-3xl font-serif text-rose-900 mb-2">Dia Só Seu</h3>
          <p className="text-rose-900/80 font-sans font-light text-sm">
            Um dia inteiro disposto pra ser seu Uber, faxineiro, cozinheiro e tudo mais que precisar, porque você merece o mundo.
          </p>
        </div>

        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full cursor-pointer touch-none"
        />
      </div>
    </section>
  );
}
