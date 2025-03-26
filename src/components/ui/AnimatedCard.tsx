
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

type AnimatedCardProps = {
  children: React.ReactNode;
  className?: string;
  glowAmount?: number;
  depth?: number;
  hoverScale?: boolean;
  onClick?: () => void;
};

const AnimatedCard = ({
  children,
  className,
  glowAmount = 0.5,
  depth = 20,
  hoverScale = true,
  onClick,
}: AnimatedCardProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Calculate card rotation and glow position
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    
    // Calculate cursor position relative to card center (in percentage)
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    setPosition({ x, y });
  };

  const resetStyles = () => {
    setIsHovering(false);
    setTimeout(() => setPosition({ x: 0, y: 0 }), 150);
  };

  const rotateX = position.y * depth * -1;
  const rotateY = position.x * depth;
  
  // Calculate the position of the glow effect
  const glowX = 50 + position.x * 50 * 2;
  const glowY = 50 + position.y * 50 * 2;
  
  // Ensure we don't apply the effect if not hovering (for smooth transitions)
  const glowStyle = isHovering
    ? {
        background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(255, 255, 255, ${glowAmount}), transparent 50%)`,
      }
    : {};

  return (
    <div
      ref={cardRef}
      className={cn(
        'relative rounded-2xl transition-all duration-200 transform-gpu',
        hoverScale && 'hover:scale-[1.02]',
        onClick && 'cursor-pointer',
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={resetStyles}
      onClick={onClick}
      style={{
        transformStyle: 'preserve-3d',
        transform: isHovering ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)` : 'none',
      }}
    >
      <div 
        className="absolute inset-0 rounded-2xl z-[-1] opacity-0 transition-opacity duration-300"
        style={{
          ...glowStyle,
          opacity: isHovering ? 1 : 0,
        }}
      />
      {children}
    </div>
  );
};

export default AnimatedCard;
