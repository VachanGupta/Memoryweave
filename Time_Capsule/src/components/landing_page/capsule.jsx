import React, { useState } from 'react';
import './Capsule.css';
import MouseTrail from '../mouse_trails/trails.jsx'; 
import Blobs from '../blobs/blobs.jsx';  // Import the Blobs component

const Capsule = () => {
  const [file, setFile] = useState(null);

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
      <MouseTrail />
      <Blobs /> 

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
