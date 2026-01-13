import { useEffect, useState, useRef } from 'react';
import { Icon } from '@iconify/react';
import { useChristmas } from '../contexts/ChristmasContext';

const ChristmasEffects = () => {
  const { isChristmasMode } = useChristmas();
  const [snowflakes, setSnowflakes] = useState([]);
  const [ornaments, setOrnaments] = useState([]);
  const [stars, setStars] = useState([]);
  const containerRef = useRef(null);

  // Initialize snowflakes
  useEffect(() => {
    if (!isChristmasMode) return;

    const createSnowflake = () => ({
      id: Math.random(),
      x: Math.random() * 100,
      y: -10,
      size: Math.random() * 8 + 4,
      speed: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.5,
      rotation: Math.random() * 360,
      rotationSpeed: Math.random() * 2 - 1,
    });

    const initialSnowflakes = Array.from({ length: 50 }, createSnowflake);
    setSnowflakes(initialSnowflakes);

    const animateSnowflakes = () => {
      setSnowflakes(prev => 
        prev.map(flake => ({
          ...flake,
          y: flake.y + flake.speed,
          rotation: flake.rotation + flake.rotationSpeed,
          x: flake.x + Math.sin(flake.y * 0.01) * 0.5, // Slight horizontal drift
        })).map(flake => 
          flake.y > 110 ? { ...createSnowflake(), y: -10 } : flake
        )
      );
    };

    const interval = setInterval(animateSnowflakes, 50);
    return () => clearInterval(interval);
  }, [isChristmasMode]);

  // Initialize floating ornaments
  useEffect(() => {
    if (!isChristmasMode) return;

    const createOrnament = () => ({
      id: Math.random(),
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 15,
      speed: Math.random() * 0.5 + 0.2,
      direction: Math.random() * Math.PI * 2,
      rotation: Math.random() * 360,
      rotationSpeed: Math.random() * 1 - 0.5,
      color: ['#DC2626', '#059669', '#2563EB', '#F59E0B'][Math.floor(Math.random() * 4)],
    });

    const initialOrnaments = Array.from({ length: 8 }, createOrnament);
    setOrnaments(initialOrnaments);

    const animateOrnaments = () => {
      setOrnaments(prev => 
        prev.map(ornament => {
          const newX = ornament.x + Math.cos(ornament.direction) * ornament.speed;
          const newY = ornament.y + Math.sin(ornament.direction) * ornament.speed;
          
          return {
            ...ornament,
            x: newX > 100 ? 0 : newX < 0 ? 100 : newX,
            y: newY > 100 ? 0 : newY < 0 ? 100 : newY,
            rotation: ornament.rotation + ornament.rotationSpeed,
          };
        })
      );
    };

    const interval = setInterval(animateOrnaments, 100);
    return () => clearInterval(interval);
  }, [isChristmasMode]);

  // Initialize twinkling stars
  useEffect(() => {
    if (!isChristmasMode) return;

    const createStar = () => ({
      id: Math.random(),
      x: Math.random() * 100,
      y: Math.random() * 50, // Only in top half
      size: Math.random() * 12 + 8,
      opacity: Math.random() * 0.5 + 0.3,
      twinkleSpeed: Math.random() * 0.02 + 0.01,
      baseOpacity: Math.random() * 0.5 + 0.3,
    });

    const initialStars = Array.from({ length: 20 }, createStar);
    setStars(initialStars);

    const animateStars = () => {
      setStars(prev => 
        prev.map(star => ({
          ...star,
          opacity: star.baseOpacity + Math.sin(Date.now() * star.twinkleSpeed) * 0.3,
        }))
      );
    };

    const interval = setInterval(animateStars, 100);
    return () => clearInterval(interval);
  }, [isChristmasMode]);

  if (!isChristmasMode) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
      aria-hidden="true"
    >
      {/* Snowflakes */}
      {snowflakes.map(flake => (
        <div
          key={flake.id}
          className="absolute"
          style={{
            left: `${flake.x}%`,
            top: `${flake.y}%`,
            transform: `rotate(${flake.rotation}deg)`,
            opacity: flake.opacity,
            transition: 'none',
          }}
        >
          <Icon 
            icon="mdi:snowflake" 
            className="text-white"
            style={{ 
              width: `${flake.size}px`, 
              height: `${flake.size}px`,
              filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.8))',
            }} 
          />
        </div>
      ))}

      {/* Floating Ornaments */}
      {ornaments.map(ornament => (
        <div
          key={ornament.id}
          className="absolute"
          style={{
            left: `${ornament.x}%`,
            top: `${ornament.y}%`,
            transform: `rotate(${ornament.rotation}deg)`,
            transition: 'none',
          }}
        >
          <Icon 
            icon="mdi:ornament" 
            style={{ 
              width: `${ornament.size}px`, 
              height: `${ornament.size}px`,
              color: ornament.color,
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
            }} 
          />
        </div>
      ))}

      {/* Twinkling Stars */}
      {stars.map(star => (
        <div
          key={star.id}
          className="absolute"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            opacity: star.opacity,
            transition: 'opacity 0.3s ease-in-out',
          }}
        >
          <Icon 
            icon="mdi:star" 
            className="text-yellow-300"
            style={{ 
              width: `${star.size}px`, 
              height: `${star.size}px`,
              filter: 'drop-shadow(0 0 4px rgba(255,215,0,0.8))',
            }} 
          />
        </div>
      ))}

      {/* Garland decorations at top */}
      <div className="absolute top-0 left-0 w-full h-16 pointer-events-none">
        <div className="flex justify-between items-center px-4 h-full">
          {Array.from({ length: 10 }).map((_, i) => (
            <Icon
              key={i}
              icon={i % 2 === 0 ? "mdi:lightbulb-on" : "mdi:candycane"}
              className={i % 2 === 0 ? "text-yellow-300" : "text-red-500"}
              style={{
                width: '20px',
                height: '20px',
                opacity: 0.7,
                animation: `twinkle ${2 + Math.random()}s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChristmasEffects;

