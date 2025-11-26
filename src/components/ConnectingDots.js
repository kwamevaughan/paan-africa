import React, { useEffect, useRef } from 'react';

const ConnectingDots = ({ 
  width = '100%', 
  height = '100vh', 
  starCount = 100, 
  connectionDistance = 150,
  fps = 60,
  dotColor = '#fff',
  lineColor = 'white',
  lineWidth = 0.05,
  backgroundColor = 'transparent'
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const starsRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Also resize when parent element changes
    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(canvas.parentElement);

    // Initialize stars
    const initStars = () => {
      starsRef.current = [];
      for (let i = 0; i < starCount; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1 + 1,
          vx: Math.floor(Math.random() * 50) - 25,
          vy: Math.floor(Math.random() * 50) - 25
        });
      }
    };

    // Distance calculation function
    const distance = (point1, point2) => {
      const xs = point2.x - point1.x;
      const ys = point2.y - point1.y;
      return Math.sqrt(xs * xs + ys * ys);
    };

    // Draw function
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Set background if specified
      if (backgroundColor !== 'transparent') {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      
      ctx.globalCompositeOperation = "lighter";
      
      // Draw stars
      for (let i = 0; i < starsRef.current.length; i++) {
        const s = starsRef.current[i];
        
        ctx.fillStyle = dotColor;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = 'black';
        ctx.stroke();
      }
      
      // Draw connections
      ctx.beginPath();
      for (let i = 0; i < starsRef.current.length; i++) {
        const starI = starsRef.current[i];
        ctx.moveTo(starI.x, starI.y);
        
        // Connect to mouse if within distance
        if (distance(mouseRef.current, starI) < connectionDistance) {
          ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
        }
        
        // Connect to other stars if within distance
        for (let j = 0; j < starsRef.current.length; j++) {
          const starII = starsRef.current[j];
          if (distance(starI, starII) < connectionDistance) {
            ctx.lineTo(starII.x, starII.y);
          }
        }
      }
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = lineColor;
      ctx.stroke();
    };

    // Update star positions
    const update = () => {
      for (let i = 0; i < starsRef.current.length; i++) {
        const s = starsRef.current[i];
        
        s.x += s.vx / fps;
        s.y += s.vy / fps;
        
        // Bounce off edges
        if (s.x < 0 || s.x > canvas.width) s.vx = -s.vx;
        if (s.y < 0 || s.y > canvas.height) s.vy = -s.vy;
      }
    };

    // Animation loop
    const tick = () => {
      draw();
      update();
      animationRef.current = requestAnimationFrame(tick);
    };

    // Mouse move handler
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    // Initialize and start animation
    initStars();
    canvas.addEventListener('mousemove', handleMouseMove);
    tick();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      resizeObserver.disconnect();
    };
  }, [starCount, connectionDistance, fps, dotColor, lineColor, lineWidth, backgroundColor]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '10px',
        display: 'block',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: -1,
        pointerEvents: 'none'
      }}
    />
  );
};

export default ConnectingDots; 