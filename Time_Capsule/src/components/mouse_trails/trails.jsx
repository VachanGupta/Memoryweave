import React, { useState, useEffect } from 'react';
import './trails.css'; 

const MouseTrail = () => {
  const [trail, setTrail] = useState([]);

  // Mouse trail effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setTrail(prev => [
        ...prev.slice(-8),
        {
          x: e.clientX,
          y: e.clientY,
          id: Date.now(),
          color: 'brown' // Set fixed brown color
        }
      ]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Clean up old trail points
  useEffect(() => {
    const interval = setInterval(() => {
      setTrail(prev => prev.slice(1));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="cursor-trail"
          style={{
            left: point.x - 10,
            top: point.y - 10,
            backgroundColor: point.color, // Always brown
            opacity: index / trail.length,
            transform: `scale(${0.5 + (index / trail.length) * 0.5})`
          }}
        />
      ))}
    </>
  );
};

export default MouseTrail;
