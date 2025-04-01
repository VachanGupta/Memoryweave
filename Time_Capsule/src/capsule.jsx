import React, { useState, useEffect } from 'react';
import './Capsule.css';

const Capsule = () => {
  const [file, setFile] = useState(null);
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
    if (file) {
      console.log("File selected:", file.name);
    } else {
      console.log("No file selected!");
    }
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
        <h1 className="dancing-script">Welcome to Memoryweave</h1>
        <h1 className="dancing-script1">Every moment tells a story—let's weave yours into something unforgettable.</h1>

        <div className="file-upload-container">
          <label className="custom-file-upload">
            <input 
              type="file" 
              onChange={handleFileChange} 
              className="hidden-file-input"
            />
            Choose File
          </label>
          {file && (
            <p className="selected-file">{file.name}</p>
          )}
          <button onClick={handleSubmit}>Upload</button>
        </div>
      </div>
    </div>
  );
};

export default Capsule;