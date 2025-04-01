import React, { useState, useEffect } from 'react';
import './capsule.css';

const Capsule = () => {
  const [file, setFile] = useState(null);
  const [timer, setTimer] = useState('');
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
          color: `hsl(${Math.random() * 360}, 100%, 70%)`
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

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file && timer) {
      console.log("File selected:", file.name);
      console.log("Timer set for:", timer);
    } else {
      console.log("No file or timer set!");
    }
  };

  const handleTimerChange = (e) => {
    setTimer(e.target.value);
  };

  return (
    <div>
      <div className="blob blob1"></div>
      <div className="blob blob2"></div>

      {/* Colorful mouse trail */}
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="cursor-trail"
          style={{
            left: point.x - 10,
            top: point.y - 10,
            backgroundColor: point.color,
            opacity: index / trail.length,
            transform: `scale(${0.5 + (index / trail.length) * 0.5})`
          }}
        />
      ))}

      <div className='Welcome'>
        <h1 className="dancing-script">Welcome to the memory vault.</h1>
        <h1 className="dancing-script1">You can store your memories here.</h1>
        <h1 className="dancing-script2">We'll keep it safe for you.</h1>

        <input 
          type="file" 
          onChange={handleFileChange} 
          className="file-input"
        />
        
        <input 
          type="datetime-local"
          onChange={handleTimerChange}
          className="timer-input"
        />

        <button onClick={handleSubmit}>Upload</button>
      </div>
    </div>
  );
};

export default Capsule;