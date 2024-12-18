import React, { useEffect, useRef } from 'react';
import './App.css';

const App = () => {
  const canvasRef = useRef(null);
  const bubbles = [];
  const bubbleSize = 60; // Tamanho fixo das bolhas

  const createBubble = () => {
    return {
      x: Math.random() * window.innerWidth, // Posição horizontal aleatória
      y: Math.random() * window.innerHeight, // Posição vertical aleatória
      dx: Math.random() * 2 - 1, // Velocidade horizontal (-1 a 1)
      dy: Math.random() * 2 - 1, // Velocidade vertical (-1 a 1)
      color: `rgba(255, 255, 255, 0.5)`, // Cor fixa com transparência
    };
  };

  const drawBubble = (ctx, bubble) => {
    ctx.beginPath();
    ctx.arc(bubble.x, bubble.y, bubbleSize / 2, 0, Math.PI * 2);
    ctx.fillStyle = bubble.color;
    ctx.fill();
    ctx.strokeStyle = `rgba(255, 255, 255, 0.7)`; // Borda mais brilhante
    ctx.stroke();
    ctx.closePath();
  };

  const updateBubble = (bubble) => {
    bubble.x += bubble.dx;
    bubble.y += bubble.dy;

    // Rebater nas bordas horizontais
    if (bubble.x + bubbleSize / 2 > window.innerWidth || bubble.x - bubbleSize / 2 < 0) {
      bubble.dx *= -1;
    }

    // Rebater nas bordas verticais
    if (bubble.y + bubbleSize / 2 > window.innerHeight || bubble.y - bubbleSize / 2 < 0) {
      bubble.dy *= -1;
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Criar várias bolhas
    for (let i = 0; i < 30; i++) { // 30 bolhas fixas
      bubbles.push(createBubble());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas

      // Atualiza e desenha cada bolha
      bubbles.forEach((bubble) => {
        updateBubble(bubble);
        drawBubble(ctx, bubble);
      });

      requestAnimationFrame(animate); // Chama a próxima frame
    };

    animate();

    // Atualizar o tamanho do canvas ao redimensionar a janela
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="screensaver" />;
};

export default App;
