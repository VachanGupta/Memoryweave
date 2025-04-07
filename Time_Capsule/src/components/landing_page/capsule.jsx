import React, { useState } from 'react';
import './Capsule.css';
import MouseTrail from '../mouse_trails/trails.jsx'; 
import Blobs from '../blobs/blobs.jsx';


const Capsule = ({ onUpload }) => { 
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const imageUrls = newFiles.map(file => URL.createObjectURL(file)); 
    setFiles(newFiles);
    onUpload(imageUrls); 
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
              multiple
              onChange={handleFileChange} 
              className="hidden-file-input"
              accept="image/*"
            />
            Choose Files
          </label>
          {files.length > 0 && (
            <p className="selected-file">{files.length} file(s) selected</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Capsule;
